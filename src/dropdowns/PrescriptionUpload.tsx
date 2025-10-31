// ============================================================
// PrescriptionUpload.tsx
// Modern, Accessible, Responsive Prescription Upload Component
// Paired CSS: PrescriptionUpload.module.css
// ============================================================

import React, { useRef, useState, useCallback } from "react";
import type { DragEvent } from "react";
import styles from "./PrescriptionUpload.module.css";

export type UploadResult = {
  fileName: string;
  size: number;
  type: string;
  url?: string; // optional server URL after successful upload
};

interface Props {
  /** Optional server endpoint to POST files to. If not provided, onComplete will be called with local results. */
  uploadUrl?: string;
  /** Maximum allowed file size in bytes (default: 10 MB). */
  maxFileSize?: number;
  /** Allowed MIME types / extensions (default: images + PDF). */
  accept?: string;
  /** Callback when upload finishes (success or local-only). */
  onComplete?: (results: UploadResult[]) => void;
  /** Optional container className for layout control. */
  className?: string;
}

/** Helper — format bytes in human-readable form. */
const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default function PrescriptionUpload({
  uploadUrl,
  maxFileSize = 10 * 1024 * 1024,
  accept = "image/*,.pdf",
  onComplete,
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  // ============================================================
  // VALIDATION & FILE HANDLING
  // ============================================================
  const validateAndAdd = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setError(null);

      const allowed: File[] = [];
      for (let i = 0; i < incoming.length; i++) {
        const f = incoming[i];
        if (f.size > maxFileSize) {
          setError(
            `File "${f.name}" is too large (${formatBytes(
              f.size
            )}). Max allowed: ${formatBytes(maxFileSize)}.`
          );
          continue;
        }
        allowed.push(f);
      }

      if (allowed.length === 0) return;

      setFiles((prev) => {
        const combined = [...prev, ...allowed].slice(0, 8); // max 8
        allowed.forEach((f) => {
          if (f.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) =>
              setPreviews((p) => ({
                ...p,
                [f.name]: String(e.target?.result ?? ""),
              }));
            reader.readAsDataURL(f);
          } else {
            setPreviews((p) => ({ ...p, [f.name]: "" }));
          }
        });
        return combined;
      });
    },
    [maxFileSize]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndAdd(e.target.files);
    e.currentTarget.value = ""; // reset input for reselecting same file
  };

  // ============================================================
  // DRAG EVENTS
  // ============================================================
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    validateAndAdd(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // ============================================================
  // UPLOAD HANDLING
  // ============================================================
  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please add at least one file to upload.");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      if (uploadUrl) {
        const formData = new FormData();
        files.forEach((f) => formData.append("prescriptions", f));

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", uploadUrl, true);

          xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) {
              setProgress(Math.round((ev.loaded / ev.total) * 100));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const json = JSON.parse(xhr.responseText);
                const results: UploadResult[] = files.map((f, i) => ({
                  fileName: f.name,
                  size: f.size,
                  type: f.type,
                  url: json?.files?.[i]?.url,
                }));
                onComplete?.(results);
              } catch {
                onComplete?.(
                  files.map((f) => ({
                    fileName: f.name,
                    size: f.size,
                    type: f.type,
                  }))
                );
              }
              resolve();
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network error during upload."));
          xhr.send(formData);
        });
      } else {
        // fallback: no server upload
        onComplete?.(
          files.map((f) => ({
            fileName: f.name,
            size: f.size,
            type: f.type,
          }))
        );
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Upload failed.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // ============================================================
  // REMOVE FILE
  // ============================================================
  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    setPreviews((p) => {
      const next = { ...p };
      delete next[name];
      return next;
    });
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <section
      className={`${styles.container} ${className}`}
      aria-labelledby="prescription-upload-title"
    >
      <h2 id="prescription-upload-title" className={styles.title}>
        Upload Prescription
      </h2>

      <p className={styles.hint}>
        Accepts images (JPG, PNG, WEBP) and PDF files up to{" "}
        {formatBytes(maxFileSize)}. You can drag &amp; drop or select manually.
      </p>

      <div
        className={`${styles.dropzone} ${dragActive ? styles.dragActive : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="File upload area. Press Enter or Space to select files."
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className={styles.inputFile}
          onChange={handleInputChange}
          aria-hidden="true"
        />

        <div className={styles.inner}>
          <div className={styles.icon} aria-hidden>
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3v12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="13"
                width="18"
                height="8"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className={styles.cta}>
            <strong>Drag &amp; drop prescription files here</strong>
            <span className={styles.or}>or</span>
            <button
              type="button"
              className={styles.browseBtn}
              onClick={() => inputRef.current?.click()}
            >
              Browse files
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className={styles.previewWrap}>
          <ul className={styles.previewList}>
            {files.map((f) => (
              <li key={f.name} className={styles.previewItem}>
                <div className={styles.thumb} aria-hidden>
                  {previews[f.name] ? (
                    <img src={previews[f.name]} alt={`${f.name} preview`} />
                  ) : (
                    <div className={styles.pdfIcon} aria-hidden>
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2v6h6"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className={styles.meta}>
                  <div className={styles.name} title={f.name}>
                    {f.name}
                  </div>
                  <div className={styles.size}>{formatBytes(f.size)}</div>
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFile(f.name)}
                    aria-label={`Remove ${f.name}`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.uploadBar}>
            <div className={styles.leftActions}>
              <div className={styles.count}>
                {files.length} file{files.length > 1 ? "s" : ""}
              </div>
              <div className={styles.instructions}>Ready to upload</div>
            </div>

            <div className={styles.rightActions}>
              <button
                type="button"
                className={styles.uploadBtn}
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? `Uploading ${progress}%` : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

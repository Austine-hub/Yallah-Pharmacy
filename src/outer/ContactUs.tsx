// ===============================================================
// CONTACT US — Accessible, Scalable, Responsive (2025)
// ===============================================================

import React, { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./ContactUs.module.css";

// Hero & team images (replace with your assets)
import pic1 from "../assets/photos/photo2.jpg";
import pic2 from "../assets/team/Pharmacist.png";

// ===============================================================
// TYPES
// ===============================================================

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface Props {
  onSubmit?: (payload: ContactPayload) => Promise<void> | void;
}

// ===============================================================
// INITIAL STATE
// ===============================================================

const initialState: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

// ===============================================================
// COMPONENT
// ===============================================================

const ContactUs: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<ContactPayload>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  // ===============================================================
  // VALIDATION
  // ===============================================================
  const validate = () => {
    const e: Record<string, string> = {};

    if (!(form.name ?? "").trim()) e.name = "Full name is required.";

    if (!(form.email ?? "").trim()) {
      e.email = "Email is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        (form.email ?? "").trim()
      )
    ) {
      e.email = "Enter a valid email address.";
    }

    if (!(form.message ?? "").trim()) e.message = "Please enter a message.";

    // Safely handle optional phone using nullish coalescing
    const phoneTrimmed = (form.phone ?? "").trim();
    if (phoneTrimmed && !/^[0-9+\s()-]{6,20}$/.test(phoneTrimmed)) {
      e.phone = "Enter a valid phone number.";
    }

    return e;
  };

  // ===============================================================
  // HANDLERS
  // ===============================================================
  const handleChange =
    (key: keyof ContactPayload) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((s) => ({ ...s, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      const firstKey = Object.keys(validation)[0];
      document
        .querySelector<HTMLInputElement | HTMLTextAreaElement>(
          `#contact-${firstKey}`
        )
        ?.focus();
      return;
    }

    setSubmitting(true);

    const payload: ContactPayload = {
      name: (form.name ?? "").trim(),
      email: (form.email ?? "").trim(),
      phone: (form.phone ?? "").trim() || undefined,
      subject: (form.subject ?? "").trim() || undefined,
      message: (form.message ?? "").trim(),
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // Replace with a real API call as needed
        console.log("Contact form payload:", payload);
      }

      setForm(initialState);
      setErrors({});
      // move focus to success region for screen readers
      successRef.current?.focus();
    } catch (err) {
      console.error("Contact submit error:", err);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to send — please try again later.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  // ===============================================================
  // RENDER
  // ===============================================================
  return (
    <section className={styles.contactSection} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="contact-heading" className={styles.title}>
            Contact Us
          </h2>
          <p className={styles.subtitle}>
            We’re here to help — reach out for appointments, medication queries,
            or general enquiries.
          </p>
        </header>

        <div className={styles.grid}>
          {/* ========== LEFT COLUMN: CONTACT INFO ========== */}
          <div className={styles.details}>
            <div className={styles.card}>
              <img
                src={pic1}
                alt="Clinic exterior"
                className={styles.heroImg}
                loading="lazy"
                width={800}
                height={500}
              />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>Main Pharmacy & Clinic</h3>
                <address className={styles.address}>
                  123 Health Ave, Suite 4
                  <br />
                  Nairobi, Kenya
                </address>

                <dl className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <dt>Phone</dt>
                    <dd>
                      <a href="tel:+254700000000" className={styles.link}>
                        +254 700 000 000
                      </a>
                    </dd>
                  </div>

                  <div className={styles.contactItem}>
                    <dt>Email</dt>
                    <dd>
                      <a
                        href="mailto:info@yourpharmacy.co.ke"
                        className={styles.link}
                      >
                        info@yourpharmacy.co.ke
                      </a>
                    </dd>
                  </div>

                  <div className={styles.contactItem}>
                    <dt>Opening Hours</dt>
                    <dd>
                      Mon–Fri: 08:00–18:00
                      <br />
                      Sat: 09:00–13:00
                      <br />
                      Sun: Closed
                    </dd>
                  </div>
                </dl>

                <div
                  className={styles.mapPlaceholder}
                  role="img"
                  aria-label="Map placeholder"
                >
                  <div className={styles.mapInner}>Map placeholder — embed your map here</div>
                </div>

                <div className={styles.teamCard}>
                  <img
                    src={pic2}
                    alt="On-call pharmacist"
                    className={styles.teamAvatar}
                    loading="lazy"
                    width={200}
                    height={200}
                  />
                  <div>
                    <p className={styles.teamRole}>On-call Pharmacist</p>
                    <p className={styles.teamName}>Dr. Jane Doe, BPharm, MSc</p>
                    <p className={styles.small}>
                      Available for medication counselling & clinical queries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== RIGHT COLUMN: FORM ========== */}
          <div className={styles.formWrap}>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-describedby={errors.submit ? "submit-error" : undefined}
            >
              {[
                { id: "name", label: "Full name", type: "text", required: true },
                {
                  id: "email",
                  label: "Email address",
                  type: "email",
                  required: true,
                },
                { id: "phone", label: "Phone (optional)", type: "tel" },
                { id: "subject", label: "Subject (optional)", type: "text" },
              ].map(({ id, label, type, required }) => (
                <div className={styles.row} key={id}>
                  <label htmlFor={`contact-${id}`} className={styles.label}>
                    {label}
                  </label>
                  <input
                    id={`contact-${id}`}
                    name={id}
                    type={type}
                    className={`${styles.input} ${errors[id] ? styles.invalid : ""}`}
                    value={(form[id as keyof ContactPayload] as string) ?? ""}
                    onChange={handleChange(id as keyof ContactPayload)}
                    placeholder={
                      id === "email"
                        ? "you@example.com"
                        : id === "phone"
                        ? "+254 7xx xxx xxx"
                        : undefined
                    }
                    required={required}
                    aria-required={required}
                    aria-invalid={!!errors[id]}
                    aria-describedby={errors[id] ? `error-${id}` : undefined}
                  />
                  {errors[id] && (
                    <div role="alert" id={`error-${id}`} className={styles.error}>
                      {errors[id]}
                    </div>
                  )}
                </div>
              ))}

              {/* Message Field */}
              <div className={styles.row}>
                <label htmlFor="contact-message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  className={`${styles.textarea} ${errors.message ? styles.invalid : ""}`}
                  value={form.message ?? ""}
                  onChange={handleChange("message")}
                  placeholder="Tell us how we can help..."
                  required
                  aria-required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "error-message" : undefined}
                />
                {errors.message && (
                  <div role="alert" id="error-message" className={styles.error}>
                    {errors.message}
                  </div>
                )}
              </div>

              {errors.submit && (
                <div role="alert" id="submit-error" className={styles.error}>
                  {errors.submit}
                </div>
              )}

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.primaryBtn}
                  disabled={submitting}
                  aria-disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>

                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={() => {
                    setForm(initialState);
                    setErrors({});
                  }}
                >
                  Reset
                </button>
              </div>

              <div
                tabIndex={-1}
                ref={successRef}
                aria-live="polite"
                className={styles.visuallyHidden}
              />
            </form>

            {/* Quick Contact Links */}
            <aside className={styles.quickLinks} aria-label="Quick contact">
              <h4 className={styles.smallTitle}>Quick contact</h4>
              <ul className={styles.quickList}>
                <li>
                  <strong>Emergency</strong>{" "}
                  <a href="tel:+254700000001" className={styles.link}>
                    +254 700 000 001
                  </a>
                </li>
                <li>
                  <strong>Pharmacy orders</strong>{" "}
                  <a href="mailto:orders@yourpharmacy.co.ke" className={styles.link}>
                    orders@yourpharmacy.co.ke
                  </a>
                </li>
                <li>
                  <strong>WhatsApp</strong>{" "}
                  <a
                    href="https://wa.me/254700000002"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.link}
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

// ==========================================================
// RequestPrescription.tsx — Modern, Scalable Prescription Form
// Inspired by top pharmacy/healthcare UX (Walgreens, CVS, Cleveland Clinic)
// ==========================================================

import React, { useState } from "react";
import styles from "./RequestPrescription.module.css";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  prescriptionDetails: string;
  doctorName: string;
  file?: File | null;
}

const RequestPrescription: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    prescriptionDetails: "",
    doctorName: "",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate form submission (replace with your API endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage("✅ Prescription request submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        prescriptionDetails: "",
        doctorName: "",
        file: null,
      });
    }, 2000);
  };

  return (
    <section className={styles.requestSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Request a Prescription</h2>
        <p className={styles.subtitle}>
          Please fill in the form below to request a new or refill prescription. 
          Our pharmacists will review and get back to you promptly.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} aria-label="Prescription Request Form">
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="yourname@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                pattern="[0-9+\- ]{7,15}"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 555 123 4567"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="doctorName">Doctor’s Name (optional)</label>
            <input
              id="doctorName"
              name="doctorName"
              type="text"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter your doctor's name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="prescriptionDetails">Prescription Details</label>
            <textarea
              id="prescriptionDetails"
              name="prescriptionDetails"
              rows={4}
              value={formData.prescriptionDetails}
              onChange={handleChange}
              required
              placeholder="Describe the medication or upload a file below"
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="file">Upload Prescription (PDF / Image)</label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              aria-label="Upload prescription file"
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>

          {message && <p className={styles.successMsg}>{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default RequestPrescription;

// src/components/AboutUs.tsx
import React from "react";
import styles from "./AboutUs.module.css";

// Local images (you can replace these with actual photos in your assets folder)
import pharmacyImg from "../assets/pharmacy.png";
import vctImg from "../assets/VCT.png";
import consultationImg from "../assets/consultation.png";
import labImg from "../assets/lab.png";
import mchImg from "../assets/MCH.png";

const AboutUs: React.FC = () => {
  const departments = [
    {
      name: "Pharmacy",
      description:
        "Our fully stocked pharmacy provides prescription and over-the-counter medicines, ensuring quality, affordability, and professional pharmaceutical care.",
      image: pharmacyImg,
    },
    {
      name: "VCT (Voluntary Counseling & Testing)",
      description:
        "We provide confidential HIV testing, counseling, and prevention education in a safe, non-judgmental environment.",
      image: vctImg,
    },
    {
      name: "General Consultation",
      description:
        "Our experienced medical officers and clinicians offer comprehensive consultations for all age groups, addressing both acute and chronic conditions.",
      image: consultationImg,
    },
    {
      name: "Laboratory Services",
      description:
        "We operate a modern diagnostic laboratory equipped for accurate and timely investigations to support clinical decision-making.",
      image: labImg,
    },
    {
      name: "MCH (Maternal & Child Health)",
      description:
        "We offer prenatal, postnatal, immunization, and growth-monitoring services to ensure the well-being of mothers and children.",
      image: mchImg,
    },
  ];

  return (
    <section className={styles.aboutUsSection} aria-labelledby="about-us-heading">
      <div className={styles.intro}>
        <h2 id="about-us-heading" className={styles.title}>
          About Our Comprehensive Care Clinic
        </h2>
        <p className={styles.subtitle}>
          At Healthfield  Comprehensive Healthcare Centre, we are dedicated to providing
          patient-centered, affordable, and high-quality healthcare under one roof.
          Our multidisciplinary team ensures that every patient receives the care
          they deserve with compassion and professionalism.
        </p>
      </div>

      <div className={styles.departmentsGrid} role="list">
        {departments.map((dept) => (
          <article
            key={dept.name}
            className={styles.departmentCard}
            role="listitem"
            tabIndex={0}
          >
            <img
              src={dept.image}
              alt={`${dept.name} department`}
              className={styles.departmentImage}
              loading="lazy"
            />
            <div className={styles.departmentContent}>
              <h3 className={styles.departmentName}>{dept.name}</h3>
              <p className={styles.departmentDescription}>{dept.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;

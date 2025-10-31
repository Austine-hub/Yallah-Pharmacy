// ============================================================================
// Modern Responsive "Our Team" Section (Pharmacy Website)
// - Uses Framer Motion for entry animations
// - Accessible, Mobile-first, and Scalable
// - Harmonized with clsx & react-intersection-observer
// ============================================================================

import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import styles from "./OurTeam.module.css";

// ---------------------------------------------------------------------------
// ✅ Local Images (Demo Data Fallback)
// ---------------------------------------------------------------------------
import pic1 from "../assets/team/Pharmacist.png";
import pic2 from "../assets/team/Pharmacologist.png";
import pic3 from "../assets/team/Technician.png";

// ---------------------------------------------------------------------------
// ✅ Type Definitions
// ---------------------------------------------------------------------------
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification?: string;
  bio?: string;
  phone?: string;
  email?: string;
  imageSrc?: string;
}

interface Props {
  members?: TeamMember[];
  columns?: number;
}

// ---------------------------------------------------------------------------
// ✅ Default Demo Data (Fallback)
// ---------------------------------------------------------------------------
const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Jane Doe",
    role: "Chief Pharmacologist",
    qualification: "MBChB, PhD",
    bio: "Leads clinical pharmacy services and medication safety initiatives.",
    email: "jane.doe@example.com",
    imageSrc: pic1,
  },
  {
    id: "2",
    name: "Mr. John Smith",
    role: "Senior Clinical Pharmacist",
    qualification: "MPharm",
    bio: "Specialist in outpatient medication review and patient counselling.",
    email: "john.smith@example.com",
    imageSrc: pic2,
  },
  {
    id: "3",
    name: "Ms. Amina Patel",
    role: "Pharmacy Technician",
    qualification: "HND Pharmacy",
    bio: "Supports dispensing services and inventory management.",
    email: "amina.patel@example.com",
    imageSrc: pic3,
  },
];

// ---------------------------------------------------------------------------
// ✅ Framer Motion Variants
// ---------------------------------------------------------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1] as any, // ✅ fix type mismatch
    },
  }),
};


// ---------------------------------------------------------------------------
// ✅ Component — Responsive, Semantic, ARIA-Compliant
// ---------------------------------------------------------------------------
function OurTeam({ members = defaultMembers, columns = 3 }: Props) {
  const cols = Math.min(Math.max(columns, 1), 4);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={styles.section}
      aria-labelledby="our-team-heading"
    >
      {/* === Header === */}
      <header className={styles.header}>
        <motion.h2
          id="our-team-heading"
          className={styles.title}
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Meet Our Team
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Experienced pharmacy and clinical staff committed to safe, patient-centred care.
        </motion.p>
      </header>

      {/* === Team Grid === */}
      <ul
        className={styles.grid}
        style={{ ["--cols" as any]: cols }}
        role="list"
      >
        {members.map((member, i) => (
          <motion.li
            key={member.id}
            className={clsx(styles.card)}
            custom={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            role="group"
            aria-label={`${member.name}, ${member.role}`}
          >
            <div className={styles.media}>
              <img
                src={member.imageSrc ?? "https://via.placeholder.com/320x320?text=Photo"}
                alt={`${member.name} — ${member.role}`}
                className={styles.avatar}
                loading="lazy"
                decoding="async"
                width={320}
                height={320}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.meta}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                {member.qualification && (
                  <p className={styles.qual}>{member.qualification}</p>
                )}
              </div>

              {member.bio && <p className={styles.bio}>{member.bio}</p>}

              {(member.email || member.phone) && (
                <div className={styles.contact}>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className={styles.contactLink}
                      aria-label={`Email ${member.name}`}
                    >
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className={styles.contactLink}
                      aria-label={`Call ${member.name}`}
                    >
                      {member.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* === CTA Button === */}
      <motion.div
        className={styles.ctaRow}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <button
          type="button"
          className={styles.cta}
          aria-label="View all staff members"
        >
          View All Staff
        </button>
      </motion.div>
    </section>
  );
}

export default memo(OurTeam);

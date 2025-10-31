import React, { useEffect, useState, useMemo } from "react";
import { Bed, Users, Hourglass, Building2 } from "lucide-react";
import styles from "./AboutStats.module.css";

interface Stat {
  icon: React.ReactNode;
  number: number;
  label: string;
  duration?: number;
}

const AboutStats: React.FC = () => {
  // ✅ useMemo prevents stats array recreation every render
  const stats = useMemo<Stat[]>(
    () => [
      { icon: <Bed size={48} />, number: 1800, label: "Bed Capacity" },
      { icon: <Users size={48} />, number: 6000, label: "Employees" },
      { icon: <Hourglass size={48} />, number: 122, label: "Years of Service" },
      { icon: <Building2 size={48} />, number: 22, label: "Specialized Clinics" },
    ],
    []
  );

  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, i) => {
      const { number: target, duration = 2000 } = stat;
      const stepTime = Math.max(duration / target, 10);
      let current = 0;

      const interval = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[i] = current;
          return updated;
        });
      }, stepTime);

      return interval;
    });

    return () => timers.forEach(clearInterval);
  }, [stats]);

  return (
    <section className={styles.aboutSection} aria-labelledby="about-stats-title">
      <div className={styles.container}>
        <h2 id="about-stats-title" className={styles.title}>
          About Us
        </h2>

        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <article key={index} className={styles.statCard}>
              <div className={styles.iconWrapper} aria-hidden="true">
                {stat.icon}
              </div>
              <p className={styles.number} aria-label={`${stat.number} ${stat.label}`}>
                {counts[index].toLocaleString()}
              </p>
              <p className={styles.label}>{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;

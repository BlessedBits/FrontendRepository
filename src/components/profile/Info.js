import React from "react";
import styles from "./Info.module.css";
import loadingStyle from "../basic/Loading.module.css"

const InfoProfile = ({ profileData }) => {
    if (!profileData) return (
      <div className={loadingStyle.loading}>
        Loading<span>.</span><span>.</span><span>.</span>
      </div>
    )

  return (
    <section className={styles.profileDetails}>
      <h2>Інформація</h2>
      <hr />
      <div className={styles.profileRow}>
        <div className={styles.profileItem}>
          <p className={styles.label}><strong>Email:</strong></p>
          <p className={styles.value}>{profileData.email}</p>
        </div>
        <div className={styles.profileItem}>
          <p className={styles.label}><strong>Статус:</strong></p>
          <p className={styles.value}>{profileData.role}</p>
        </div>
      </div>
      <div className={styles.profileRow}>
        <div className={styles.profileItem}>
          <p className={styles.label}><strong>Школа:</strong></p>
          <p className={styles.value}>{profileData.school}</p>
        </div>
      </div>
    </section>
  );
};

export default InfoProfile;

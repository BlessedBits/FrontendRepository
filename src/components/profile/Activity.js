import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import styles from "./Activity.module.css";

const ActivityProfile = ({ profileData, isOwnProfile, userId }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (!profileData) return null;

    return (
        <section className={styles.profileContainer}>
            <div className={styles.profileSidebar}>
                <img src={profileData?.profileImage || "/ava.png"} alt="Profile" />
                <p className={styles.firstName}>
                    <strong>{profileData?.firstName}</strong>
                    <strong>{profileData?.secondName}</strong>
                </p>
                {isOwnProfile && (
                    <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                        Редагувати
                    </button>
                )}
            </div>
            {isEditing && (
                <ProfileModal
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    userId={userId}
                />
            )}
        </section>
    );
};

export default ActivityProfile;

import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import styles from "./Activity.module.css";
import { updateUserName } from "../../api/user";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";

const ActivityProfile = ({ profileData, isOwnProfile, updateInfo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [newName, setNewName] = useState({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
    });
    const axiosPrivate = useAxiosPrivate();

    if (!profileData) return null;

    const handleEditName = async () => {
        setNotification({ message: "Оновлення імені", type: "loading" });
        try {
            await updateUserName(profileData.id, newName, axiosPrivate);
            setEditingName(false);
            if (updateInfo) {
                updateInfo(newName);
            }
            setNotification({ message: "Ім'я оновлено", type: "success" });
        } catch (error) {
            console.error("Помилка оновлення імені:", error);
            setNotification({ message: "Помилка оновлення імені", type: "error" });
        }
    };

    return (
        <section className={styles.profileContainer}>
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <div className={styles.profileSidebar}>
                <img src={profileData?.profileImage || "/ava.png"} alt="Profile" />

                <p className={styles.firstName}>
                    {editingName ? (
                        <>
                            <input
                                type="text"
                                value={newName.firstName}
                                onChange={(e) => setNewName({ ...newName, firstName: e.target.value })}
                            />
                            <input
                                type="text"
                                value={newName.lastName}
                                onChange={(e) => setNewName({ ...newName, lastName: e.target.value })}
                            />
                            <button className={styles.iconBtn} onClick={handleEditName}>
                                ✅
                            </button>
                            <button className={styles.iconBtn} onClick={() => setEditingName(false)}>
                                ❌
                            </button>
                        </>
                    ) : (
                        <>
                            <strong>{profileData?.firstName}</strong>
                            <strong> {profileData?.lastName}</strong>
                            {isOwnProfile && profileData.role === "SCHOOL_ADMIN" && (
                                <button className={styles.iconBtn} onClick={() => setEditingName(true)}>
                                    ✏️
                                </button>
                            )}
                        </>
                    )}
                </p>

                {isOwnProfile && (
                    <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                        Редагувати
                    </button>
                )}
            </div>

            {isEditing && (
                <ProfileModal isOpen={isEditing} onClose={() => setIsEditing(false)} userId={profileData.id} />
            )}
        </section>
    );
};

export default ActivityProfile;

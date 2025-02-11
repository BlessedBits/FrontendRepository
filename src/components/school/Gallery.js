import React, { useState, useEffect, useRef } from "react";
import styles from "./GallerySchool.module.css";
import {
    getSchoolGallery,
    createSchoolFoto,
    deleteSchoolFoto,
} from "../../api/school";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";
import { Loading } from "../basic/LoadingAnimation";

function GallerySchool({ userRole }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPhoto, setNewPhoto] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "" });
    const sliderRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchPhotos() {
            try {
                const response = await getSchoolGallery(axiosPrivate);
                setPhotos(response);
            } catch (error) {
                console.error("Помилка при завантаженні галереї:", error);
                setError(
                    error.message || "Сталася помилка під час завантаження."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchPhotos();
    }, [axiosPrivate]);

    const handleAddPhoto = async () => {
        if (!newPhoto) return;

        const formData = new FormData();
        formData.append("image", newPhoto);
        setNotification({ type: "loading", message: "Додається нове фото..." });
        try {
            await createSchoolFoto(formData, axiosPrivate);
            const updatedPhotos = await getSchoolGallery(axiosPrivate);
            setPhotos(updatedPhotos);
            setNotification({ type: "success", message: "Додано нове фото" });
            setNewPhoto(null);
        } catch (error) {
            console.error("Помилка при додаванні фото:", error);
            setNotification({
                type: "error",
                message: "Помилка при додаванні фото. Спробуйте пізніше",
            });
        }
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    const handleDeletePhoto = async (galleryImage) => {
        setNotification({ type: "loading", message: "Фото видаляється..." });
        try {
            await deleteSchoolFoto(galleryImage, axiosPrivate);
            setNotification({ type: "success", message: "Фото видалено" });
            setPhotos((prevPhotos) =>
                prevPhotos.filter(
                    (photo) => photo.galleryImage !== galleryImage
                )
            );
        } catch (error) {
            console.error("Помилка при видаленні фото:", error);
            setNotification({
                type: "error",
                message: "Помилка. Спробуйте пізніше",
            });
        }
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    if (loading) {
        return (
            <section id="gallery" className={styles.galleryComponent}>
                <Loading />
            </section>
        );
    }

    if (error) {
        return (
            <section id="gallery" className={styles.galleryComponent}>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section id="gallery" className={styles.galleryComponent}>
            <h2 className={styles.galleryTitle}>Наша школа</h2>

            {userRole === "SCHOOL_ADMIN" && (
                <div className={styles.adminControls}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewPhoto(e.target.files[0])}
                    />
                    <button onClick={handleAddPhoto} disabled={!newPhoto}>
                        Додати фото
                    </button>
                </div>
            )}

            <ul ref={sliderRef} className={styles.galleryList}>
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <li
                            key={photo.galleryImage}
                            className={styles.galleryItem}
                        >
                            <img
                                src={photo.galleryImage}
                                alt="Фото школи"
                                className={styles.galleryPhoto}
                            />
                            {userRole === "SCHOOL_ADMIN" && (
                                <button
                                    className={styles.deleteButton}
                                    onClick={() =>
                                        handleDeletePhoto(photo.galleryImage)
                                    }
                                >
                                    ❌
                                </button>
                            )}
                        </li>
                    ))
                ) : (
                    <p>Немає доступних фото.</p>
                )}
            </ul>

            <Notification
                message={notification.message}
                type={notification.type}
            />
        </section>
    );
}

export default GallerySchool;

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
    const [preview, setPreview] = useState(null); // State for preview
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
            setPreview(null); // Clear the preview after upload
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

    const handlePhotoChange = (file) => {
        setNewPhoto(file);
        if (file) {
            setPreview(URL.createObjectURL(file)); // Generate preview URL
        } else {
            setPreview(null); // Clear preview if no file is selected
        }
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

    const midpoint = Math.ceil(photos.length / 2);
    const firstList = photos.slice(0, midpoint);
    const secondList = photos.slice(midpoint);

    return (
        <section id="gallery" className={styles.galleryComponent}>
            <h2 className={styles.galleryTitle}>Наша школа</h2>

            <div className={styles.galleryLists}>
                <ul ref={sliderRef} className={styles.galleryList}>
                    {firstList.length > 0 ? (
                        firstList.map((photo) => (
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
                                            handleDeletePhoto(
                                                photo.galleryImage
                                            )
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

                <ul className={styles.galleryList}>
                    {secondList.length > 0 ? (
                        secondList.map((photo) => (
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
                                            handleDeletePhoto(
                                                photo.galleryImage
                                            )
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
                {userRole === "SCHOOL_ADMIN" && (
                    <div className={styles.adminControls}>
                        <label
                            htmlFor="fileInput"
                            className={styles.iconButton}
                        >
                            <span className={styles.icon}></span>
                        </label>

                        <input
                            id="fileInput"
                            className={styles.hiddenInput}
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handlePhotoChange(e.target.files[0])
                            }
                        />

                        <button
                            className={styles.saveButton}
                            onClick={handleAddPhoto}
                            disabled={!newPhoto}
                        >
                            Додати фото
                        </button>
                    </div>
                )}

                {preview && (
                    <section className={styles.preview}>
                        <div className={styles.previewContainer}>
                            <img
                                src={preview}
                                alt="Прев'ю вибраного фото"
                                className={styles.previewImage}
                            />
                        </div>
                    </section>
                )}
            </div>

            <Notification
                message={notification.message}
                type={notification.type}
            />
        </section>
    );
}

export default GallerySchool;

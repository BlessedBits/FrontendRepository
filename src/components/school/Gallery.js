import React, { useState, useEffect } from "react";
import styles from "./GallerySchool.module.css";
import { getSchoolGallery, createSchoolFoto, deleteSchoolFoto } from "../../api/school";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";
import { Loading } from "../basic/LoadingAnimation";

function GallerySchool({ baseInfo }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPhoto, setNewPhoto] = useState(null);
    const [preview, setPreview] = useState(null); // State for preview
    const [notification, setNotification] = useState({ message: "", type: "" });
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        async function fetchPhotos() {
            try {
                const response = await getSchoolGallery(axiosPrivate);
                const sortedresponse = response.sort((a, b) => b.id - a.id);
                setPhotos(sortedresponse);
            } catch (error) {
                console.error("Помилка при завантаженні галереї:", error);
                setError(error.message || "Сталася помилка під час завантаження.");
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
            const sortedresponse = updatedPhotos.sort((a, b) => b.id - a.id);
            setPhotos(sortedresponse);
            setNotification({ type: "success", message: "Додано нове фото" });
            setNewPhoto(null);
            setPreview(null);
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
            setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.galleryImage !== galleryImage));
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
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
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

    const columnsCount = Math.ceil(photos.length / 7); // 7 фото на колонку мінімум
    const columns = Array.from({ length: columnsCount }, () => []);

    photos.forEach((photo, index) => {
        columns[index % columnsCount].push(photo); // Розподіл по колонках
    });

    return (
        <section id="gallery" className={styles.galleryComponent}>
            <h2 className={styles.galleryTitle}>Наша школа</h2>

            <div className={styles.galleryLists}>
                {columns.map((column, columnIndex) => (
                    <ul key={columnIndex} className={styles.galleryList}>
                        {column.length > 0 ? (
                            column.map((photo) => (
                                <li key={photo.galleryImage} className={styles.galleryItem}>
                                    <img src={photo.galleryImage} alt="Фото школи" className={styles.galleryPhoto} />
                                    {baseInfo.role === "SCHOOL_ADMIN" && (
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeletePhoto(photo.galleryImage)}
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
                ))}
            </div>

            {baseInfo.role === "SCHOOL_ADMIN" && (
                <div className={styles.adminControls}>
                    <label htmlFor="fileInput" className={styles.iconButton}>
                        <span className={styles.icon}></span>
                    </label>

                    <input
                        id="fileInput"
                        className={styles.hiddenInput}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoChange(e.target.files[0])}
                    />

                    <button className={styles.saveButton} onClick={handleAddPhoto} disabled={!newPhoto}>
                        Додати фото
                    </button>
                </div>
            )}

            {preview && (
                <section className={styles.preview}>
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="Прев'ю вибраного фото" className={styles.previewImage} />
                    </div>
                </section>
            )}

            <Notification message={notification.message} type={notification.type} />
        </section>
    );
}

export default GallerySchool;

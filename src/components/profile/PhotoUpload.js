import React, { useState, useRef } from "react";
import { updateProfileImage } from "../../api/profile";
import styles from "./PhotoUpload.module.css";
import Notification from "../basic/Notification"; 

const PhotoUpload = ({ axiosPrivate }) => {
    const inputRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setMessage(null); 

            const reader = new FileReader();
            reader.onload = (e) => setSelectedPhoto(e.target.result);
            reader.readAsDataURL(selectedFile);
            
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setMessage({ type: "loading", text: "Завантаження фото..." })

        try {
            await updateProfileImage(file, axiosPrivate);
            setMessage({ type: "success", text: "Фото успішно завантажено!" });
            setTimeout(() => {
                window.location.reload(); 
            }, 1500);
        } catch (error) {
            setMessage({ type: "error", text: error.message || "Помилка завантаження фото." });
        }
    };

    return (
        <>
            <Notification message={message?.text} type={message?.type} />

            <button onClick={() => inputRef.current?.click()} className={styles.actionButton}>
                Обрати фото
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            {selectedPhoto && (
                <>
                    <img src={selectedPhoto} alt="Попередній перегляд" className={styles.photoPreview} />
                    <button onClick={handleUpload} className={styles.uploadButton}>
                        Завантажити фото
                    </button>
                </>
            )}
        </>
    );
};

export default PhotoUpload;

import React, { useState, useRef } from "react";
import { updateProfileImage } from "../../api/profile";

const PhotoUpload = ({ axiosPrivate, onSuccess }) => {
    const inputRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [error, setError] = useState("");

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setError("");
            try {
                const reader = new FileReader();
                reader.onload = (e) => setSelectedPhoto(e.target.result);
                reader.readAsDataURL(file);

                await updateProfileImage(file, axiosPrivate);
                onSuccess();
            } catch (error) {
                setError(error.message || "Помилка завантаження фото.");
            }
        }
    };

    return (
        <>
            <button onClick={() => inputRef.current?.click()} className="action-button">
                Завантажити фото
            </button>
            <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
            {selectedPhoto && <img src={selectedPhoto} alt="Попередній перегляд" className="photo-preview" />}
            {error && <p className="error-message">{error}</p>}
        </>
    );
};

export default PhotoUpload;

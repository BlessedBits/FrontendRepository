import React, { useState } from "react";
import styles from "./Materials.module.css";
import { updateMaterial, deleteMaterial } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";

function Materials({ materials, userRole, onMaterialUpdated, onMaterialDeleted }) {
    const axiosPrivate = useAxiosPrivate();
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [updatedMaterial, setUpdatedMaterial] = useState({ title: "", description: "", url: "" });
    const [notification, setNotification] = useState(null);

    const handleEdit = (material) => {
        setEditingMaterial(material.id);
        setUpdatedMaterial({
            title: material.title,
            description: material.description,
            url: material.url,
        });
    };

    const handleCancelEdit = () => {
        setEditingMaterial(null);
        setUpdatedMaterial({ title: "", description: "", url: "" });
    };

    const handleUpdate = async (id) => {
        if (
            updatedMaterial.title === materials.find((m) => m.id === id).title &&
            updatedMaterial.description === materials.find((m) => m.id === id).description &&
            updatedMaterial.url === materials.find((m) => m.id === id).url
        ) {
            setEditingMaterial(null);
            return;
        }

        try {
            await updateMaterial(id, updatedMaterial, axiosPrivate);
            setNotification({ type: "success", message: "Матеріал оновлено!" });
            setEditingMaterial(null);
            if (onMaterialUpdated) onMaterialUpdated();
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при оновленні матеріалу" });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити цей матеріал?")) return;
        try {
            await deleteMaterial(id, axiosPrivate);
            setNotification({ type: "success", message: "Матеріал видалено!" });
            if (onMaterialDeleted) onMaterialDeleted(id);
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при видаленні матеріалу" });
        }
    };

    return (
        <>
            {materials.length === 0 && <p>Матеріали для цього модуля поки що не додані.</p>}

            {materials.length > 0 && (
                <ul className={styles.themeList}>
                    {materials.map((material) => (
                        <li key={material.id} className={styles.Materials}>
                            {editingMaterial === material.id ? (
                                <div className={styles.editContainer}>
                                    <input
                                        type="text"
                                        value={updatedMaterial.title}
                                        onChange={(e) =>
                                            setUpdatedMaterial({ ...updatedMaterial, title: e.target.value })
                                        }
                                        onBlur={() => handleUpdate(material.id)}
                                        onKeyDown={(e) => e.key === "Enter" && handleUpdate(material.id)}
                                        autoFocus
                                    />
                                    <input
                                        type="text"
                                        value={updatedMaterial.description}
                                        onChange={(e) =>
                                            setUpdatedMaterial({ ...updatedMaterial, description: e.target.value })
                                        }
                                        placeholder="Опис (необов’язково)"
                                    />
                                    <input
                                        type="text"
                                        value={updatedMaterial.url}
                                        onChange={(e) =>
                                            setUpdatedMaterial({ ...updatedMaterial, url: e.target.value })
                                        }
                                        placeholder="Посилання (необов’язково)"
                                    />
                                    <button onClick={() => handleUpdate(material.id)}>Зберегти</button>
                                    <button onClick={handleCancelEdit}>Скасувати</button>
                                </div>
                            ) : (
                                <>
                                    <h4 className={styles.title} onDoubleClick={() => handleEdit(material)}>
                                        {material.title}
                                    </h4>

                                    {material.description && <p>Опис: {material.description}</p>}
                                    {material.url && (
                                        <p>
                                            Корисні лінки:{" "}
                                            <a href={material.url} target="_blank" rel="noopener noreferrer">
                                                {material.url}
                                            </a>
                                        </p>
                                    )}

                                    {["TEACHER", "SCHOOL_ADMIN"].includes(userRole) && (
                                        <div className={styles.actions}>
                                            <button onClick={() => handleEdit(material)}>Редагувати</button>
                                            <button onClick={() => handleDelete(material.id)}>Видалити</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {notification && <Notification type={notification.type} message={notification.message} />}
        </>
    );
}

export default Materials;

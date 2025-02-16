import React, { useState } from "react";
import Materials from "./Materials";
import styles from "./ModuleItem.module.css";
import Assignment from "./Assignment";
import { createAssignment, createMaterial, deleteModule, updateModule } from "../../api/course";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";

function ModuleItem({ module, userRole, onModuleDeleted }) {
    const [expanded, setExpanded] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    // Стейти для форм
    const [showMaterialForm, setShowMaterialForm] = useState(false);
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);
    const [newMaterial, setNewMaterial] = useState({ title: "", description: "", url: "" });
    const [newAssignment, setNewAssignment] = useState({ title: "", description: "", url: "", dueDate: "" });
    const [notification, setNotification] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [moduleName, setModuleName] = useState(module.name);

    // Видалення модуля
    const handleDeleteModule = async () => {
        setNotification({ type: "loading", message: "Видаляємо модуль..." });
        try {
            await deleteModule(module.id, axiosPrivate);
            setNotification({ type: "success", message: "Модуль видалено!" });
            onModuleDeleted(module.id);
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при видаленні модуля" });
        }
    };

    // Оновлення модуля
    const handleUpdateModule = async () => {
        setNotification({ type: "loading", message: "Оновлення модуля..." });
        try {
            await updateModule(module.id, { name: moduleName }, axiosPrivate);
            setNotification({ type: "success", message: "Модуль оновлено!" });
            setIsEditing(false);
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при оновленні модуля" });
        }
    };

    const handleAddMaterial = async () => {
        const materialData = {
            title: newMaterial.title || "Новий матеріал",
            description: newMaterial.description,
            url: newMaterial.url,
            moduleId: module.id,
        };

        try {
            await createMaterial(materialData, axiosPrivate);
            setNotification({ type: "success", message: "Матеріал додано!" });
            setNewMaterial({ title: "", description: "", url: "" });
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при додаванні матеріалу" });
        }
    };

    // Додавання завдання
    const handleAddAssignment = async () => {
        const assignmentData = {
            title: newAssignment.title || "Нове завдання",
            description: newAssignment.description,
            url: newAssignment.url,
            dueDate: newAssignment.dueDate,
            moduleId: module.id,
        };

        try {
            await createAssignment(assignmentData, axiosPrivate);
            setNotification({ type: "success", message: "Завдання додано!" });
            setNewAssignment({ title: "", description: "", url: "", dueDate: "" }); // Очистити форму
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при додаванні завдання" });
        }
    };

    return (
        <li className={styles.moduleItem}>
            {/* Заголовок модуля */}
            <div className={styles.header}>
                <button className={styles.toggleButton} onClick={() => setExpanded(!expanded)} aria-label="Перемкнути">
                    {expanded ? "🔽" : "▶️"}
                    {moduleName}
                </button>
                {isEditing && (
                    <div className={styles.editContainer}>
                        <input
                            type="text"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            autoFocus
                        />
                        <button onClick={handleUpdateModule}>Зберегти</button>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setModuleName(module.name);
                            }}
                        >
                            Скасувати
                        </button>
                    </div>
                )}

                {/* Кнопки керування (доступні лише для викладача або адміністратора) */}
                {["TEACHER", "SCHOOL_ADMIN"].includes(userRole) && (
                    <div className={styles.actions}>
                        <button className={styles.iconBtn} onClick={() => setIsEditing(true)}>
                            ✏️ Редагувати
                        </button>
                        <button className={styles.iconBtn} onClick={handleDeleteModule}>
                            🗑️ Видалити
                        </button>
                    </div>
                )}
            </div>

            {expanded && (
                <>
                    {/* Матеріали модуля */}
                    {module.materials.length > 0 && (
                        <ul className={styles.themes}>
                            <Materials materials={module.materials} userRole={userRole} />
                        </ul>
                    )}

                    {/* Завдання до модуля */}
                    <div className={styles.assignmentsContainer}>
                        <h4 className={styles.assignmentsHeader}>Завдання до теми</h4>
                        <Assignment assignments={module.assignments} userRole={userRole} />
                        {/* Додавання завдання */}
                        {["TEACHER", "SCHOOL_ADMIN"].includes(userRole) && (
                            <>
                                <button onClick={() => setShowMaterialForm(!showMaterialForm)}>
                                    {showMaterialForm ? "Сховати форму додавання матеріалу" : "Додати матеріал"}
                                </button>
                                {showMaterialForm && (
                                    <div className={styles.addItem}>
                                        <input
                                            type="text"
                                            value={newMaterial.title}
                                            onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                                            placeholder="Назва матеріалу"
                                        />
                                        <input
                                            type="text"
                                            value={newMaterial.description}
                                            onChange={(e) =>
                                                setNewMaterial({ ...newMaterial, description: e.target.value })
                                            }
                                            placeholder="Опис (необов'язково)"
                                        />
                                        <input
                                            type="text"
                                            value={newMaterial.url}
                                            onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                                            placeholder="Посилання (необов'язково)"
                                        />
                                        <button onClick={handleAddMaterial}>Додати матеріал</button>
                                    </div>
                                )}
                            </>
                        )}

                        {["TEACHER", "SCHOOL_ADMIN"].includes(userRole) && (
                            <>
                                <button onClick={() => setShowAssignmentForm(!showAssignmentForm)}>
                                    {showAssignmentForm ? "Сховати форму додавання завдання" : "Додати завдання"}
                                </button>
                                {showAssignmentForm && (
                                    <div className={styles.addItem}>
                                        <input
                                            type="text"
                                            value={newAssignment.title}
                                            onChange={(e) =>
                                                setNewAssignment({ ...newAssignment, title: e.target.value })
                                            }
                                            placeholder="Назва завдання"
                                        />
                                        <input
                                            type="text"
                                            value={newAssignment.description}
                                            onChange={(e) =>
                                                setNewAssignment({ ...newAssignment, description: e.target.value })
                                            }
                                            placeholder="Опис (необов'язково)"
                                        />
                                        <input
                                            type="text"
                                            value={newAssignment.url}
                                            onChange={(e) =>
                                                setNewAssignment({ ...newAssignment, url: e.target.value })
                                            }
                                            placeholder="Посилання (необов'язково)"
                                        />
                                        <input
                                            type="datetime-local"
                                            value={newAssignment.dueDate}
                                            onChange={(e) =>
                                                setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                                            }
                                            placeholder="Дедлайн (необов'язково)"
                                        />
                                        <button onClick={handleAddAssignment}>Додати завдання</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}

            {/* Сповіщення */}
            {notification && <Notification type={notification.type} message={notification.message} />}
        </li>
    );
}

export default ModuleItem;

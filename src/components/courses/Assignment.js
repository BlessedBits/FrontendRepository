import React, { useState } from "react";
import styles from "./Assignment.module.css";
import { updateAssignment, deleteAssignment } from "../../api/course";
import { createSubmissions } from "../../api/submissions";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Notification from "../basic/Notification";
import SubmissionModal from "./SubmissionModal";

function Assignment({ assignments, userRole, setAssignments }) {
    const axiosPrivate = useAxiosPrivate();
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [updatedAssignment, setUpdatedAssignment] = useState({
        title: "",
        description: "",
        url: "",
        dueDate: "",
    });
    const [notification, setNotification] = useState(null);

    const [submissionModalAssignment, setSubmissionModalAssignment] = useState(null);

    const handleEdit = (assignment) => {
        setEditingAssignment(assignment.id);
        setUpdatedAssignment({
            title: assignment.title,
            description: assignment.description || "",
            url: assignment.url || "",
            dueDate: assignment.dueDate ? assignment.dueDate.slice(0, 16) : "",
        });
    };

    const handleCancelEdit = () => {
        setEditingAssignment(null);
        setUpdatedAssignment({ title: "", description: "", url: "", dueDate: "" });
    };

    const handleUpdate = async (id) => {
        const original = assignments.find((a) => a.id === id);
        if (
            updatedAssignment.title === original.title &&
            updatedAssignment.description === original.description &&
            updatedAssignment.url === original.url &&
            updatedAssignment.dueDate === (original.dueDate ? original.dueDate.slice(0, 16) : "")
        ) {
            setEditingAssignment(null);
            return;
        }

        try {
            await updateAssignment(id, updatedAssignment, axiosPrivate);

            setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updatedAssignment } : a)));

            setNotification({ type: "success", message: "Завдання оновлено!" });
            setEditingAssignment(null);
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при оновленні завдання" });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити це завдання?")) return;

        try {
            await deleteAssignment(id, axiosPrivate);

            setAssignments((prev) => prev.filter((a) => a.id !== id));

            setNotification({ type: "success", message: "Завдання видалено!" });
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при видаленні завдання" });
        }
    };

    const openSubmissionModal = (assignment) => {
        setSubmissionModalAssignment(assignment);
    };

    const closeSubmissionModal = () => {
        setSubmissionModalAssignment(null);
    };

    const handleSubmitAssignment = async (assignmentId, submissionText) => {
        const data = {
            assignmentId: assignmentId,
            submissionText: submissionText,
        };
        try {
            await createSubmissions(data, axiosPrivate);
            setNotification({ type: "success", message: "Завдання відправлено!" });
            closeSubmissionModal();
        } catch (error) {
            setNotification({ type: "error", message: "Помилка при відправленні завдання" });
        }
    };

    if (!assignments || assignments.length === 0) {
        return <p>Завдання для цього модуля поки що не додані.</p>;
    }

    return (
        <>
            <ul className={styles.assignmentList}>
                {assignments.map((assignment) => (
                    <li key={assignment.id} className={styles.assignmentItem}>
                        {editingAssignment === assignment.id ? (
                            <div className={styles.editContainer}>
                                <input
                                    type="text"
                                    value={updatedAssignment.title}
                                    onChange={(e) =>
                                        setUpdatedAssignment({ ...updatedAssignment, title: e.target.value })
                                    }
                                />
                                <textarea
                                    value={updatedAssignment.description}
                                    onChange={(e) =>
                                        setUpdatedAssignment({ ...updatedAssignment, description: e.target.value })
                                    }
                                    placeholder="Опис (необов’язково)"
                                />
                                <input
                                    type="text"
                                    value={updatedAssignment.url}
                                    onChange={(e) =>
                                        setUpdatedAssignment({ ...updatedAssignment, url: e.target.value })
                                    }
                                    placeholder="Посилання (необов’язково)"
                                />
                                <input
                                    type="datetime-local"
                                    value={updatedAssignment.dueDate}
                                    onChange={(e) =>
                                        setUpdatedAssignment({ ...updatedAssignment, dueDate: e.target.value })
                                    }
                                />
                                <button onClick={() => handleUpdate(assignment.id)}>Зберегти</button>
                                <button onClick={handleCancelEdit}>Скасувати</button>
                            </div>
                        ) : (
                            <>
                                <h4 className={styles.title}>{assignment.title}</h4>
                                {assignment.description && <p>Опис: {assignment.description}</p>}

                                {assignment.url && (
                                    <p>
                                        Корисні лінки:{" "}
                                        <a href={assignment.url} target="_blank" rel="noopener noreferrer">
                                            {assignment.url}
                                        </a>
                                    </p>
                                )}

                                {assignment.dueDate && new Date(assignment.dueDate).getTime() !== 0 && (
                                    <p
                                        className={`${styles.counts} ${
                                            new Date(assignment.dueDate) < new Date() ? styles.late : ""
                                        }`}
                                    >
                                        Дедлайн: {new Date(assignment.dueDate).toLocaleDateString()}
                                    </p>
                                )}

                                {["TEACHER", "SCHOOL_ADMIN"].includes(userRole) && (
                                    <>
                                        <p className={styles.counts}>
                                            Кількість поданих робіт: {assignment.submissions?.length || 0}
                                        </p>
                                        <div className={styles.actions}>
                                            <button className={styles.iconBtn} onClick={() => handleEdit(assignment)}>
                                                ✏️ Редагувати
                                            </button>
                                            <button
                                                className={styles.iconBtn}
                                                onClick={() => handleDelete(assignment.id)}
                                            >
                                                🗑️ Видалити
                                            </button>
                                        </div>
                                    </>
                                )}

                                {userRole === "STUDENT" && (
                                    <div className={styles.studentActions}>
                                        <button onClick={() => openSubmissionModal(assignment)}>
                                            Відправити завдання
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {notification && <Notification type={notification.type} message={notification.message} />}

            {submissionModalAssignment && (
                <SubmissionModal
                    assignment={submissionModalAssignment}
                    isOpen={true}
                    onClose={closeSubmissionModal}
                    onSubmit={handleSubmitAssignment}
                />
            )}
        </>
    );
}

export default Assignment;

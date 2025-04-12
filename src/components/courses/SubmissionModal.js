import React, { useState } from "react";
import styles from "./Assignment.module.css";

function SubmissionModal({ assignment, isOpen, onClose, onSubmit }) {
    const [submissionText, setSubmissionText] = useState("");

    const isPastDeadline = assignment.dueDate ? new Date() > new Date(assignment.dueDate) : false;

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(assignment.id, submissionText);
        setSubmissionText("");
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>Відправити завдання: {assignment.title}</h3>
                {isPastDeadline && <p className={styles.late}>Дедлайн сплив – подача завдання може бути пізною.</p>}
                <form onSubmit={handleFormSubmit}>
                    <textarea
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Введіть текст завдання або вставте посилання..."
                        rows={5}
                        required
                    />
                    <div className={styles.modalActions}>
                        <button className={styles.saveBtn} type="submit">
                            Відправити
                        </button>
                        <button className={styles.cancelBtn} type="button" onClick={onClose}>
                            Скасувати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SubmissionModal;

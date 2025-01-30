import React, { useState } from "react";
import { updateProfileInfo } from "../../api/profile";

const GmailForm = ({ axiosPrivate, onSuccess, onClose }) => {
    const [gmail, setGmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await updateProfileInfo({ email: gmail }, axiosPrivate);
            onSuccess();
            onClose();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <h1>Прив'язати Gmail</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Ваш Gmail</label>
                    <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} required />
                </div>
                <button type="submit" className="submit-button">Відправити</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </>
    );
};

export default GmailForm;

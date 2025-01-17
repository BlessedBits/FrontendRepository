import React from "react";

const InfoProfile = ({ userId }) => {
    return (
        <div className="profile-details">
            <h2>Інформація</h2>
            <hr />
            <div className="profile-row">
                <div className="profile-item">
                    <p className="label">
                        <strong>Email:</strong>
                    </p>
                    <p className="value">user@example.com</p>
                </div>
                <div className="profile-item">
                    <p className="label">
                        <strong>Статус:</strong>
                    </p>
                    <p className="value">Учень/Вчитель</p>
                </div>
            </div>
            <div className="profile-row">
                <div className="profile-item">
                    <p className="label">
                        <strong>Школа:</strong>
                    </p>
                    <p className="value">Назва школи</p>
                </div>
                <div className="profile-item">
                    <p className="label">
                        <strong>Останній вхід:</strong>
                    </p>
                    <p className="value">2024-12-01</p>
                </div>
            </div>
        </div>
    );
};

export default InfoProfile;

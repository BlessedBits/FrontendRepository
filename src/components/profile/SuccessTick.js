import React from "react";

const SuccessTick = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="success-tick">
            <div className="tick-circle">
                <div className="tick-line"></div>
            </div>
        </div>
    );
};

export default SuccessTick;
import React from "react";
import styles from "./SuccessTick.module.css"; 

const SuccessTick = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.successTick}>
            <div className={styles.tickCircle}>
                <div className={styles.tickLine}></div>
            </div>
        </div>
    );
};

export default SuccessTick;
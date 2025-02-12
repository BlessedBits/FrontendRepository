import React from "react";
import Schedule from "../components/schedule/Schedule.js";
import Sidebar from "../components/basic/Sidebar";

const SchedulePage = ({ userRole }) => {
    return (
        <>
            <Sidebar role={userRole} />
            <main>
                <section data-content="true" className="content">
                    <Schedule />
                </section>
            </main>
        </>
    );
};

export default SchedulePage;

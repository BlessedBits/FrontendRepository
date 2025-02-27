import React from "react";
import Schedule from "../components/schedule/Schedule.js";
import Sidebar from "../components/basic/Sidebar";

const SchedulePage = ({ baseInfo }) => {
    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <section data-content="true" className="content">
                    <Schedule baseInfo={baseInfo} />
                </section>
            </main>
        </>
    );
};

export default SchedulePage;

import React from "react";
import TestDiaryPage from "../components/diary/TestDiary.js";
import Sidebar from "../components/basic/Sidebar";

const DiaryPage = ({ userRole }) => {
    return (
        <>
            <Sidebar role={userRole} />
            <main>
                <section data-content="true" className="content">
                    <TestDiaryPage />
                </section>
            </main>
        </>
    );
};

export default DiaryPage;

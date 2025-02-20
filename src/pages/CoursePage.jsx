import React from "react";
import CourseList from "../components/courses/CourseList";
import Sidebar from "../components/basic/Sidebar";

const CoursePage = ({ baseInfo }) => {
    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <section data-content="true" className="content">
                    <CourseList baseInfo={baseInfo} />
                </section>
            </main>
        </>
    );
};

export default CoursePage;

import React from "react";
import Sidebar from "../components/basic/Sidebar";
import CourseItem from "../components/courses/CourseItem";

const CourseInfoPage = ({ baseInfo }) => {
    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <section data-content="true" className="content">
                    <CourseItem baseInfo={baseInfo} />
                </section>
            </main>
        </>
    );
};

export default CourseInfoPage;

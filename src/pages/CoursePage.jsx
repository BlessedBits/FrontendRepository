import React from "react";
import CourseList from "../components/courses/CourseList";
import Sidebar from "../components/basic/Sidebar";

const CoursePage = ({userRole}) => {
    return (
      <>
          <Sidebar role={userRole} />
          <main>
              <section data-content="true" className="content">
                  <CourseList userRole={userRole} />
              </section>
          </main>
      </>
  );
};

export default CoursePage;

import React from "react";
import CourseList from "../components/courses/CourseList";
import { useUser } from '../Context/Context.jsx';
import Sidebar, {  StudentSidebarData } from "../components/basic/Sidebar";

const CoursePage = () => {
    const userInfo = useUser();
    const sidebarData = StudentSidebarData({ userId: userInfo?.user_id, schoolId: userInfo?.schoolId, });
    return (
      <>
        <Sidebar menu={sidebarData.menu} />
        <main>
            <section data-content="true" className="content">
                <CourseList userId={userInfo?.user_id} isTeacher={true} />
            </section>
        </main>
      </>
    );
  };
  
  export default CoursePage;
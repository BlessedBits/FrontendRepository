import React from "react";
import "../components/school/school.css"; 
import InfoSchool from "../components/school/Info";
import AchievementsSchool from "../components/school/Achievements";
import GallerySchool from "../components/school/Gallery";
import TeacherSchool from "../components/school/Teacher.js";
import ContactSchool from "../components/school/Contact";
import Sidebar, {  StudentSidebarData } from "../components/basic/Sidebar";
import { useUser } from '../Context/Context.jsx';

const SchoolPage = () => {
  const userInfo = useUser();
  const sidebarData = StudentSidebarData({ userId: userInfo?.user_id, schoolId: userInfo?.schoolId, });

  return (
    <>
      <Sidebar menu={sidebarData.menu} />
      <main>
        <section data-content="true" className="content">
          <InfoSchool schoolId={userInfo?.schoolId} />
          <AchievementsSchool schoolId={userInfo?.schoolId} />
          <GallerySchool schoolId={userInfo?.schoolId} />
          <TeacherSchool schoolId={userInfo?.schoolId} />
          <ContactSchool schoolId={userInfo?.schoolId} />
        </section>
      </main>
    </>
  );
};



export default SchoolPage;

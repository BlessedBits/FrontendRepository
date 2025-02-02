import React from "react";
import InfoSchool from "../components/school/Info";
import AchievementsSchool from "../components/school/Achievements";
import GallerySchool from "../components/school/Gallery";
import TeacherSchool from "../components/school/Teacher.js";
import ContactSchool from "../components/school/Contact";
import Sidebar, {  StudentSidebarData } from "../components/basic/Sidebar";
import { useUser } from '../context/Context.jsx';

const SchoolPage = () => {
  const userInfo = useUser();
  const sidebarData = StudentSidebarData();

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

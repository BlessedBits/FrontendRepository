import React from "react";
import "../components/school/Gallery.css"
import "../components/school/school.css"; 
import InfoSchool from "../components/school/Info";
import AchievementsSchool from "../components/school/Achievements";
import GallerySchool from "../components/school/Gallery";
import DirectorSchool from "../components/school/Director";
import ContactSchool from "../components/school/Contact";
import Sidebar, {  StudentSidebarData } from "../components/basic/Sidebar";
import { useParams } from "react-router-dom";
import { useUser } from '../Context/Context.jsx';

const SchoolPage = () => {

  const { schoolId } = useParams(); 
  const userInfo = useUser();
  const sidebarData = StudentSidebarData({ userId: userInfo?.user_id, schoolId });

  return (
    <>
      <Sidebar menu={sidebarData.menu} />
      <main>
        <section data-content="true" className="content">
          <InfoSchool schoolId={schoolId} />
          <AchievementsSchool schoolId={schoolId} />
          <GallerySchool schoolId={schoolId} />
          <DirectorSchool schoolId={schoolId} />
          <ContactSchool schoolId={schoolId} />
        </section>
      </main>
    </>
  );
};



export default SchoolPage;

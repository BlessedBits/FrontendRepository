import React from "react";
import "./Gallery.css"
import "./school.css"; 
import InfoSchool from "./Info";
import AchievementsSchool from "./Achievements";
import GallerySchool from "./Gallery";
import DirectorSchool from "./Director";
import ContactSchool from "./Contact";
import Sidebar, {  StudentSidebarData } from "../basic/Sidebar";
import { useParams } from "react-router-dom";

const SchoolPage = () => {
  const { schoolId } = useParams(); 
  const sidebarData = StudentSidebarData();

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

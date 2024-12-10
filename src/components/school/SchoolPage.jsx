import React from "react";
import "./school.css"; 
import HeaderSchool from "./Header";
import InfoSchool from "./Info";
import AchievementsSchool from "./Achievements";
import GallerySchool from "./Gallery";
import DirectorSchool from "./Director";
import ContactSchool from "./Contact";

const SchoolPage = () => {
  return (
    <>
      <HeaderSchool />
      <main>
        <InfoSchool />
        <AchievementsSchool />
        <GallerySchool />
        <DirectorSchool />
        <ContactSchool />
      </main>
    </>
  );
};

export default SchoolPage;

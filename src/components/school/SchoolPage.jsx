import React from "react";
import "./school.css"; 
import InfoSchool from "./Info";
import AchievementsSchool from "./Achievements";
import GallerySchool from "./Gallery";
import DirectorSchool from "./Director";
import ContactSchool from "./Contact";
import Sidebar from "../basic/Sidebar";
import { useParams } from "react-router-dom";

const sidebarData = {
  menu: [
      { label: 'Профіль', icon: '👤', link: '#' },
      { label: 'Школа', icon: '🏫', link: '/school' },
      { label: 'Новини', icon: '📰', link: '#' },
      { label: 'Щоденник', icon: '📒', link: '#' },
      { label: 'Розклад', icon: '📅', link: '#' },
      { label: 'Повідомлення', icon: '✉️', link: '#' },
      { label: 'Курси', icon: '📚', link: '#' },
      { label: 'Вихід', icon: '🚪', link: '#' },
  ],
};

const SchoolPage = () => {
  const { schoolId } = useParams(); 

  return (
    <>
      <Sidebar {...sidebarData} />
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

import React from "react";
import "./school.css"; 
import InfoSchool from "./Info";
import AchievementsSchool from "./Achievements";
import GallerySchool from "./Gallery";
import DirectorSchool from "./Director";
import ContactSchool from "./Contact";
import Sidebar from "../basic/Sidebar";
import Footer from "../basic/Footer";

const sidebarData = {
  logo: {
      src: 'weblogo.jpg',
      alt: 'SchoolHub Logo',
      text: 'SchoolHub',
      link: 'index.html',
  },
  menu: [
      { label: 'Профіль', icon: '👤', link: '#' },
      { label: 'Школа', icon: '🏫', link: '#' },
      { label: 'Новини', icon: '📰', link: '#' },
      { label: 'Щоденник', icon: '📒', link: '#' },
      { label: 'Розклад', icon: '📅', link: '#' },
      { label: 'Повідомлення', icon: '✉️', link: '#' },
      { label: 'Курси', icon: '📚', link: '#' },
      { label: 'Вихід', icon: '🚪', link: '#' },
  ],
};

const SchoolPage = () => {
  return (
    <>
      <Sidebar {...sidebarData} />
      <main>
        <InfoSchool />
        <AchievementsSchool />
        <GallerySchool />
        <DirectorSchool />
        <ContactSchool />
        <Footer />
      </main>
    </>
  );
};

export default SchoolPage;

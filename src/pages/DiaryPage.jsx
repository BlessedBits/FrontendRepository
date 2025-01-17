import React from "react";
import TestDiaryPage from "../components/diary/TestDiary.js"; 
import { useUser } from "../Context/Context.jsx";
import Sidebar, { StudentSidebarData } from "../components/basic/Sidebar";

const DiaryPage = () => {
  const userInfo = useUser();
  const sidebarData = StudentSidebarData();
  return (
    <>
      <Sidebar menu={sidebarData.menu} />
      <main>
        <section data-content="true" className="content">
          <TestDiaryPage /> 
        </section>
      </main>
    </>
  );
};

export default DiaryPage;

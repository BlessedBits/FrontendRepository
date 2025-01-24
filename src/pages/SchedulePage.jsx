import React from "react";
import Schedule from "../components/schedule/Schedule.js";
import { useUser } from '../context/Context.jsx';
import Sidebar, {  StudentSidebarData } from "../components/basic/Sidebar";

const SchedulePage = () => {
    const userInfo = useUser();
    const sidebarData = StudentSidebarData({ userId: userInfo?.user_id, schoolId: userInfo?.schoolId, });
    return (
      <>
        <Sidebar menu={sidebarData.menu} />
        <main>
            <section data-content="true" className="content">
                <Schedule userId={userInfo?.class_id}/>
            </section>
        </main>
      </>
    );
  };
  
  export default SchedulePage;
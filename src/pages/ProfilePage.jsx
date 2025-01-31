import React from "react";
import InfoProfile from "../components/profile/Info";
import ActivityProfile from "../components/profile/Activity";
import Sidebar, { StudentSidebarData } from "../components/basic/Sidebar";
import { useUser } from "../context/Context";

const ProfilePage = () => {
  const userInfo = useUser();
  const sidebarData = StudentSidebarData();

  return (
    <>
      <Sidebar menu={sidebarData.menu} />
      <main>
        <section data-content="true" className="content">
            <div className="profile-page">
                <ActivityProfile userId={userInfo?.id} />
                <InfoProfile userId={userInfo?.id} />
            </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
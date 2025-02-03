import React, { useState, useEffect } from "react";
import InfoProfile from "../components/profile/Info";
import ActivityProfile from "../components/profile/Activity";
import Sidebar, { StudentSidebarData } from "../components/basic/Sidebar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ProfileInfo } from "../api/profile";

const ProfilePage = ({userRole}) => {
  const sidebarData = StudentSidebarData();
  const axiosPrivate = useAxiosPrivate();

  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await ProfileInfo(axiosPrivate);  
        setProfileData(data);
      } catch (err) {
        console.error(err);
        setError("Не вдалося завантажити інформацію профілю.");
      } 
    };

    fetchProfileData();
  }, [axiosPrivate]);
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Sidebar menu={sidebarData.menu} />
      <main>
        <section data-content="true" className="content">
          <div className="profile-page">
            <ActivityProfile profileData={profileData} />
            <InfoProfile profileData={profileData} />
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;

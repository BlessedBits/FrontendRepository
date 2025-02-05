import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoProfile from "../components/profile/Info";
import ActivityProfile from "../components/profile/Activity";
import Sidebar from "../components/basic/Sidebar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getProfileInfo, getProfileInfoById } from "../api/profile";
import { getUserId } from "../api/user";
import { Loading } from "../components/basic/LoadingAnimation";

const ProfilePage = ({ userRole }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null); 

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const currentUserId = await getUserId(axiosPrivate);
        setCurrentUserId(currentUserId);

        if (id && Number(id) === currentUserId) {
          navigate("/profile/", { replace: true });
          return;
        }
        

        if (id) {
          const data = await getProfileInfoById(id, axiosPrivate);
          setProfileData(data);
        } else {
          const data = await getProfileInfo(axiosPrivate);
          setProfileData(data);
        }
      } catch (err) {
        
        if (err.message === "Unhandled response status: 404") {
            setError("Користувача не знайдено. Перевірте правильність введених даних.");
        } else {
            setError("Не вдалося завантажити інформацію профілю. Спробуйте пізніше.");
        }
    }
    
    };

    fetchProfileData();
  }, [axiosPrivate, id, navigate]);

  if (error) {
    return (
      <>
        <Sidebar role={userRole} />
        <main>
          <section data-content="true" className="content">
            <div className="profile-page">
              <p>{error}</p>
            </div>
          </section>
        </main>
      </>
    )
  }

  if (!profileData) {
    return(
      <>
        <Sidebar role={userRole} />
        <main>
          <section data-content="true" className="content">
            <div className="profile-page">
              <Loading/>
            </div>
          </section>
        </main>
      </>
    ) 
  }

  const isOwnProfile = !id || id === currentUserId;

  return (
    <>
      <Sidebar role={userRole} />
      <main>
        <section data-content="true" className="content">
          <div className="profile-page">
            <ActivityProfile profileData={profileData} isOwnProfile={isOwnProfile} />
            <InfoProfile profileData={profileData} />
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;

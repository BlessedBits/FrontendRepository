import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoProfile from "../components/profile/Info";
import ActivityProfile from "../components/profile/Activity";
import Sidebar from "../components/basic/Sidebar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getProfileInfo, getProfileInfoById } from "../api/profile";
import { getUserId } from "../api/user";

const ProfilePage = ({ userRole }) => {
  const { id } = useParams(); // Отримуємо id з URL
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null); // Зберігаємо ID поточного користувача

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
        console.error(err);
        setError("Не вдалося завантажити інформацію профілю.");
      }
    };

    fetchProfileData();
  }, [axiosPrivate, id, navigate]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profileData) {
    return <p>Завантаження профілю...</p>;
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

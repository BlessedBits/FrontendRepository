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
    const [userId, setUserId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    const handleUpdateName = async (newName) => {
        profileData.firstName = newName.firstName;
        profileData.lastName = newName.lastName;
    };

    const fetchProfileData = async () => {
        try {
            const userId = await getUserId(axiosPrivate);
            setUserId(userId);
            setCurrentUserId(userId);

            if (id && Number(id) === userId) {
                navigate("/profile/", { replace: true });
                return;
            }

            const data = id ? await getProfileInfoById(id, axiosPrivate) : await getProfileInfo(axiosPrivate);
            setProfileData(data);
        } catch (err) {
            const errorMessage =
                err.message === "Unhandled response status: 404"
                    ? "Користувача не знайдено. Перевірте правильність введених даних."
                    : "Не вдалося завантажити інформацію профілю. Спробуйте пізніше.";
            setError(errorMessage);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [axiosPrivate, id, navigate]);

    if (error || !profileData) {
        return (
            <>
                <Sidebar role={userRole} />
                <main>
                    <section data-content="true" className="content">
                        <div className="profile-page">{error ? <p>{error}</p> : <Loading />}</div>
                    </section>
                </main>
            </>
        );
    }

    const isOwnProfile = !id || Number(id) === currentUserId;

    return (
        <>
            <Sidebar role={userRole} />
            <main>
                <section data-content="true" className="content">
                    <div className="profile-page">
                        <ActivityProfile
                            profileData={profileData}
                            isOwnProfile={isOwnProfile}
                            userId={userId}
                            userRole={userRole}
                            updateInfo={handleUpdateName}
                        />
                        <InfoProfile profileData={profileData} />
                    </div>
                </section>
            </main>
        </>
    );
};

export default ProfilePage;

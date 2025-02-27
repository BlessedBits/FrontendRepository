import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoProfile from "../components/profile/Info";
import ActivityProfile from "../components/profile/Activity";
import Sidebar from "../components/basic/Sidebar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getUserInfo } from "../api/user";
import { Loading } from "../components/basic/LoadingAnimation";

const ProfilePage = ({ baseInfo }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    const handleUpdateName = async (newName) => {
        profileData.firstName = newName.firstName;
        profileData.lastName = newName.lastName;
    };

    const fetchProfileData = async () => {
        try {
            const userId = id ? Number(id) : 0;
            if (userId === baseInfo.id && id) {
                navigate("/profile/", { replace: true });
                return;
            }

            const data = await getUserInfo(userId, axiosPrivate);
            setProfileData(data);
            setCurrentUserId(data.id);
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
                <Sidebar role={baseInfo.role} />
                <main>
                    <section data-content="true" className="content">
                        <div className="profile-page">{error ? <p>{error}</p> : <Loading />}</div>
                    </section>
                </main>
            </>
        );
    }

    const isOwnProfile = !id || baseInfo.id === currentUserId;

    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <section data-content="true" className="content">
                    <div className="profile-page">
                        <ActivityProfile
                            profileData={profileData}
                            isOwnProfile={isOwnProfile}
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

import { useEffect, useState, React } from "react";
import InfoSchool from "../components/school/Info";
import AchievementsSchool from "../components/school/Achievements";
import GallerySchool from "../components/school/Gallery";
import TeacherSchool from "../components/school/Teacher";
import ContactSchool from "../components/school/Contact";
import Sidebar, { StudentSidebarData } from "../components/basic/Sidebar";
import { getUserSchool } from "../api/user";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Loading } from "../components/basic/LoadingAnimation";  

const SchoolPage = () => {
  const sidebarData = StudentSidebarData();
  const axiosPrivate = useAxiosPrivate();

  const [userSchool, setUserSchool] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSchool = async () => {
      try {
        const data = await getUserSchool(axiosPrivate);
        setUserSchool(data);
      } catch (err) {
        console.error(err);
        setError("Не вдалося завантажити інформацію профілю.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUserSchool();
  }, [axiosPrivate]);

  if (loading) {
    return <Loading />; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <>
      <Sidebar menu={sidebarData.menu} />
      <main>
        <section data-content="true" className="content">
          <InfoSchool schoolId={userSchool} />
          <AchievementsSchool schoolId={userSchool} />
          <GallerySchool schoolId={userSchool} />
          <TeacherSchool schoolId={userSchool} />
          <ContactSchool schoolId={userSchool} />
        </section>
      </main>
    </>
  );
};

export default SchoolPage;

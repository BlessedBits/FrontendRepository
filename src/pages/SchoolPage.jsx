import {useEffect, useState, React} from "react";
import InfoSchool from "../components/school/Info";
import AchievementsSchool from "../components/school/Achievements";
import GallerySchool from "../components/school/Gallery";
import TeacherSchool from "../components/school/Teacher.js";
import ContactSchool from "../components/school/Contact";
import Sidebar, {  StudentSidebarData } from "../components/basic/Sidebar";
import { getUserSchool } from "../api/user.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

const SchoolPage = () => {
  const sidebarData = StudentSidebarData();

  const axiosPrivate = useAxiosPrivate();
  const [UserSchool, setUserSchool] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUserSchool = async () => {
        try {
          const data = await getUserSchool(axiosPrivate);  
          setUserSchool(data);
        } catch (err) {
          console.error(err);
          setError("Не вдалося завантажити інформацію профілю.");
        } 
      };
  
      fetchUserSchool();
    }, [axiosPrivate]);
    if (error) {
      return <p>{error}</p>;
    }

  return (
    <>
      <Sidebar menu={sidebarData.menu} />
      <main>
        <section data-content="true" className="content">
          <InfoSchool schoolId={UserSchool} />
          <AchievementsSchool schoolId={UserSchool} />
          <GallerySchool schoolId={UserSchool} />
          <TeacherSchool schoolId={UserSchool} />
          <ContactSchool schoolId={UserSchool} />
        </section>
      </main>
    </>
  );
};



export default SchoolPage;

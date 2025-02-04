import InfoSchool from "../components/school/Info";
import AchievementsSchool from "../components/school/Achievements";
import GallerySchool from "../components/school/Gallery";
import TeacherSchool from "../components/school/Teacher";
import ContactSchool from "../components/school/Contact";
import Sidebar from "../components/basic/Sidebar";

const SchoolPage = ({ userRole }) => { 
  return (
    <>
      <Sidebar role={userRole} />
      <main>
        <section data-content="true" className="content">
          <InfoSchool userRole={userRole} />
          <AchievementsSchool userRole={userRole} />
          <GallerySchool userRole={userRole}/>
          <TeacherSchool userRole={userRole}/>
          <ContactSchool userRole={userRole}/>
        </section>
      </main>
    </>
  );
};

export default SchoolPage;
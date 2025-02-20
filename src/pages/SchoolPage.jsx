import InfoSchool from "../components/school/Info";
import AchievementsSchool from "../components/school/Achievements";
import GallerySchool from "../components/school/Gallery";
import TeacherSchool from "../components/school/Teacher";
import ContactSchool from "../components/school/Contact";
import Sidebar from "../components/basic/Sidebar";

const SchoolPage = ({ baseInfo }) => {
    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <section data-content="true" className="content">
                    <InfoSchool baseInfo={baseInfo} />
                    <AchievementsSchool baseInfo={baseInfo} />
                    <GallerySchool baseInfo={baseInfo} />
                    <TeacherSchool baseInfo={baseInfo} />
                    <ContactSchool baseInfo={baseInfo} />
                </section>
            </main>
        </>
    );
};

export default SchoolPage;

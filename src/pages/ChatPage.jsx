import Sidebar from "../components/basic/Sidebar";
import ClassChat from "../components/сhat/ClassChat.jsx";

const ClassGhatPage = ({ baseInfo }) => {
    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <ClassChat baseInfo={baseInfo} />
            </main>
        </>
    );
};

export default ClassGhatPage;

import React from "react";
import Sidebar from "../components/basic/Sidebar";
import FiltersComponent from "../components/class_register/FiltersComponent";
import GradesTableComponent from "../components/class_register/GradesTableComponent";
import { ClassRegisterProvider } from "../context/ClassRegisterContext";

const ClassRegisterPage = ({ baseInfo }) => {
  return (
    <>
      <Sidebar role={baseInfo.role} />
      <main>
        <section data-content="true" className="content">
          <ClassRegisterProvider>
            <FiltersComponent />
            <GradesTableComponent />
          </ClassRegisterProvider>
        </section>
      </main>
    </>
  );
};

export default ClassRegisterPage;

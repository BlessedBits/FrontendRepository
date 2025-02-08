import React from "react";
import Sidebar from "../components/basic/Sidebar";
import AdminPanel from "../components/admin/AdminPanel";

export const SchAdminPanel = ({userRole}) => {
    return (
      <>
          <Sidebar role={userRole} />
          <main>
              <section data-content="true" className="content">
              </section>
          </main>
      </>
  );
};

export const PlfAdminPanel = ({userRole}) => {
    return (
      <>
          <Sidebar role={userRole} />
          <main>
              <section data-content="true" className="content">
                    <AdminPanel userRole={userRole}/>
              </section>
          </main>
      </>
  );
}; 

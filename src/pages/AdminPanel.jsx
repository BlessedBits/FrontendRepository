import React from "react";
import Sidebar from "../components/basic/Sidebar";
import AdminPanel from "../components/admin/fergef";
import AdminPanelSchool from "../components/admin/AdminPanelSchol";

export const SchAdminPanel = ({ userRole }) => {
    return (
        <>
            <Sidebar role={userRole} />
            <main>
                <section data-content="true" className="content">
                    <AdminPanelSchool userRole={userRole} />
                </section>
            </main>
        </>
    );
};

export const PlfAdminPanel = ({ userRole }) => {
    return (
        <>
            <Sidebar role={userRole} />
            <main>
                <section data-content="true" className="content">
                    <AdminPanel userRole={userRole} />
                </section>
            </main>
        </>
    );
};

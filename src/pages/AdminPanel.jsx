import React from "react";
import Sidebar from "../components/basic/Sidebar";
import AdminPanel from "../components/admin/fergef";
import AdminPanelSchool from "../components/admin/AdminPanelSchol";

export const SchAdminPanel = ({ baseInfo }) => {
    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <section data-content="true" className="content">
                    <AdminPanelSchool baseInfo={baseInfo} />
                </section>
            </main>
        </>
    );
};

export const PlfAdminPanel = ({ baseInfo }) => {
    return (
        <>
            <Sidebar role={baseInfo.role} />
            <main>
                <section data-content="true" className="content">
                    <AdminPanel baseInfo={baseInfo} />
                </section>
            </main>
        </>
    );
};

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolPage from "./pages/SchoolPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import DiaryPage from "./pages/DiaryPage";
import LogoutPage from "./pages/LogoutPage";
import PrivateRoute from "./context/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage"; 

function App() {
    return (
        <Router>
            <Routes>
                {/* Головна сторінка - доступна всім */}
                <Route path="/" element={<HomePage />} />

                {/* Сторінка "Школа"*/}
                <Route path="school/" element={
                    <PrivateRoute allowedRoles={['TEACHER', 'STUDENT', 'SCHOOL_ADMIN']} element={<SchoolPage />} />
                }/>

                {/* Курси */}
                <Route path="mycourses/" element={
                    <PrivateRoute allowedRoles={['TEACHER', 'STUDENT', 'SCHOOL_ADMIN']} element={<CoursePage />} />
                }/>

                {/* Профіль*/}
                <Route path="my-profile/" element={
                    <PrivateRoute allowedRoles={['TEACHER', 'STUDENT', 'SCHOOL_ADMIN']} element={<ProfilePage />} />
                }/>

                {/* Розклад */}
                <Route path="my-schedule/" element={
                    <PrivateRoute allowedRoles={['TEACHER', 'STUDENT', 'SCHOOL_ADMIN']} element={<SchedulePage />} />
                }/>

                {/* Щоденник */}
                <Route path="my-diary/" element={
                    <PrivateRoute allowedRoles={['STUDENT']} element={<DiaryPage />} />
                }/>    

                {/* Вихід  */}
                <Route path="logout/" element={
                    <PrivateRoute allowedRoles={['TEACHER', 'STUDENT', 'SCHOOL_ADMIN', 'PLATFORM_ADMIN']} element={<LogoutPage />} />
                }/>

                {/* Сторінка для неавторизованих або без доступу */}
                <Route path="unauthorized/" element={<UnauthorizedPage />} />
            </Routes>
        </Router>
    );
}

export default App;

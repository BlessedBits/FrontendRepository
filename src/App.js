import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolPage from "./pages/SchoolPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import CourseInfoPage from "./pages/CourseInfoPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import DiaryPage from "./pages/DiaryPage";
import LogoutPage from "./pages/LogoutPage";
import ClassRegisterPage from "./pages/ClassRegisterPage"
import PrivateRoute from "./context/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { Loading, LoadingPage } from "./components/basic/LoadingAnimation";
import { SchAdminPanel, PlfAdminPanel } from "./pages/AdminPanel";

function App() {
    return (
        <Router>
            <Routes>
                {/* Головна сторінка - доступна всім */}
                <Route path="/" element={<HomePage />} />

                {/* Сторінка "Школа" */}
                <Route
                    path="/school/"
                    element={
                        <PrivateRoute
                            allowedRoles={["TEACHER", "STUDENT", "SCHOOL_ADMIN", "PLATFORM_ADMIN"]}
                            element={<SchoolPage />}
                        />
                    }
                />

                {/* Курси */}
                <Route
                    path="/courses/"
                    element={
                        <PrivateRoute allowedRoles={["TEACHER", "STUDENT", "SCHOOL_ADMIN"]} element={<CoursePage />} />
                    }
                />
                <Route
                    path="/courses/:courseId"
                    element={
                        <PrivateRoute
                            allowedRoles={["TEACHER", "STUDENT", "SCHOOL_ADMIN"]}
                            element={<CourseInfoPage />}
                        />
                    }
                />

                {/* Профіль */}
                <Route
                    path="/profile/"
                    element={
                        <PrivateRoute
                            allowedRoles={["TEACHER", "STUDENT", "SCHOOL_ADMIN", "PLATFORM_ADMIN"]}
                            element={<ProfilePage isOwnProfile={true} />}
                        />
                    }
                />

                {/* Профіль іншого користувача */}
                <Route
                    path="/profile/:id/"
                    element={
                        <PrivateRoute
                            allowedRoles={["TEACHER", "STUDENT", "SCHOOL_ADMIN"]}
                            element={<ProfilePage isOwnProfile={false} />}
                        />
                    }
                />

                {/* Розклад */}
                <Route
                    path="/schedule/"
                    element={
                        <PrivateRoute
                            allowedRoles={["TEACHER", "STUDENT", "SCHOOL_ADMIN"]}
                            element={<SchedulePage />}
                        />
                    }
                />

                {/* Щоденник */}
                <Route path="/diary/" element={<PrivateRoute allowedRoles={["STUDENT"]} element={<DiaryPage />} />} />

                {/* Журнал */}
                <Route
                    path="/journal/"
                    element={
                        <PrivateRoute
                            allowedRoles={["TEACHER", "SCHOOL_ADMIN"]}
                            element={<ClassRegisterPage />}
                        />
                    }
                />




                <Route path="/reports/" element={<Loading />} />

                {/* Шкільна адмін панель */}
                <Route
                    path="/sch-admin-panel/"
                    element={<PrivateRoute allowedRoles={["SCHOOL_ADMIN"]} element={<SchAdminPanel />} />}
                />

                {/* Адмін панель платформи */}
                <Route
                    path="/admin-panel/"
                    element={<PrivateRoute allowedRoles={["PLATFORM_ADMIN"]} element={<PlfAdminPanel />} />}
                />

                {/* Вихід */}
                <Route
                    path="/logout/"
                    element={
                        <PrivateRoute
                            allowedRoles={["TEACHER", "STUDENT", "SCHOOL_ADMIN", "PLATFORM_ADMIN"]}
                            element={<LogoutPage />}
                        />
                    }
                />

                {/* Сторінка для неавторизованих або без доступу */}
                <Route path="/unauthorized/" element={<UnauthorizedPage />} />
            </Routes>
        </Router>
    );
}

export default App;

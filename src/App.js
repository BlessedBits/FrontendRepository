import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolPage from "./pages/SchoolPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import PrivateRoute from "./Context/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* Головна сторінка */}
                <Route path="/" element={<HomePage />} />

                {/* Сторінка "Школа" */}
                <Route path="school/" element={<PrivateRoute element={<SchoolPage />} />} />

                {/* Сторінка курсів */}
                <Route path="mycourses/" element={<PrivateRoute element={<CoursePage />} />} />

                {/* Сторінка профілю */}
                <Route path="my-profile/" element={<PrivateRoute element={<ProfilePage />} />} />

                {/* Сторінка розкладу */}
                <Route path="my-schedule/" element={<PrivateRoute element={<SchedulePage />} />} />
            </Routes>
        </Router>
    );
}

export default App;

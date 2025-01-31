import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import SchoolPage from "./pages/SchoolPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
//import PrivateRoute from "./context/PrivateRoute";
import DiaryPage from "./pages/DiaryPage";
import LogoutPage from "./pages/LogoutPage";


function App() {
    return (
        <Router>
            <Routes>
                {/* Головна сторінка */}
                <Route path="/" element={<HomePage />} />

                {/* Сторінка "Школа" */}
                <Route path="school/" element={<SchoolPage />} />

                {/* Сторінка курсів */}
                <Route path="mycourses/" element={<CoursePage />} />

                {/* Сторінка профілю */}
                <Route path="my-profile/" element={<ProfilePage />} />

                {/* Сторінка розкладу */}
                <Route path="my-schedule/" element={<SchedulePage />} />

                {/* Сторінка щоденника */}
                <Route path="my-diary/" element={<DiaryPage />} />    

                {/* Вихід */}
                <Route path="logout/" element={<LogoutPage />} />

            </Routes>
        </Router>
    );
}

export default App;

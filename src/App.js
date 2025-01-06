import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolPage from "./pages/SchoolPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import ProfilePage from "./pages/ProfilePage";


function App() {

    return (
        <Router>
            <Routes>
                {/* Головна сторінка */}
                <Route
                    path="/"
                    element={ <HomePage/>}
                />
                {/* Сторінка "Школа" */}
                <Route path="school/" element={<SchoolPage/> } /> 
                
                {/*Сторінка Курсів */}
                <Route path="mycourses/" element={<CoursePage/> } /> 

                {/* Сторінка профілю */}
                <Route path="my-profile/" element={<ProfilePage />} />

            </Routes>
        </Router>
    );
}

export default App;

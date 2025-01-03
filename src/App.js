import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolPage from "./pages/SchoolPage";
import HomePage from "./pages/homepage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const toggleAuthModal = () => setAuthModalOpen(!isAuthModalOpen);

    return (
        <Router>
            <Routes>
                {/* Головна сторінка */}
                <Route path="/" element={<HomePage />} />
                {/* Сторінка "Школа" */}
                <Route path="school/:schoolId" element={<SchoolPage />} />
                {/* Сторінка профілю */}
                <Route path="my-profile/:userId" element={<ProfilePage />} />

            </Routes>
        </Router>
    );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolPage from "./components/school/SchoolPage";
import HomePage from "./components/home/homepage";


function App() {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const toggleAuthModal = () => setAuthModalOpen(!isAuthModalOpen);

    return (
        <Router>
            <Routes>
                {/* Головна сторінка */}
                <Route
                    path="/"
                    element={ <HomePage/>}
                />
                {/* Сторінка "Школа" */}
                <Route path="/school/:schoolId" element={<SchoolPage/> } /> 
            </Routes>
        </Router>
    );
}

export default App;

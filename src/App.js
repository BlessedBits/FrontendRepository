import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/home/Header";
import Intro from "./components/home/Intro";
import Features from "./components/home/Features";
import FAQ from "./components/home/FAQ";
import AuthModal from "./components/home/AuthModal";
import SchoolPage from "./components/school/SchoolPage";
import Footer from "./components/basic/Footer";


function App() {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const toggleAuthModal = () => setAuthModalOpen(!isAuthModalOpen);

    return (
        <Router>
            <Routes>
                {/* Головна сторінка */}
                <Route
                    path="/"
                    element={
                        <>
                            <Header onLoginClick={toggleAuthModal} />
                            {isAuthModalOpen && (
                                <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
                            )}
                            <main>
                                <Intro />
                                <Features />
                                <FAQ />
                                <Footer/>
                            </main>
                        </>
                    }
                />
                {/* Сторінка "Школа" */}
                <Route path="/school" element={<SchoolPage/> } /> 
            </Routes>
        </Router>
    );
}

export default App;

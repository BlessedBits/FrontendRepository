import React, { useState } from "react";
import Header from "./components/home/Header";
import Intro from "./components/home/Intro";
import Features from "./components/home/Features";
import FAQ from "./components/home/FAQ";
import Footer from "./components/home/Footer";
import AuthModal from "./components/home/AuthModal";

function App() {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const toggleAuthModal = () => setAuthModalOpen(!isAuthModalOpen);

    return (
        <>
            <Header onLoginClick={toggleAuthModal} />
            {isAuthModalOpen && (
                <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
            )}
            <main>
                <Intro />
                <Features />
                <FAQ />
            </main>
            <Footer />
        </>
    );
}

export default App;

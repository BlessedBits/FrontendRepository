import React, { useState } from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

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

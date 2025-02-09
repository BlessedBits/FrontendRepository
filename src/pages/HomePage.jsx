import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import About from "../components/home/About";
import Features from "../components/home/Features";
import FAQ from "../components/home/FAQ";
import AuthModal from "../components/home/AuthModal";
import Footer from "../components/basic/Footer";

const HomePage = () => {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false); // Стан для визначення режиму

    const openLoginModal = () => {
        setIsRegistering(false); // Вхід
        setAuthModalOpen(true);
    };

    const openRegisterModal = () => {
        setIsRegistering(true); // Реєстрація
        setAuthModalOpen(true);
    };

    const closeModal = () => {
        setAuthModalOpen(false);
    };

    useEffect(() => {
        document.body.classList.add("homepage-body");
        return () => document.body.classList.remove("homepage-body");
    }, []);

    return (
        <>
            <Header onLoginClick={openLoginModal} />
            <About onRegisterClick={openRegisterModal} />
            {isAuthModalOpen && (
                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={closeModal}
                    initialIsRegistering={isRegistering}
                />
            )}

            <main className="homepage-main">
                <Features />
                <FAQ />
                <Footer />
            </main>
        </>
    );
};

export default HomePage;

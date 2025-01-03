import React, { useState } from "react"; 
import Header from "../components/home/Header";
import About from "../components/home/About";
import Features from "../components/home/Features";
import FAQ from "../components/home/FAQ";
import AuthModal from "../components/home/AuthModal";
import Footer from "../components/basic/Footer";

const HomePage = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false); 

  const toggleAuthModal = () => setAuthModalOpen(!isAuthModalOpen);

  return (
    <>
      <Header onLoginClick={toggleAuthModal} />
      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
      )}
      <main>
        <About />
        <Features />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;

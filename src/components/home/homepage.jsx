import React, { useState } from "react"; 
import Header from "./Header";
import Intro from "./Intro";
import Features from "./Features";
import FAQ from "./FAQ";
import AuthModal from "./AuthModal";
import Footer from "../basic/Footer";

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
        <Intro />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

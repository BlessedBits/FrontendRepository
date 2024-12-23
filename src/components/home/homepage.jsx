import React, { useState } from "react"; 
import Header from "./Header";
import About from "./About";
import Features from "./Features";
import FAQ from "./FAQ";
import AuthModal from "./AuthModal";
import Footer from "../basic/Footer";
import './index.css';
import './Header.css';
import './About.css';
import './Features.css';
import './FAQ.css';

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
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

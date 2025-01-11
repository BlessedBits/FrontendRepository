import React, { useEffect, useState } from "react"; 
import Header from "../components/home/Header";
import About from "../components/home/About";
import Features from "../components/home/Features";
import FAQ from "../components/home/FAQ";
import AuthModal from "../components/home/AuthModal";
import Footer from "../components/basic/Footer";

const HomePage = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false); 

  const toggleAuthModal = () => setAuthModalOpen(!isAuthModalOpen);

  useEffect(() => {
    document.body.classList.add("homepage-body");

    return () => {
      document.body.classList.remove("homepage-body");
    };
  }, []);

  return (
    <>
      <Header onLoginClick={toggleAuthModal} />
      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
      )}
      <main className="homepage-main">
        <About />
        <Features />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;

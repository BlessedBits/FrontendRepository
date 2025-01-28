import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");

    navigate("/");
  }, [navigate]);

  return <p>Вихід виконується...</p>; 
};

export default LogoutPage;

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const Info_BASE_URL = 'https://ypgblessedbits.azurewebsites.net/schedules';
// const BASE_URL = 'http://localhost:8080/schedules';

const infoInstance = axios.create({
    baseURL: Info_BASE_URL,
    timeout: 5000,
});

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return;

            try {
                const response = await axios.get('/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Помилка отримання даних користувача:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

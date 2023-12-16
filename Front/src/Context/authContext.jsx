import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:3000/api/utenti/login', credentials);
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            throw error;
        }
    };

    const register = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:3000/api/utenti/registrazione', credentials);
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            if (error.response) {
                console.error('Errore dal server:', error.response.data);
                throw new Error(error.response.data.message || 'Registrazione fallita');
            } else if (error.request) {
                console.error('Nessuna risposta dal server:', error.request);
                throw new Error('Nessuna risposta dal server');
            } else {
                console.error('Errore nella richiesta:', error.message);
                throw new Error('Errore nella richiesta di registrazione');
            }
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

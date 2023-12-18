import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const ContacsList = () => {

    const [messages, setMessages] = useState([]);



    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/contatti/', {

                });
                setMessages(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Sessione scaduta. Effettua nuovamente il login.");
                    logout();
                    navigate('/login');
                } else {
                    console.error("Errore durante la richiesta:", error);
                }

            }
        };

        fetchMessages();

    }, []);



    return (

        <table className="min-w-full divide-y">

            <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">messaggio</th>
                </tr>


            </thead>

            <tbody className=" divide-y divide-gray-300">

                {messages.map((message, index) => (

                    <tr key={index}>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{message.email}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{message.messaggio}</th>

                    </tr>

                ))}

            </tbody>
        </table>
    )
}

export default ContacsList
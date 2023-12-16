import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/authContext';

const FotoList = () => {
    const serverUrl = "http://localhost:3000/";
    const [foto, setFoto] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchFoto = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/foto/foto-personali', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });
                setFoto(response.data);
            } catch (error) {
                console.error("Errore nel caricamento delle foto:", error);

            }
        };

        if (user) {
            fetchFoto();
        }

    }, [user]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foto.map((foto, index) => (
                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src={`${serverUrl}${foto.immagine}`} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{foto.titolo}</div>
                        <p className="text-gray-700 text-base">
                            {foto.descrizione}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FotoList;

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


        <div className="overflow-x-auto">
            <table className="min-w-full divide-y">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Foto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Titolo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Descrizione</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Categoria</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Azioni</th>
                    </tr>
                </thead>

                <tbody className=" divide-y divide-gray-300">

                    {foto.map((foto, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={`${serverUrl}${foto.immagine}`} alt="Foto" className="h-10 w-10 rounded" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{foto.titolo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{foto.descrizione}</td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {foto.categorie.map(categoria => categoria.nome).join(", ")}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out mr-2">Visibilità</button>
                                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out mr-2">Modifica</button>
                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out">Cancella</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default FotoList;

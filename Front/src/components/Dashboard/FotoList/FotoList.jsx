import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/authContext';
import "./FotoList.css";

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


    // visibilità
    const toggleVisibility = async (fotoId, currentVisibility) => {
        try {
            await axios.put(`http://localhost:3000/api/admin/foto/modifica/${fotoId}`, {
                visibile: !currentVisibility
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                }
            });


            setFoto(foto.map(f => f.id === fotoId ? { ...f, visibile: !f.visibile } : f));
        } catch (error) {
            console.error("Errore durante la modifica della visibilità:", error);
        }
    };




    // elimina
    const deleteFoto = async (fotoId) => {
        if (window.confirm("Sei sicuro di voler eliminare questa foto?")) {
            try {
                await axios.delete(`http://localhost:3000/api/admin/foto/${fotoId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });

                setFoto(foto.filter(f => f.id !== fotoId));
                alert("Foto eliminata con successo");
            } catch (error) {
                console.error("Errore durante l'eliminazione della foto:", error);
            }
        }

    };




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
                                <div className="btn-container">

                                    <label className="switch">
                                        <input type="checkbox" checked={foto.visibile} onChange={() => toggleVisibility(foto.id, foto.visibile)} />
                                        <span className="slider round"></span>
                                    </label>
                                    <button className="btn-ios btn-modifica">
                                        Modifica
                                    </button>
                                    <button onClick={() => deleteFoto(foto.id)} className="btn-ios btn-cancella">Cancella</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default FotoList;

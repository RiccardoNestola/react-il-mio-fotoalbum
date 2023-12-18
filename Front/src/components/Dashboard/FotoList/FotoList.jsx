import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/authContext';
import "./FotoList.css";
import { useNavigate, Link } from 'react-router-dom';
import ContacsList from '../ContactsList/ContacsList';


const FotoList = () => {
    const navigate = useNavigate();

    const serverUrl = "http://localhost:3000/";
    const [foto, setFoto] = useState([]);
    const { user, logout } = useAuth();

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedDetailFoto, setSelectedDetailFoto] = useState(null);

    const [showView, setShowView] = useState(true);

    const toggleView = () => {
        setShowView(!showView);
    };


    const openDetailModal = (foto) => {
        setSelectedDetailFoto(foto);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedDetailFoto(null);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFotoData, setNewFotoData] = useState({
        titolo: '',
        descrizione: '',
        immagine: null,
        visibile: true,
        categorie: ''
    });

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setSelectedFoto(null);
        setNewFotoData({
            titolo: '',
            descrizione: '',
            immagine: null,
            visibile: true,
            categorie: ''
        });
    };


    /* edit */
    const [selectedFoto, setSelectedFoto] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    const openEditModal = (foto) => {
        setSelectedFoto(foto);
        setIsEditMode(true);
        setNewFotoData({
            titolo: foto.titolo,
            descrizione: foto.descrizione || '',
            immagine: null,
            visibile: foto.visibile,
            categorie: foto.categorie.map(c => c.nome).join(', ')
        });
        setIsModalOpen(true);
    };


    useEffect(() => {
        if (selectedFoto && isEditMode) {
            setNewFotoData({
                titolo: selectedFoto.titolo,
                descrizione: selectedFoto.descrizione || '',
                // L'immagine non può essere pre-riempita, quindi la lasciamo null
                immagine: null,
                visibile: selectedFoto.visibile,
                categorie: selectedFoto.categorie.map(c => c.nome).join(', ')
            });
        }
    }, [selectedFoto, isEditMode]);






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
                if (error.response && error.response.status === 401) {
                    console.error("Sessione scaduta. Effettua nuovamente il login.");
                    logout();
                    navigate('/login');
                } else {
                    console.error("Errore durante la richiesta:", error);
                }

            }
        };

        if (user) {
            fetchFoto();
        }

    }, [user]);


    // crea nuova foto
    const handleFormSubmit = async (event) => {
        event.preventDefault();


        console.log(newFotoData);
        const formData = new FormData();
        formData.append('titolo', newFotoData.titolo);
        formData.append('descrizione', newFotoData.descrizione);
        formData.append('immagine', newFotoData.immagine);
        formData.append('visibile', newFotoData.visibile);

        if (newFotoData.categorie) {
            const categorieArray = newFotoData.categorie.split(',').map(cat => cat.trim());
            console.log(categorieArray);
            categorieArray.forEach(categoria => {
                formData.append('categorie[]', categoria);
            });
        }

        try {

            if (isEditMode) {

                const response = await axios.put(`${serverUrl}api/admin/foto/modifica/${selectedFoto.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                setFoto(foto.map(f => f.id === selectedFoto.id ? { ...response.data, categorie: response.data.categorie } : f));
            }

            else {

                const response = await axios.post(`${serverUrl}api/admin/foto/carica`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${user.token}`
                    }
                });

                setFoto([...foto, { ...response.data.nuovaFoto, categorie: response.data.categorie }]);
            }





            closeModal();
        } catch (error) {
            console.log(foto);
            console.error("Errore nell'upload della foto:", error);
            if (error.response) {
                console.log("Dati della risposta:", error.response.data);
                console.log("Status della risposta:", error.response.status);
            }
        }
    };




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
            if (error.response && error.response.status === 401) {
                console.error("Sessione scaduta. Effettua nuovamente il login.");
                logout();
                navigate('/login');
            } else {
                console.error("Errore durante la modifica della visibilità:", error);
            }

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

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Sessione scaduta. Effettua nuovamente il login.");
                    logout();
                    navigate('/login');
                } else {
                    console.error("Errore durante l'eliminazione della foto:", error);
                }

            }
        }

    };




    return (


        <div className="overflow-x-auto">

            <div className="flex justify-end gap-2">
                <button onClick={openModal} className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700  btn-ios-carica mb-4">
                    Aggiungi Foto
                </button>


                <button onClick={toggleView} className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 btn-ios-carica mb-4">
                    {showView ? 'Mostra Messaggi' : 'Mostra Foto'}
                </button>
            </div>

            {showView ? (
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
                                    <img onClick={() => openDetailModal(foto)} src={`${serverUrl}${foto.immagine}`} alt="Foto" className="h-10 w-10 rounded cursor-zoom-in" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{foto.titolo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{foto.descrizione}</td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {foto.categorie?.map((categoria, index) => (
                                        <span key={index} className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-white bg-gray-500 rounded-full">{categoria.nome}</span>
                                    ))}


                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="btn-container">

                                        <label className="switch">
                                            <input type="checkbox" checked={foto.visibile} onChange={() => toggleVisibility(foto.id, foto.visibile)} />
                                            <span className="slider round"></span>
                                        </label>
                                        <button onClick={() => openEditModal(foto)} className="btn-ios btn-modifica">
                                            Modifica
                                        </button>
                                        <button onClick={() => deleteFoto(foto.id)} className="btn-ios btn-cancella">Cancella</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <ContacsList />
            )}


            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-2xl mx-4 md:w-1/3 animate-scale-up">
                            <div className="p-5">
                                <div className="text-right">
                                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <h2 className="text-lg font-bold text-center mb-4">
                                    {selectedFoto ? 'Modifica Foto' : 'Carica una Nuova Foto'}
                                </h2>
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="titolo" className="block text-sm font-medium text-gray-700">Titolo</label>
                                        <input
                                            type="text"
                                            name="titolo"
                                            id="titolo"
                                            placeholder="Titolo"
                                            value={newFotoData.titolo}
                                            onChange={(e) => setNewFotoData({ ...newFotoData, titolo: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700">Descrizione</label>
                                        <textarea
                                            name="descrizione"
                                            id="descrizione"
                                            placeholder="Descrizione"
                                            value={newFotoData.descrizione}
                                            onChange={(e) => setNewFotoData({ ...newFotoData, descrizione: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label htmlFor="visibile" className="block text-sm font-medium text-gray-700">Visibile</label>
                                        <input
                                            type="checkbox"
                                            name="visibile"
                                            id="visibile"
                                            checked={newFotoData.visibile}
                                            onChange={(e) => setNewFotoData({ ...newFotoData, visibile: e.target.checked })}
                                            className="mt-1 h-4 w-4 accent-gray-500 focus:ring-gray-500 border-gray-300 rounded mr-2"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="categorie" className="block text-sm font-medium text-gray-700">Categorie</label>
                                        <input
                                            name="categorie"
                                            id="categorie"
                                            value={newFotoData.categorie}
                                            onChange={(e) => setNewFotoData({ ...newFotoData, categorie: e.target.value })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                                            placeholder="Inserisci categorie separate da virgola"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="immagine" className="block text-sm font-medium text-gray-700">Immagine</label>
                                        <input
                                            type="file"
                                            name="immagine"
                                            id="immagine"
                                            onChange={(e) => setNewFotoData({ ...newFotoData, immagine: e.target.files[0] })}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
                                            required
                                        />
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 btn-ios-carica ">
                                            {selectedFoto ? 'Modifica Foto' : 'Carica Foto'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* dettaglio foto */}
            {isDetailModalOpen && selectedDetailFoto && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-2xl mx-4 md:w-1/2 animate-scale-up">
                            <div className="p-5">
                                <div className="text-right">
                                    <button onClick={closeDetailModal} className="text-gray-500 hover:text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <img
                                        src={`${serverUrl}${selectedDetailFoto.immagine}`}
                                        alt="Dettaglio Foto"
                                        className="max-w-full h-auto rounded"
                                    />
                                    <h3 className="text-lg font-bold">{selectedDetailFoto.titolo}</h3>
                                    <p>{selectedDetailFoto.descrizione}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default FotoList;

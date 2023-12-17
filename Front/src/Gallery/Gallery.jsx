import React, { useState, useEffect } from 'react';
import { getFoto } from '../api/foto';

const Gallery = () => {
    const serverUrl = "http://localhost:3000/";
    const [foto, setFoto] = useState([]);

    useEffect(() => {
        const fetchFoto = async () => {
            const fotoData = await getFoto();
            setFoto(fotoData);
            console.log(fotoData);
        };

        fetchFoto();
    }, []);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex w-full mb-20 flex-wrap">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">L'Arte della Fotografia per Professionisti</h1>
                    <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">Offriamo un'ampia galleria di immagini mozzafiato, consigli esperti e una comunità vibrante dove la passione per la fotografia incontra l'eccellenza professionale. Che tu sia un fotografo di ritratti, paesaggi, eventi o moda.</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {foto.filter(f => f.visibile).map((f, index) => (
                        <div key={f.id} className={`p-2 w-1/2 md:w-1/3 lg:w-1/4 ${index % 2 === 0 ? 'translate-y-4' : 'translate-y-0'}`}>
                            <div className="relative overflow-hidden">
                                <img alt={f.descrizione} className="w-full object-cover object-center h-64 block transform transition duration-500 hover:scale-110" src={`${serverUrl}${f.immagine}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;

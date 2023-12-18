import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/contatti/aggiungi', { email, messaggio: message });
            console.log(response.data);
            setShowBanner(true);

            setEmail('');
            setMessage('');

            setTimeout(() => {
                setShowBanner(false);
                navigate('/');
            }, 3000);


        } catch (error) {
            console.error('Si è verificato un errore durante l\'invio del messaggio', error);
        }
    };


    useEffect(() => {
        return () => clearTimeout();
    }, []);


    return (
        <>
            <Header />
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contattaci</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hai bisogno di qualcosa? Contattaci</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Messaggio</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button type="submit" className="flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">Invia</button>
                            </div>
                        </form>

                        {showBanner && (
                            <div className="p-2 w-full text-center">
                                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <strong class="font-bold">Ottimo! </strong>
                                    <span class="block sm:inline">Messaggio inviato con successo</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contacts;

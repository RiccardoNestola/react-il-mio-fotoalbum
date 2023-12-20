import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const [isRegistered, setIsRegistered] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    const [timeLeft, setTimeLeft] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ nome, email, password });
            setIsRegistered(true);
            setShowBanner(true);

        } catch (error) {
            console.error('Errore di registrazione:', error);
        }
    };

    useEffect(() => {
        let intervalId;

        if (isRegistered) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft <= 1) {
                        setShowBanner(false);
                    }
                    return prevTimeLeft - 1;
                });
            }, 1000);

            setTimeout(() => navigate('/login'), 3000);
        }

        return () => clearInterval(intervalId);
    }, [isRegistered, navigate]);



    return (

        <>
            <section className="text-gray-600 body-font relative">
                <div className="absolute inset-0 bg-gray-300">
                    <img src="https://source.unsplash.com/random" alt="Random" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="container px-5 py-24 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Registrazione</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">Crea il tuo account per iniziare.</p>
                        <form onSubmit={handleSubmit} className="relative mb-4">
                            <div className="relative mb-4">
                                <label htmlFor="nome" className="leading-7 text-sm text-gray-600">Nome</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg">Registrati</button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">Unisciti a noi per una nuova esperienza.</p>
                        {showBanner && (
                            <div className="p-2 w-full text-center">
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <p>
                                        <strong className="font-bold">Registrazione avvenuta con successo</strong>
                                    </p>

                                    <p className="block sm:inline">Verrai indirizzato alla pagina di login tra {timeLeft} s</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>



        </>






    );
};

export default RegisterForm;

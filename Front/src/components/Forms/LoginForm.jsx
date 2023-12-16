import React, { useState } from 'react';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (error) {
            console.error('Errore di login:', error);

        }
    };

    return (
        <section className="text-gray-600 body-font relative">
            <div className="absolute inset-0 bg-gray-300">
                <img src="https://source.unsplash.com/random" alt="Random" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="container px-5 py-24 mx-auto flex">
                <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Login</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">Benvenuto! Per favore, accedi per continuare.</p>
                    <form onSubmit={handleSubmit} className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600 mt-4">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg mt-4">Login</button>
                    </form>
                    <p className="text-xs text-gray-500 mt-3">Accedi per esplorare le nuove caratteristiche.</p>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;

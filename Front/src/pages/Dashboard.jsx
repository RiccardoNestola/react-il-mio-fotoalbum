import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import FotoList from '../components/Dashboard/FotoList/FotoList'
import { useAuth } from '../Context/authContext'



const Dashboard = () => {
    const { user } = useAuth();
    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Benvenuto nella tua dashboard, {user.utente.nome}</h1>
            </div>

            <div className="container mx-auto p-4">
                <p className="text-xl font-bold mb-4">Le tue foto</p>
                <FotoList />
            </div>


            <Footer />
        </>
    )
}

export default Dashboard
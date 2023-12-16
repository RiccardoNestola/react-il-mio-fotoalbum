import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AddPhotoButton from '../components/Dashboard/Buttons/AddPhotoButton'
import ViewPhotosButton from '../components/Dashboard/Buttons/ViewPhotosButton'
import UpdatePhotoButton from '../components/Dashboard/Buttons/UpdatePhotoButton'
import DeletePhotoButton from '../components/Dashboard/Buttons/DeletePhotoButton'
import FotoList from '../components/Dashboard/FotoList/FotoList'



const Dashboard = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Gestione Foto</h1>
                <AddPhotoButton />
                <ViewPhotosButton />
                <UpdatePhotoButton />
                <DeletePhotoButton />
            </div>

            <div className="container mx-auto p-4">
                <FotoList />
            </div>


            <Footer />
        </>
    )
}

export default Dashboard
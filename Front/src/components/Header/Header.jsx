import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../Context/authContext'

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <>

            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg width="40" height="40" viewBox="0 0 59 59" version="1.1" xmlns="http://www.w3.org/2000/svg" jetway-hooks="{}"><g jetway-hook-id="D32A0C4D-4437-47B2-A852-7B39F943D3F1"><g jetway-hook-id="647A0BE8-6A54-4FD3-92E7-3C0C54A07C51" stroke="none" fill="none"><g jetway-hook-id="4B4991DA-B6A7-4A61-B064-B6BCDC859944"><g jetway-hook-id="F7C64F54-09B8-4D6D-9454-F58219AA5601"><g jetway-hook-id="45B02426-3A5F-49AF-8232-3C1F09D29D37"><path jetway-hook-id="68097562-43CD-4175-BD0F-8131708A2434" d="M-3-3h64v64H-3z" /><g jetway-hook-id="DD923623-943A-45E3-8DE8-A4A4B8A7C198"><path d="M14.75 13.41c8.146 0 14.75 6.603 14.75 14.75v1.34H1.34C.6 29.5 0 28.9 0 28.16c0-8.147 6.604-14.75 14.75-14.75z" jetway-hook-id="B4287B30-9B3D-4F6B-9C01-2A7C2CA23D6F" fill="#FBBC04" /><path d="M45.59 14.75c0 8.146-6.603 14.75-14.75 14.75H29.5V1.34C29.5.6 30.1 0 30.84 0c8.147 0 14.75 6.604 14.75 14.75z" jetway-hook-id="5872DD7E-5971-4393-9299-364708D669BC" fill="#EA4335" /><path d="M44.25 45.59c-8.146 0-14.75-6.603-14.75-14.75V29.5h28.16c.74 0 1.34.6 1.34 1.34 0 8.147-6.604 14.75-14.75 14.75z" jetway-hook-id="184B2279-6FFE-4CA2-B961-54092B122EB8" fill="#4285F4" /><path d="M13.41 44.25c0-8.146 6.603-14.75 14.75-14.75h1.34v28.16c0 .74-.6 1.34-1.34 1.34-8.147 0-14.75-6.604-14.75-14.75z" jetway-hook-id="2AD9C930-A41C-474E-9152-1E50FC2C457C" fill="#34A853" /></g></g></g></g></g></g></svg>
                        <a href="/" className="ml-3 text-xl">Foto Album</a>
                    </div>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                        <NavLink to='/' className="mr-5 hover:text-gray-900">Home</NavLink>
                        <NavLink to='/contatti' className="mr-5 hover:text-gray-900">Contattaci</NavLink>
                    </nav>

                    {!user && (
                        <>
                            <NavLink to='/login' className="mx-2 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                            </NavLink>

                            <NavLink to='/registrati' className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Registrati
                            </NavLink>
                        </>



                    )}


                    {user && (
                        <>
                            <p className="mx-2 inline-flex items-center py-1 px-3 font-bold focus:outline-none text-base mt-4 md:mt-0"> Ciao {user.utente.nome || "utente"}</p>
                            <button className="inline-flex items-center mx-2 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={logout}>Logout</button>
                            <NavLink to="/dashboard" className="inline-flex items-center mx-2 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Dashboard</NavLink>


                        </>
                    )}

                </div>
            </header>
        </>
    )
}

export default Header;
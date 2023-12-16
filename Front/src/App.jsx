import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './Context/authContext';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registrati" element={<Register />}></Route>


          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

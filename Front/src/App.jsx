import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './Context/authContext';
import Protected from './components/Auth/Protected';
import Contacts from './pages/Contacts';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registrati" element={<Register />}></Route>
            <Route path="/contatti" element={<Contacts />}></Route>
            <Route path="/dashboard" element={
              <Protected>
                <Dashboard />
              </Protected>
            }></Route>


          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Registrati from './pages/Registrati';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registrati" element={<Registrati />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

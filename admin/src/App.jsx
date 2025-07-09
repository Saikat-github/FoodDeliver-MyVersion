import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Add from './pages/add/Add'
import List from './pages/list/List'
import Orders from './pages/orders/Orders'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from './pages/edit/Edit'

const App = () => {
    const url = import.meta.env.VITE_BACKEND_URL

  return (
    <div className='font-Outfit'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='flex'>
        <Routes>
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
          <Route path='/edit/:id' element={<Edit url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

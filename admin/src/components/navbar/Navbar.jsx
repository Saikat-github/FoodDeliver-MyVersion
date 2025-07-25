import React from 'react'
import { assets } from '../../assets/assets'
import Sidebar from '../sidebar/Sidebar'


const Navbar = () => {
  return (
    <div className='navbar flex justify-between items-center py-2 px-8'>
      <img src={assets.logo} alt="" className='logo w-28'/>
      <Sidebar />
      <img src={assets.profile_image} alt="" className='profile w-10' />
    </div>
  )
}

export default Navbar
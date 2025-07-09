import React from 'react'
import { assets } from '../../assets/assets'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
      <div className="flex gap-4">
        <NavLink to='/add' className={({isActive}) => `sidebar-option xs:pr-2 pr-1 flex flex-col md:flex-row items-center gap-3 sm:py-2 sm:px-3 cursor-pointer  ${isActive ? "text-black bg-slate-400" : ""}`}>
          <img src={assets.add_icon} alt="" className='h-6 w-6'/>
          <p className='hidden sm:inline text-sm '>Add Items</p>
        </NavLink>
        <NavLink to='/' className={({isActive}) => `sidebar-option xs:pr-2 pr-1 flex flex-col md:flex-row items-center gap-3 sm:py-2 sm:px-3 cursor-pointer  ${isActive ? "text-black bg-slate-400" : ""}`}>
          <img src={assets.order_icon} alt="" className='h-6 w-6'/>
          <p className='hidden sm:inline text-sm '>List Items</p>
        </NavLink>
        <NavLink to='/orders' className={({isActive}) => `sidebar-option xs:pr-2 pr-1 flex flex-col md:flex-row items-center gap-3 sm:py-2 sm:px-3 cursor-pointer  ${isActive ? "text-black bg-slate-400" : ""}`}>
          <img src={assets.order_icon} alt="" className='h-6 w-6'/>
          <p className='hidden sm:inline text-sm '>Orders</p>
        </NavLink>
      </div>
  )
}

export default Sidebar
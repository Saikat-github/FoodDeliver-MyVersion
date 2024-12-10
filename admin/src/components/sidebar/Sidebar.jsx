import React from 'react'
import { assets } from '../../assets/assets'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar w-1/3 lg:w-1/6  min-h-[100vh] border border-gray-400 border-t-0'>
      <div className="sidebar-options pt-12 lg:pl-8 sm:pl-4 flex flex-col gap-5">
        <NavLink to='/add' className={({isActive}) => `sidebar-option xs:pr-2 pr-1 flex flex-col md:flex-row items-center gap-3 border-0 sm:border-2 sm:border-gray-400 sm:border-r-0 sm:py-2 sm:px-3 cursor-pointer rounded-bl-md rounded-ss-md ${isActive ? "text-black bg-slate-400" : ""}`}>
          <img src={assets.add_icon} alt="" className='h-8 w-8'/>
          <p className='hidden sm:inline lg:text-lg text-xs '>Add Items</p>
        </NavLink>
        <NavLink to='/' className={({isActive}) => `sidebar-option xs:pr-2 pr-1 flex flex-col md:flex-row items-center gap-3 border-0 sm:border-2 sm:border-gray-400 sm:border-r-0 sm:py-2 sm:px-3 cursor-pointer rounded-bl-md rounded-ss-md ${isActive ? "text-black bg-slate-400" : ""}`}>
          <img src={assets.order_icon} alt="" className='h-8 w-8'/>
          <p className='hidden sm:inline lg:text-lg text-xs '>List Items</p>
        </NavLink>
        <NavLink to='/orders' className={({isActive}) => `sidebar-option xs:pr-2 pr-1 flex flex-col md:flex-row items-center gap-3 border-0 sm:border-2 sm:border-gray-400 sm:border-r-0 sm:py-2 sm:px-3 cursor-pointer rounded-bl-md rounded-ss-md ${isActive ? "text-black bg-slate-400" : ""}`}>
          <img src={assets.order_icon} alt="" className='h-8 w-8'/>
          <p className='hidden sm:inline lg:text-lg text-xs '>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
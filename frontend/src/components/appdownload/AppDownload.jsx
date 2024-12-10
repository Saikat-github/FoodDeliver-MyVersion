import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download m-auto mt-24 text-3xl font-semibold text-center text-gray-900' id='app-download'>
        <p>For Better Experience Download <br /> <span className='text-red-600'>Tomato App</span></p>
        <div className="app-download-platforms flex justify-center gap-4 mt-10">
            <img className='w-36 max-w-40 transition duration-50 cursor-pointer hover:scale-105' src={assets.play_store} alt="" />
            <img className='w-36 max-w-40 transition duration-50 cursor-pointer hover:scale-105' src={assets.app_store} alt="" />
        </div>

    </div>
  )
}

export default AppDownload
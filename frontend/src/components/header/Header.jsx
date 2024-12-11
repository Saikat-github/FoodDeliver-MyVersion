import React from 'react'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='h-[40vw] mb-10 sm:mt-10 mt-0 mx-auto bg-[url("./header_img.png")] bg-cover relative bg-no-repeat rounded-lg' >
        <div className='relative flex flex-col items-start  gap-[1.5vw] max-w-[50%] lg:top-52 lg:left-16 animate-[fadeIn_3s] px-4 py-4'>
            <h2 className='lg:text-5xl sm:text-3xl font-semibold text-white drop-shadow-md'>Order your favourite food here</h2>
            <p className='text-white hidden lg:inline drop-shadow-md'>Choose from a diverse menu featuring a delecable array of dishes crafted with the finest ingredient and culinary expertise.</p>
            <a href='#menu' className='border-none text-gray-700 text-[12px] px-2  sm:text-xl sm:font-medium sm:px-4 sm:py-2 rounded-full bg-white hover:bg-gray-100 shadow-md'>View Menu</a>
        </div>
    </div>
  )
}

export default Header
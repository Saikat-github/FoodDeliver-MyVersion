import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer text-slate-50 bg-gray-800 flex flex-col items-center gap-6 px-24 py-20 mt-10 ' id='footer'>
        <div className="footer-content w-[100%] flex flex-col md:flex-row gap-6 justify-between">
            <div className="footer-content-left md:max-w-[30%] flex flex-col items-start gap-6 w-[100%]">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, animi corrupti eum quo fugiat doloremque id corporis laborum pariatur ipsum accusantium eveniet mollitia, quia velit modi dicta? Sit, et doloremque.</p>
                <div className="footer-social-icons flex">
                    <img className='w-10 mr-4 transition duration-200 cursor-pointer hover:scale-105' src={assets.facebook_icon} />
                    <img className='w-10 mr-4 transition duration-200 cursor-pointer hover:scale-105' src={assets.twitter_icon} />
                    <img className='w-10 mr-4 transition duration-200 cursor-pointer hover:scale-105' src={assets.linkedin_icon}  />
                </div>
            </div>
            <div className="footer-content-center flex flex-col items-start gap-6">
                <h2 className='text-2xl font-semibold'>COMPANY</h2>
                <ul className='flex flex-col gap-2'>
                    <li className='cursor-pointer hover:text-gray-200'>Home</li>
                    <li className='cursor-pointer hover:text-gray-200'>About Us</li>
                    <li className='cursor-pointer hover:text-gray-200'>Delivery</li>
                    <li className='cursor-pointer hover:text-gray-200'>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right flex flex-col items-start gap-6">
                <h2 className='text-2xl font-semibold'>GET IN TOUCH</h2>
                <ul className='flex flex-col gap-2'>
                    <li className='cursor-pointer hover:text-gray-200'>+1-212-456-7890</li>
                    <li className='cursor-pointer hover:text-gray-200'>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr className='w-[100%] h-1 my-6'/>
        <p className="footer-copyright">
            Copyright 2024 &copy; Tomato.com - All Rights Reserved.
        </p>


    </div>
  )
}

export default Footer
import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems, setShowLogin, setToken } from '../../features/cartSlice'





const Navbar = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalAmt = useSelector((state) => state.totalAmt);
  const token = useSelector((state) => state.token)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    dispatch(setCartItems({}))
    alert("Logged out successfully");
    navigate("/")
  }



  return (
    <div className='py-6 flex justify-between items-center px-[10%] font-Outfit sticky top-0 z-10 bg-white'>
      <div className="logo">
        <Link to="/"><img src={assets.logo} alt="" className='h-6 sm:h-8 md:h-10 cursor-pointer' /></Link>
      </div>
      <div className="nav-options list-none lg:flex gap-6 text-slate-700 hidden">
        <Link to="/" className='pb-2 border-b-2 border-transparent hover:cursor-pointer hover:border-slate-700'>Home</Link>
        <a href='#menu' className='pb-2 border-b-2 border-transparent hover:cursor-pointer hover:border-slate-700'>Menu</a>
        <a href='#app-download' className='pb-2 border-b-2 border-transparent hover:cursor-pointer hover:border-slate-700'>Mobile App</a>
        <a href='#footer' className='pb-2 border-b-2 border-transparent hover:cursor-pointer hover:border-slate-700'>Contact Us</a>
      </div>
      <div className="nav-actions flex items-center gap-4 sm:gap-10">
        <img src={assets.search_icon} alt="search-icon" className='h-4 sm:h-8 hidden sm:inline' />
        <div className="cart">
          <Link to="/cart"><img src={assets.basket_icon} alt="" className='h-6 sm:h-8 cursor-pointer' /></Link>
          <div className={totalAmt > 0 ? "relative w-2 h-2 bg-red-500 rounded-full top-[-34px] right-[-10px]" : "hidden"}></div>
        </div>
        {!token ? <button onClick={() => dispatch(setShowLogin())} className='bg-transparent text-red-600 text-sm md:text-lg  border-2 border-red-600 py-1 px-4 sm:px-6 rounded-full cursor-pointer hover:bg-red-600 hover:text-white transition-all'>Login</button>
          : <div className='navbar-profile relative group'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown hidden absolute right-0 z-10 group-hover:flex flex-col gap-2 py-3 px-6 rounded-md border border-red-700 bg-white">
              <li onClick={() => navigate("/myorders")} className='flex  items-center cursor-pointer gap-2'><img className='w-5' src={assets.bag_icon} alt="" /><p className='text-sm hover:text-red-700'>Orders</p></li>
              <hr />
              <li onClick={logout} className='flex  items-center cursor-pointer gap-2'><img className='w-5' src={assets.logout_icon} alt="" /><p className='text-sm hover:text-red-700'>Logout</p></li>
            </ul>
          </div>}
        {/* <button onClick={() => dispatch(setShowLogin())} className='bg-red-600 text-white shadow-black shadow-md text-sm md:text-lg  py-1 px-4 sm:px-6 rounded-full cursor-pointer hover:bg-red-600 hover:text-white transition-all'>Sign up</button> */}
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu flex flex-col gap-6 ' id='menu'>
      
      <h1 className='font-medium text-2xl'>Explore Our Menu</h1>
      <p className='explore-menu-text md:max-w-[60%] max-w-[100%] text-xs sm:text-lg'>Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>

      <div className="explore-menu-list flex justify-between items-center text-center gap-6 mx-6 overflow-x-scroll no-scrollbar" id='menu'>
        {menu_list.map((list, idx) => (
          <div key={idx}>
            <img onClick={() => category!==list.menu_name ? setCategory(list.menu_name) : setCategory("All")} src={list.menu_image} alt="img" className={category===list.menu_name ? 'min-h-32 min-w-32 cursor-pointer rounded-full transition border-4 border-red-600 p-1' : 'min-h-32 min-w-32 cursor-pointer rounded-full transition border-2 border-white p-1'}/>
            <p className='mt-2 text-slate-700 text-lg cursor-pointer'>{list.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className='my-2 h-[2px] bg-slate-300 border-none'/>
    </div>
  )
}

export default ExploreMenu
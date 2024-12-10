import React from 'react'
import { assets } from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../features/cartSlice'
import axios from 'axios'

const FoodItem = ({ item }) => {
  const cartItems = useSelector((state) => state.cartItems);
  const url = useSelector((state) => state.url);
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch();

  const cartAdd = async (itemId) => {
    dispatch(addToCart(itemId));
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
    }
  }

  const cartRemove = async (itemId) => {
    dispatch(removeFromCart(itemId));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
    }
  }


  return (
    <div className='food-item w-[360px] shadow-xl transition animate-[fadeIn_1s] rounded-lg bg-white'>
      <div className="food-item-img-container relative">
        <img src={`${url}/images/` + item.image} className='food-item-img rounded-t-xl w-[100%] ' alt="" />
        {!cartItems[item._id]
          ? <img className='add cursor-pointer w-8 absolute bottom-4 right-4 rounded-full' onClick={() => cartAdd(item._id)} src={assets.add_icon_white} alt='' />
          : <div className="food-item-counter flex gap-2 items-center absolute bottom-4 right-4 p-1 bg-white rounded-full">
            <img onClick={() => cartRemove(item._id)} src={assets.remove_icon_red} alt="" className='cursor-pointer w-8' />
            <p>{cartItems[item._id]}</p>
            <img onClick={() => cartAdd(item._id)
            } src={assets.add_icon_green} alt="" className='cursor-pointer w-8' />
          </div>
        }
      </div>
      <div className="food-item-info p-4">
        <div className="food-item-name-rating flex justify-between items-center">
          <h2 className='text-lg font-semibold text-gray-900'>{item.name}</h2>
          <img src={assets.rating_starts} alt="" className='w-20' />
        </div>
        <p className="food-item-description text-gray-700 opacity-90 text-sm">{item.description}</p>
        <h2 className="food-item-price text-red-600 text-lg my-2 font-semibold">₹{item.price}</h2>
      </div>
    </div>
  )
}

export default FoodItem
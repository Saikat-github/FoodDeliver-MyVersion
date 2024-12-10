import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import {useNavigate} from 'react-router-dom';


const List = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const respone = await axios.get(`${url}/api/food/list`);
      if (respone.data.success) {
        setList(respone.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = useCallback(async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove/${foodId}`);
      await fetchList();
      if (response.data.success) {
        toast.success("Food item deleted successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }

  }, [])

  return (
    <div className='list add flex flex-col sm:pl-10 py-6 w-3/4 md:2/3'>
      <h2 className='text-center text-2xl font-bold bg-gray-600 text-white mx-auto w-60 py-2 rounded-md mb-6'>List of All Foods</h2>
      <div className="list-table">
        <div className="list-table-format title grid sm:grid-cols-6 grid-cols-4 items-center gap-2 px-4 py-3 border text-sm w-full">
          <b className='sm:text-sm text-xs'>Image</b>
          <b className='sm:text-sm text-xs hidden sm:inline'>Name</b>
          <b className='hidden sm:inline'>Category</b>
          <b className='sm:text-sm text-xs'>Price</b>
          <b className='sm:text-sm text-xs'>Delete</b>
          <b className='sm:text-sm text-xs'>Edit</b>
        </div>
        {list?.map((item, index) => {
          return (
            <div key={index} className='list-table-format grid sm:grid-cols-6 grid-cols-4 items-center gap-2 px-4 py-3 border text-sm w-full'>
              <img src={`${url}/images/` + item.image} alt="" className='w-12' />
              <p className='sm:text-sm text-xs hidden sm:inline'>{item.name}</p>
              <p className='sm:text-sm text-xs hidden sm:inline'>{item.category}</p>
              <p className='sm:text-sm text-xs'>₹{item.price}</p>
              <img src={assets.deleteIcon} className='cursor-pointer w-4 opacity-65 hover:opacity-100 transition-all duration-300' onClick={() => { removeFood(item._id) }} />
              <img src={assets.editIcon} onClick={() => navigate(`/edit/${item._id}`)} className='cursor-pointer w-4 opacity-65 hover:opacity-100 transition-all duration-300'/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
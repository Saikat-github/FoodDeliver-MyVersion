import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [loadiing, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const url = useSelector((state) => state.url);
  const token = useSelector((state) => state.token);


  const options = {
  timeZone: 'Asia/Kolkata',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      setError("Some error occurred, Please try again");
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);


  return (
    loadiing
      ?
      <p className='text-center py-10 text-3xl font-semibold'>Loading...</p>
      :
      <div className='mt-4'>
        {error && <p className='bg-red-500 text-white text-center py-2 rounded-lg text-xl my-4'>{error}</p>}
        <h2 className='text-center text-2xl font-bold bg-orange-600 text-white mx-auto w-40 py-2 rounded-md'>My Orders</h2>
        <hr className='my-4'/>
        <div className='my-4'>
          {data.map((order, idx) => {
            return (
              <div key={idx} className='grid grid-cols-3 md:grid-cols-6 border-2 items-center max-sm:text-sm gap-2 p-1'>
                <div>
                  <img src={assets.parcel_icon} className='w-12' />
                  <p className='text-xs md:w-1/2'>{new Date(order.data).toLocaleString('en-IN', options)}</p>
                </div>
                <p className='pr-4 text-sm my-2'>{order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}</p>
                <p className='text-center text-xs sm:text-sm'>₹{order.amount}.00 <br />{order.payment ? "Paid through" : "Not Paid through"} {order.paymentMethod}</p>
                <p>Items : {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button onClick={() => fetchOrders()} className='py-2 px-3 bg-red-300 rounded-sm mx-2 hover:bg-red-400 transition-all duration-300 max-sm:text-xs'>Track Order</button>
              </div>
            )
          })}
        </div>
      </div>
  )
}

export default MyOrders
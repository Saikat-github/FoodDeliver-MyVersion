import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useCallback } from 'react';
import {Loader2} from "lucide-react"

const options = {
  timeZone: 'Asia/Kolkata',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);


  const fetchAllOrders = async () => {
    try {
      setLoader(true)
      const response = await axios.get(url + "/api/order/listorders");
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false)
    }
  }

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/update", { orderId, status: e.target.value });
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  const paymentHandler = useCallback(async (e, orderId) => {
    let paymentDone = e.target.value === "Yes" ? true : false;
    const response = await axios.post(url + "/api/order/update", { orderId, payment: paymentDone });
    if (response.data.success) {
      await fetchAllOrders();
    }
  }, [orders])

  useEffect(() => {
    fetchAllOrders();
  }, [])


  if (loader) {
    return <div className='flex justify-center w-full my-20'>
            <Loader2 className='w-6 animate-spin mx-auto'/>
    </div>
  }

  return (
    <div className='order add md:my-6 m-2'>
      <h2 className='text-center text-2xl font-bold bg-gray-600 text-white mx-auto w-60 py-2 rounded-md mb-6'>All Orders</h2>

      <div className="order-list mt-6 flex flex-col gap-5">
        {orders.map((order, idx) => (
          <div className="order-item grid grid-cols-3 md:grid-cols-5 border border-red-600 text-sm text-gray-500 p-4" key={idx}>
            <div>
              <img src={assets.parcel_icon} className='w-12' />
              <p className='text-xs md:w-1/2'>{new Date(order.data).toLocaleString('en-IN', options)}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='order-item-food font-semibold'>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ","
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstname + " " + order.address.lastname}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
            </div>
            <p className='ml-2'>Items : {order.items.length}</p>
            <div className='space-y-2'>
              <p>₹{order.amount} <br />
                <span className='text-xs'>Payment : {order.payment ? "Done" : "Not Done"} ({order.paymentMethod})</span>
              </p>
              <select name="paymentMethod" onChange={(e) => paymentHandler(e, order._id)} className='bg-red-400 text-slate-100 h-10 p-2 text-center rounded-sm cursor-pointer outline-none' >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='bg-red-400 text-slate-100 h-10 p-2 text-center rounded-sm cursor-pointer outline-none'>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
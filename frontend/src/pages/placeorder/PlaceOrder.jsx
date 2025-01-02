import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to COD


  const totalAmt = useSelector((state) => state.totalAmt);
  const token = useSelector((state) => state.token);
  const foodList = useSelector((state) => state.foodList);
  const cartItems = useSelector((state) => state.cartItems);
  const url = useSelector((state) => state.url);

  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.warn("Please login to place order");
      navigate("/")
    } else if (totalAmt === 0) {
      navigate("/cart");
    }
  }, [])



  const placeOrder = async (data) => {

    setLoading(true);
    setError(null);
    try {
      let orderItems = [];
      foodList.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      })

      let orderData = {
        address: data,
        items: orderItems,
        amount: totalAmt + 20,
        paymentMethod: paymentMethod
      };

      console.log(orderData);
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
      reset()
    }
  }


  return (
    <div className=''>
      {error && <p className='bg-red-600 text-gray-100 font-semibold text-lg sm:text-2xl border-4 py-4 px-6 border-red-600 rounded-md text-center'>{error}!</p>}
      <form onSubmit={handleSubmit(placeOrder)} className='place-order flex flex-col md:flex-row items-start justify-between gap-4 mt-16'>

        {/* place order left */}
        <div className="place-order-left">
          <p className="title text-lg md:text-2xl font-bold mb-8">Delivery Information</p>
          <div className="multi-fields flex gap-2 md:text-lg text-sm">
            <input className={`mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounde `} type="text" placeholder='First Name' {...register("firstname", { required: true })} />
            <input className='mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Last Name' {...register("lastname", { required: true })} />
          </div>
          <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="email" placeholder='Email address' {...register("email", { required: true })} />
          <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Street' {...register("street", { required: true })} />
          <div className="multi-fields flex gap-2">
            <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='City' {...register("city", { required: true })} />
            <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='State' {...register("state", { required: true })} />
          </div>
          <div className="multi-fields flex gap-2">
            <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Zip code' {...register("pincode", { required: true })} />
            <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Country' {...register("country", { required: true })} />
          </div>
          <input className='md:text-lg text-sm mb-4 w-[100%] p-2 border border-gray-400 outline-red-600 rounded' type="text" placeholder='Phone' {...register("phone", { required: "Phone Number is required" })} />
        </div>


        {/* place order Right */}
        <div className="place-order-right w-[50%] md:text-lg text-sm">
          <div className="cart-total flex-1 flex flex-col gap-6 mb-2">
            <h2 className='text-lg md:text-2xl font-semibold'>Cart Totals</h2>
            <div>
              <div className="cart-total-details flex justify-between">
                <p>Subtotal</p>
                <p>₹{totalAmt}</p>
              </div>
              <hr className='my-4' />
              <div className="cart-total-details flex justify-between">
                <p>Delivery Fee</p>
                <p>₹{totalAmt > 0 ? 20 : 0}</p>
              </div>
              <hr className='my-4' />
              <div className="cart-total-details flex justify-between">
                <b>Total</b>
                <b>₹{totalAmt > 0 ? totalAmt + 20 : 0}</b>
              </div>
            </div>
          </div>


          <div className="payment-method my-6 space-y-4">
            <h2 className="text-lg md:text-2xl font-semibold">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 border border-red-500 p-2 rounded-sm">
                <input
                  className=''
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2 border border-red-500 p-2 rounded-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === "Stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Stripe (Credit/Debit)
              </label>
            </div>
          </div>

          <button disabled={loading} className={`p-2 rounded text-white ${loading ? "bg-red-300" : "bg-red-600"} text-sm cursor-pointer w-48`} type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
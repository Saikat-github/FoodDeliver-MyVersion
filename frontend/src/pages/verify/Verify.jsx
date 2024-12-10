import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';



const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const url = useSelector((state) => state.url);
    const navigate = useNavigate();


    const verifyPayment = useCallback(async () => {
        const response = await axios.post(url+"/api/order/verify", {success, orderId});
        if(response.data.success) {
            navigate("/myorders")
        } else {
            alert("Payment failed")
            navigate("/")
        }
    }, [success, orderId]);

    useEffect(() => {
        verifyPayment();
    }, [])
    return (
        <div className='verify min-h-[60vh] grid'>
        <div className="spinner w-24 h-24 place-self-center  border-4 border-t-red-600 rounded-full animate-rotate ">
        </div>
    </div>
    )
}

export default Verify
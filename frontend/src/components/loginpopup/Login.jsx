import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLogin, setToken } from '../../features/cartSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';




const LoginPopup = () => {
    const [currentState, setCurrentState] = useState("Login");
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()
    const dispatch = useDispatch()
    const url = useSelector((state) => state.url);
    const navigate = useNavigate();


    const onSubmitHandler = async (data) => {
        setError(null);
        try {
            let newUrl = url;
            if (currentState === 'Login') {
                newUrl += "/api/user/login"
            } else {
                newUrl += "/api/user/register"
            }
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                dispatch(setToken(response.data.token));
                localStorage.setItem("token", response.data.token);
                alert("User logged in successfully")
                dispatch(setShowLogin());
            } else {
                setError(response.data.message)
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            reset()
        }
    }


    return (
        <div className='login-popup absolute z-10 bg-[#00000090] h-screen w-full flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='login-popup-container place-self-center w-80 text-[#808080] bg-white flex flex-col gap-6 px-8 py-6 rounded animate-[fadeIn_0.5s] text-sm'>
                {error && <p className='text-red-600 text-center font-semibold text-lg'>{error}!</p>}
                <div className="login-popup-title flex justify-between items-center text-black">
                    <h2 className='text-2xl font-bold'>{currentState}</h2>
                    <img onClick={() => dispatch(setShowLogin())} src={assets.cross_icon} alt="" className='w-4 cursor-pointer' />
                </div>
                <div className="login-popup-inputs flex flex-col gap-6">
                    {currentState === "Login" ? <></> : <div><input className='w-full outline-red-600 border border-slate-400 rounded p-2' type="text" placeholder='Your Name' {...register("name")} /></div>}

                    <div>
                        <input className='w-full outline-red-600 border border-slate-400 rounded p-2' type="email" placeholder='Your email' {...register("email", { required: "Email is Required" })} />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div>
                        <input className='w-full outline-red-600 border border-slate-400 rounded p-2' type="password" placeholder='Enter your password' {...register("password", { required: true, minLength: { value: 8, message: "Password Length must be atleast 8 or more" } })} />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </div>
                </div>
                <button disabled={isSubmitting} className={`p-2 rounded text-white bg-rose-600 text-sm cursor-pointer hover:bg-rose-700 transition duration-300 ${isSubmitting && "bg-opacity-40 hover:bg-opacity-40"}`} type='submit'>{currentState === "Sign up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition flex items-start gap-2">
                    <input className='mt-1' type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Login" ? <p>Create a new account? <span className='text-rose-600 font-semibold cursor-pointer' onClick={() => setCurrentState("Sign up")}>Click here</span></p> : <p>Already have an account? <span className='text-rose-600 font-semibold cursor-pointer' onClick={() => setCurrentState("Login")}>Login here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup
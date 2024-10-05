import Lottie from 'lottie-react'
import '../../Components/ResetPassword/ResetPassword.css'
import ForgetAni from '../../assets/animation/ani-forget.json'
import {toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

const ResetPassword = () => {

    // state declear 
    const [email, setEmail]                                     = useState('')
    const [emailError, setEmailError]                           = useState('')
    const navigate                                              = useNavigate()

    // firebase state declear
    const auth = getAuth();
    const [loading , setLoading]                                = useState(false)

    // function
    const handelEmail = (e)=>{
        setEmail(e.target.value)
        setEmailError('')
    }


    // submit function 
    const handelSubmit = (e)=>{
        e.preventDefault()

        if(!email){
            setEmailError('Enter your email')
        }
        else{
            setLoading(true)
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setLoading(false)
                navigate('/login')
                    toast('Verfication Link Send', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false)
                
            });
        }
    }



  return (
    <>
    <div className='reset-page'>
        <div className="container">
            <div className="main">

                {/* lottie  */}

                <div className='main-ani' ><Lottie animationData={ForgetAni} /></div>

                <div className="main-form">
                    <h1>Reset Password</h1>
                    <form onSubmit={handelSubmit} className='form'>


                        {/* Email  */}
                        <div className='h-[80px] mb-1'>
                        <label>Email</label>
                        <input onChange={handelEmail} className='input focus:outline-none focus:shadow-outline' type="email" placeholder='Email'/>
                        <p className='error text-xs italic text-red-600 mt-1' >{emailError}</p>
                        </div>
                        

                        {/* buttom  */}
                        {
                            loading? 
                            <div className='w-full h-[40px] flex justify-center items-center px-4 py-2 font-bold text-white bg-[#970430] rounded-full focus:outline-none focus:shadow-outline' ><BarLoader color='#fff' /></div>
                            :
                            <button type='submit' className='w-full px-4 py-2 font-bold text-white bg-[#970430] rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline' >Reset Password</button>
                        }
                    
                        <hr className='my-6'/>

                        {/* reset */}
                        <div className="from-text flex flex-col gap-1 items-center">
                            <Link to='/login' className="text-[12px] text-white align-baseline">Already have an Account! <span className='hover:text-[#970430]'>Login</span> </Link>
                        </div>

                    </form>


                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default ResetPassword
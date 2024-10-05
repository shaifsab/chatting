import Lottie from 'lottie-react'
import '../../Components/Register/Register.css'
import LoginAni from '../../assets/animation/ani-login.json'
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import {toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

const Register = () => {

    // state declear 
    const [user, setUser]                                       = useState('')
    const [userError, setUserError]                             = useState('')
    const [email, setEmail]                                     = useState('')
    const [emailError, setEmailError]                           = useState('')
    const [password, setPassword]                               = useState('')
    const [passwordError, setPasswordError]                     = useState('')
    const [confirmPassword, setConfirmPassword]                 = useState('')
    const [confirmPasswordError, setConfirmPasswordError]       = useState('')
    const [showPass , setShowPass]                              = useState(false)
    const navigate                                              = useNavigate()

    // firebase state declear
    const auth = getAuth();
    const [loading , setLoading]                                = useState(false)

    // function 
    const handelUser = (e)=>{
        setUser(e.target.value)
        setUserError('')
    }
    const handelEmail = (e)=>{
        setEmail(e.target.value)
        setEmailError('')
    }
    const handelPassword = (e)=>{
        setPassword(e.target.value)
        setPasswordError('')
    }
    const handelConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value)
        setConfirmPasswordError('')
    }
    const handelShowPass = ()=>{
        setShowPass(!showPass)
    }


    // submit function 
    const handelSubmit = (e)=>{
        e.preventDefault()

        if(!user){
            setUserError('Enter your username')
        }
        if(!email){
            setEmailError('Enter your email')
        }
        if(!password){
            setPasswordError('Enter your password')
        }
        if(!confirmPassword){
            setConfirmPasswordError('Enter your password')
        }
        else{
            if(password != confirmPassword){
                toast.error('Use same Password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
            else{
                setLoading(true)
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
    
                    // update user profile 
                    updateProfile(auth.currentUser, {
                        displayName: user,
                        photoURL: "https://i.ibb.co.com/FBDQxvj/piqvwcs3.png"
                      })
    
                    // email verification 
                    sendEmailVerification(auth.currentUser)
    
                    setLoading(false)
                    navigate('/login')
                    toast('Registration Successful', {
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
    
                    if(errorCode == 'auth/weak-password'){
                        toast('Please Select Stronge password', {
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
                    }
                    if(errorCode == 'auth/email-already-in-use'){
                        toast('Email already used', {
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
                    }
                }); 
            }

        }
    }



  return (
    <>
    <div className='register-page'>
        <div className="container">
            <div className="main">

                {/* lottie  */}

                <div className='main-ani' ><Lottie animationData={LoginAni} /></div>

                <div className="main-form">
                    <h1>Welcome</h1>
                    <form onSubmit={handelSubmit} className='form'>

                        {/* Username  */}
                        <div className='h-[80px] mb-1'>
                        <label>Username</label>
                        <input onChange={handelUser} className='input focus:outline-none focus:shadow-outline' type="text" placeholder='username'/>
                        <p className='error text-xs italic text-red-600 mt-1' >{userError}</p>
                        </div>

                        {/* Email  */}
                        <div className='h-[80px] mb-1'>
                        <label>Email</label>
                        <input onChange={handelEmail} className='input focus:outline-none focus:shadow-outline' type="email" placeholder='Email'/>
                        <p className='error text-xs italic text-red-600 mt-1' >{emailError}</p>
                        </div>
                        

                        {/* password  */}
                        <div className='h-[80px] mb-1'>
                        <label>Password</label>
                        <div className=' relative '>
                            {
                                showPass? <IoMdEye onClick={handelShowPass} className='eye-icon'/> : <IoEyeOff onClick={handelShowPass} className='eye-icon' />                        
                            }                
                            <input onChange={handelPassword} type={showPass? "text" : "password" } className='input focus:outline-none focus:shadow-outline' id="text" placeholder='Password'/>
                        </div>
                        <p className='error text-xs italic text-red-600 mt-1' >{passwordError}</p>
                        </div>

                        {/* confirm password  */}
                        <div className='h-[80px] mb-1'>
                        <label>Confirm Password</label>
                        <div className=' relative '>
                            {
                                showPass? <IoMdEye onClick={handelShowPass} className='eye-icon'/> : <IoEyeOff onClick={handelShowPass} className='eye-icon' />                        
                            }                
                            <input onChange={handelConfirmPassword} type={showPass? "text" : "password" } className='input focus:outline-none focus:shadow-outline' id="text" placeholder='Password'/>
                        </div>
                        <p className='error text-xs italic text-red-600 mt-1' >{confirmPasswordError}</p>
                        </div>

                        {/* buttom  */}
                        {
                            loading? 
                            <div className='w-full h-[40px] flex justify-center items-center px-4 py-2 font-bold text-white bg-blue-700 rounded-full focus:outline-none focus:shadow-outline' ><BarLoader color='#fff' /></div>
                            :
                            <button type='submit' className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline' >Register</button>
                        }
                    
                        <hr className='my-6'/>

                        {/* reset */}
                        <div className="from-text flex flex-col gap-1 items-center">
                            <Link to='/login' className="text-[12px] text-white align-baseline">Already have an Account! <span className='hover:text-blue-800'>Login</span> </Link>
                        </div>

                    </form>


                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register
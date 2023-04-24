import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useRef, useState } from 'react';
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import app from '../../../__firebase_Auth_';
import google from '/googleLogo.svg';
const Login = () => {
    const [showEyeIcon, setShowEyeIcon] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    function logInWithGoogle() {
        signInWithPopup(auth,googleProvider)
        .then((result) => {console.log(result.user)})
        .catch(err => {console.log(err.message)});
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            toast.success('Login Successful');
            e.target.reset();
        })  
        .catch(err => {
            toast.error(err.message.slice(22, -2));
        })
    }

    const resetPassword = (e) => {
        const email = emailRef.current.value;
        if(!email) {
            toast.error('Put your email first');
        }
        else {
            sendPasswordResetEmail(auth,email)
            .then(() => {toast.success('Password reset email sent')})
            .catch(err => toast.error(err.message.slice(22,-2)));
        }
    }

    function handlePassChange(e) {
        const pass = e.target.value;
        if(pass.length > 0) {
            setShowEyeIcon(true);
        } 
        else {
            setShowEyeIcon(false);
        }
    }
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-60px)]'>
            <form className='border rounded-md lg:w-1/4 p-5 px-8 text-gray-500 shadow-[-10px_10px_0_rgba(255,153,0,0.4)]' onSubmit={handleLoginSubmit}>
                <h2 className="text-2xl text-center font-semibold mt-3 mb-4">Login</h2>
                <label htmlFor="email" className='text-sm'>Email</label><br />
                <input type="email" name="email" ref={emailRef} className='w-full border mt-1 mb-5 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' required/><br />
                <label htmlFor="confirmPass" className='text-sm'>Password</label><br />
                <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password" className='w-full border mt-1 mb-2 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' onChange={handlePassChange} required/>
                {
                    showEyeIcon ?
                    showPass ? 
                    <EyeIcon className="h-4 w-4 text-gray-400 cursor-pointer absolute top-[14px] right-3" onClick={() => {setShowPass(!showPass)}}/>
                    :
                    <EyeSlashIcon className="h-4 w-4 text-gray-400 cursor-pointer absolute top-[14px] right-3" onClick={() => {setShowPass(!showPass)}}/>
                    :
                    ''
                }
                </div>
                <div className="text-xs mb-3">
                    <span>Forget password? <span className="text-blue-600 cursor-pointer" onClick={resetPassword}>Reset</span></span>
                </div>
                <button type="submit" className='bg-orange-300 text-md duration-500 hover:bg-orange-500 text-white w-full font-semibold py-2 mt-3'>Login</button>
                <p className='text-sm text-center text-gray-700 mt-1'>Don't have an account? <Link to='/signUp' className='text-blue-600'>Sign Up</Link></p>
                <div className="flex justify-between items-center gap-3 my-5">
                    <hr className='w-2/3' />
                    <span className='text-xs'>Or</span>
                    <hr className='w-2/3' />
                </div>
                <div onClick={logInWithGoogle} className='border rounded-sm w-full py-1 font-semibold flex justify-center items-center cursor-pointer mb-2'>
                    <img src={google} className='h-8 w-8' />
                    <p className="text-sm" >Continue with Google</p>
                </div>
            </form>
        </div>
    );
}

export default Login;
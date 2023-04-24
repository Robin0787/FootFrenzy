import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import app from '../../../__firebase_Auth_';
import google from '/googleLogo.svg';
const SignUp = () => {
    const [validatePass, setValidatePass] = useState('');
    const [isPassOk, setIsPassOk] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();


    function signUpWithGoogle() {
        signInWithPopup(auth,googleProvider)
        .then(result => {toast.success('SignUp Successful')})
        .catch(err => {toast.error(err.message)})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!isPassOk) {
            toast.error('Password is not valid!');
            return;
        }else {
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                toast.success('SignUp Successful');
                e.target.reset();
                updateProfile(result.user, {displayName: name})
                .catch(err => {toast.error(err.message)});
                sendEmailVerification(result.user)
                .then(() => {toast.success('Verification email sent to the User')});
            })
            .catch(() => {
                toast.error('Email already in use');
            })
        }
    }

    const handlePassChange = (e) => {
        const pass = e.target.value;
        if(!/(?=.*[A-Z])/.test(pass)) {
            setValidatePass('Password must contain a uppercase letter');
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(pass)) {
            setValidatePass('Password must contain two numbers');
        }else if(!/(?=.*[@#$%&])/.test(pass)) {
            setValidatePass('Password must contain a special character');
        } 
        else if(pass.length < 6) {
            setValidatePass('Password must contain minimum 6 characters');
        }
        else {
            setValidatePass('');
            setIsPassOk(true);
        }
        showEyeIconOnPass(pass);
        console.log(pass);
    }

    function showEyeIconOnPass(value) {
        console.log(value);
        if(value.length > 0) {
            setShowEyeIcon(true);
        } 
        else {
            setShowEyeIcon(false);
            setValidatePass('');
        }
    }

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-60px)]'>
            <form className='border rounded-md lg:w-1/4 p-5 px-8 text-gray-500 shadow-[-10px_10px_0_rgba(255,153,0,0.4)]' onSubmit={handleFormSubmit}>
                <h2 className="text-2xl text-center font-semibold mt-3 mb-4">Sign UP</h2>
                <label htmlFor="name" className='text-sm'>Name</label><br />
                <input type="name" name='name' className='w-full border mt-1 mb-5 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' required/>
                <label htmlFor="email" className='text-sm'>Email</label><br />
                <input type="email" name='email' className='w-full border mt-1 mb-5 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' required/>
                <label htmlFor="password" className='text-sm'>Password</label><br />
                <div className='relative'>
                <div className="relative">
                <input type={showPass ? "text" : 'password'} name='password' onChange={handlePassChange} className='w-full border mt-1 mb-2 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' required/><br />
                {
                    showEyeIcon ? 
                    showPass ? 
                    <EyeIcon  className='h-4 w-4 text-gray-500 cursor-pointer absolute top-[14px] right-3' onClick={() => {setShowPass(!showPass)}}/> 
                    : 
                    <EyeSlashIcon className='h-4 w-4 text-gray-500 cursor-pointer absolute top-[14px] right-3' onClick={() => {setShowPass(!showPass)}}/>
                    :
                    ''
                }
                </div>
                <p className="text-xs mb-3 text-red-500 absolute top-11">{validatePass}</p>
                </div>
                <button type='submit' className='bg-orange-300 text-md duration-500 hover:bg-orange-500 text-white w-full font-semibold py-2 mt-10'>Sign UP</button>
                <p className='text-sm text-center text-gray-700 mt-2'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></p>
                <div className="flex justify-between items-center gap-3 my-5">
                    <hr className='w-2/3' />
                    <span className='text-xs'>Or</span>
                    <hr className='w-2/3' />
                </div>
                <div onClick={signUpWithGoogle} className='border rounded-sm w-full py-1 font-semibold flex justify-center items-center cursor-pointer mb-2'>
                    <img src={google} className='h-8 w-8' />
                    <p className="text-sm">Continue with Google</p>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
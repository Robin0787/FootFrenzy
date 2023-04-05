import React from 'react';
import { Link } from 'react-router-dom';
import google from '/googleLogo.svg';
const SignUp = () => {
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-60px)]'>
            <form className='border rounded-md lg:w-1/4 p-5 px-8 text-gray-500 shadow-[-10px_10px_0_rgba(255,153,0,0.4)]'>
                <h2 className="text-2xl text-center font-semibold mt-3 mb-4">Sign UP</h2>
                <label htmlFor="name" className='text-sm'>Name</label><br />
                <input type="name" className='w-full border mt-1 mb-5 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' />
                <label htmlFor="email" className='text-sm'>Email</label><br />
                <input type="email" className='w-full border mt-1 mb-5 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' />
                <label htmlFor="password" className='text-sm'>Password</label><br />
                <input type="password" className='w-full border mt-1 mb-5 duration-300 border-gray-300 rounded-sm focus:outline-0 focus:ring ring-gray-300 p-1' /><br />
                <button onClick={(e) => { e.preventDefault() }} className='bg-orange-300 text-md duration-500 hover:bg-orange-500 text-white w-full font-semibold py-2 mt-3'>Sign UP</button>
                <p className='text-sm text-center text-gray-700 mt-1'>Already have an account? <Link to='/login' className='text-orange-500'>Login</Link></p>
                <div className="flex justify-between items-center gap-3 my-5">
                    <hr className='w-2/3' />
                    <span className='text-xs'>Or</span>
                    <hr className='w-2/3' />
                </div>
                <div className='border rounded-sm w-full py-1 font-semibold flex justify-center items-center cursor-pointer mb-2'>
                    <img src={google} className='h-8 w-8' />
                    <p className="text-sm">Continue with Google</p>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
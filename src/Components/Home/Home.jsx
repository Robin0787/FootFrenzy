import Lottie from "lottie-react";
import React from 'react';
import { Link } from "react-router-dom";
import animation from "../../animation.json";
const Home = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row justify-between items-center  border min-h-[calc(100vh-60px)] px-12 lg:px-32 gap-4 md:gap-10'>
            <div className="md:w-1/2 py-8 text-center">
                <p className="text-sm font-semibold text-orange-500 mb-5">Sale up to 70% off</p>
                <h1 className="text-4xl lg:text-5xl font-bold mb-8">New Collection For Fall</h1>
                <p className="text-md mb-5 text-justify md:px-4 my-8">Welcome to our online store! We offer a wide variety of high-quality products at affordable prices.
                    Shop with confidence at our e-commerce store, where you'll find everything you need to make your life easier.
                    Discover the latest trends in fashion, electronics, and more at our online shop, with fast and reliable shipping.</p>
                <Link to={'/products'}>
                    <button className="mt-2 text-md px-6 py-3 rounded-md bg-orange-600 text-white font-bold">Shop Now <i className="fa-brands fa-shopify text-white ml-1"></i></button>
                </Link>
            </div>
            <div className="md:w-1/2 py-8 text-center">
                <Lottie animationData={animation} loop={true} />
            </div>
        </div>
    );
};

export default Home;
import React from 'react';
import "./Product.css";

const Product = ({product,addToCart}) => {
    const {img,name,seller,price,ratings} = product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h2 className='product-name'>{product.name}</h2>
                <div className='seller-ratings'>
                <p className='desc'>{seller}</p>
                <p className='desc'>{ratings} <i className="fa-solid fa-star"></i></p>
                </div>
                <p className='price'>${price}</p>
            </div>
                <button className='addToCart' onClick={addToCart.bind(this,product)}><i className="fa-solid fa-cart-arrow-down"></i></button>
        </div>
    );
};

export default Product;
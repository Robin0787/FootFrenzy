import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import OrderedProducts from '../Ordered Products/OrderedProducts';

const OrderReview = () => {
    // const allData = getData();
    const [allProduct, setAllProduct] = useState(useLoaderData());
    function clearCart() {
        localStorage.clear();
        setAllProduct([]);
    }
    function deleteProduct(id) {
        const products = allProduct;
        const remainingProducts = products.filter(pr => pr.id !== id);
        setAllProduct(remainingProducts);
        localStorage.setItem('Ordered-Products', JSON.stringify(remainingProducts));
    }
    if(allProduct.length < 1) {
        return <div className='flex justify-center items-center text-center text-2xl font-thin px-4 h-[50vh] md:h-[80vh]'>
            <h1 className='font-semibold text-gray-600 bg-white rounded-xl p-8 ring ring-gray-300'>No Products have been ordered</h1>
        </div>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-reviewOrder m-h-[calc(100vh-60px)] gap-4 lg:gap-10 p-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4'>
                {
                    allProduct.map((product) => <SingleProduct key={product.id} product={product} deleteProduct={deleteProduct}/>)
                }
            </div>
            <div>
            <OrderedProducts orderedProducts={allProduct} clearCart={clearCart} reviewBtn={false}/>
            </div>
        </div>
    );
};

function SingleProduct({product,deleteProduct}) {
    const {img,name,shipping,price,quantity,id} = product;
    return (
        <div className='flex justify-between items-center gap-4 px-3 py-2 h-[128px] bg-white border-2 border-gray-300 rounded-lg mb-3 font-thin'>
            <div className="flex justify-center items-center gap-3">
                <img src={img} className='h-24 w-24 rounded-xl'/>
            <div className='space-y-1 py-3'>
                <h2 className="text-sm font-semibold">{name}</h2>
                <p className="text-sm">Price: <span className='text-orange-400 font-semibold'>${price}</span></p>
                <p className="text-sm">Shipping Charge: <span className='text-orange-400 font-semibold'>${shipping}</span></p>
                <p className="text-sm">Quantity: <span className='text-orange-400 font-semibold'>{quantity}</span></p>
            </div></div>
            <i onClick={() => {deleteProduct(id)}} className="fa-solid fa-trash-can text-red-400 cursor-pointer bg-red-500 bg-opacity-20 rounded-full p-3"></i>
        </div>
    )
}
export default OrderReview;
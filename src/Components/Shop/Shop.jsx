import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getData, setData } from '../../utilities/ManageDataInLocalStorage.js';
import OrderedProducts from '../Ordered Products/OrderedProducts.jsx';
import Product from '../Product/Product.jsx';
import "./Shop.css";
const Shop = () => {
    const { totalProducts } = useLoaderData();
    const [products, setProducts] = useState(null);
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const options = [5, 10, 15, 20];
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];

    useEffect(() => {
        fetch(`https://foot-frenzy-server.vercel.app/products?page=${currentPage}&limit=${productsPerPage}`)
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [currentPage, productsPerPage]);

    // Adding the ordered Item to the cart and to the localStorage.
    function addToCart(ordProduct) {
        const isExists = orderedProducts.find(pd => pd._id === ordProduct._id);
        if (!!isExists) {
            orderedProducts.forEach(pd => {
                if (pd._id === ordProduct._id) {
                    pd.quantity++;
                    setOrderedProducts((prev) => [...prev]);
                }
            })
        }
        else {
            ordProduct.quantity = 1;
            setOrderedProducts((prev) => {
                return [...prev, ordProduct];
            });
        }
        setData(ordProduct);
    }

    // Clearing all the items of the cart and the localStorage.
    function clearCart() {
        setOrderedProducts([]);
        localStorage.clear();
    }

    useEffect(() => {
        setOrderedProducts(getData());
    }, [products]);

    function handleSelectChange(e) {
        setProductsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    }

    return (
        <>
            <section className='shop-container px-8'>
                <article className='products-container'>
                    {
                        products?.map((product) => {
                            return <Product key={product._id} product={product} addToCart={addToCart} />
                        })
                    }
                </article>
                <article className='ordered-products'>
                    {/* <OrderedProducts orderedProducts={getData()} clearCart={clearCart}/> */}
                    <OrderedProducts orderedProducts={orderedProducts} clearCart={clearCart} reviewBtn={true} />
                </article>
            </section>
            {/* Pagination */}
            <div className="pagination text-center my-5 flex flex-col md:flex-row justify-between items-center gap-3 px-12">
                <p>Current Page : {currentPage}</p>
                <div className='space-x-3 space-y-2'>
                    {
                        pageNumbers.map((number) => <button key={number} className={`px-3 py-1 border rounded-md ${currentPage === number ? 'bg-orange-500 text-white' : 'bg-gray-200'}`} onClick={() => { setCurrentPage(number) }}>
                            {number + 1}
                        </button>)
                    }
                </div>
                <div className='flex gap-2 items-center px-3 lg:px-6 py-2 rounded-md bg-gray-200'>
                    <span>Products Per Page</span>
                    <select className='rounded-md bg-gray-100 px-2' value={productsPerPage} onChange={handleSelectChange}>

                        {
                            options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    );
};

export default Shop;
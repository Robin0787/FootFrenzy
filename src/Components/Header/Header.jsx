import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
    return (
        <nav className='navbar'>
            <Link to='/'>
                <img src={logo} alt="" />
            </Link>
            <ul className='list'>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/' >Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/products' >Products</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/order-review' >Order Review</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/about'>About</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/signUp'>Sign Up</NavLink>
            </ul>
        </nav>
    );
};

export default Header;
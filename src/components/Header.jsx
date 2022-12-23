

import React, { useRef, useState } from 'react';

import { NavLink } from "react-router-dom";
import { useDataContext } from '../context/DataContext';
import NavDropMenu from './NavDropMenu';

function Header() {

    const {productsData , user , logout} = useDataContext();
    let [open , setOpen] = useState(false);
    const  navRef = useRef();

    function openProductsMenu(){
        setOpen((prev) => !prev);
    }

    const showNavbar = () => {
		navRef.current.classList.toggle("active_nav");
	};

  return (
    <header className='header'>
        <div className='container'>
            <div className='row justify-content-between align-items-center'>
                <div className='header__logo'>Shopping</div>
                <nav>
                    <ul className='header__navBar' ref={navRef}>
                        <li className='header__navBar--close RemoveBtn' onClick={showNavbar}>+</li>
                        <NavLink className='header__navBar--link' to='/' end >Home</NavLink>
                        <li className='header__navBar--link' onClick={openProductsMenu}>
                            Stor
                            <span className='cartLength'>{productsData.cardList.length}</span>
                        </li>
                        {
                            open &&( <NavDropMenu/>)
                        }
                        <NavLink className='header__navBar--link' to="profile" >profile</NavLink>
                        {
                            !user && <NavLink className='header__navBar--link' to="login" >login</NavLink>
                        }
                        {
                            user && <li className='header__navBar--link' onClick={()=> logout()}>logout</li>
                        }
                    </ul>
                </nav>
                <div className='header__openNav' onClick={showNavbar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header

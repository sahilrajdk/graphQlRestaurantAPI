import React from 'react';
import {NavLink } from 'react-router-dom';
import './MainNav.css';
import AuthPage from '../../pages/auth';

const MainNav = props => (
    <header className="toolbar">
          <nav className="toolbar_nav">
            <div className="toolbar_nav_logo">
                <h1>OrderUp!</h1>
            </div>
            <div className="toolbar_nav_items">
               <ul>
                 <li>
                <NavLink to='/menu'>MENU</NavLink>
                </li>
               <li>
                <NavLink to='/orders'>ORDERS</NavLink>
                </li>
                <li className="nav-login-field">
                    <AuthPage />
                </li>
               </ul>
             </div>
        </nav>
        </header>
 
)

export default MainNav;
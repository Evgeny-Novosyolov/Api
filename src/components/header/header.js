import React from 'react'
import {NavLink} from 'react-router-dom'
import './header.scss'

const Header = () => (
    <nav className="navbar">
        <div className="navbar__wrapper">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink to="/" 
                    className="menu__link"
                    data-text="Home"
                    exact
                    >Home</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to="/not_a_home" 
                    className="menu__link"
                    data-text="Not a home"
                    >Not a home</NavLink>
                </li>
            </ul>
        </div>
    </nav>
)

export default Header
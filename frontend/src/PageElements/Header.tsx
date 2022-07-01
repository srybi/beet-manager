import {NavLink} from "react-router-dom";
import {HeaderWrapper, Logo, Menu, MenuIcon} from "./Header.styles";
import "./Header.css";
import * as React from "react";
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header() {
    return (

        <HeaderWrapper className="header">
            <Logo className="logo">
                Beet-Manager
            </Logo>
            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <MenuIcon className="menu-icon" htmlFor="menu-btn">
                <span className="navicon"></span>
            </MenuIcon>
            <Menu className="menu">
                <li>
                    <NavLink to="/" title="Home"><HomeIcon style={{color: 'green'}}/></NavLink>
                </li>
                <li>
                    <NavLink to="/info" title="Info"><InfoIcon style={{color: 'green'}}/></NavLink>
                </li>
                <li>
                    <NavLink to="/account" title="Profile"><AccountCircleIcon style={{color: 'green'}}/></NavLink>
                </li>
                <li>
                    <NavLink to="/logout" title="Logout"><LoginIcon
                        style={{color: 'green'}}/></NavLink>
                </li>


            </Menu>
        </HeaderWrapper>

    );
}
export default Header;

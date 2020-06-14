import React from 'react'
import { Navbar, NavbarBrand,
     Nav,NavItem, NavLink } from 'reactstrap';


export const NavbarNotes =(props)=>{
    return (
        <Navbar className="navbar-notes" light expand="md" >
            <NavbarBrand href="/">Заметки</NavbarBrand>
                <Nav className="nav-item-exit" navbar >
                    <NavItem  >
                        <NavLink onClick={props.onLogoutClick} href="/" >Выйти</NavLink>
                    </NavItem>
                </Nav>
        </Navbar>
    )
};

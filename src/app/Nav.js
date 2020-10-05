import React from 'react';

import { Link } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
margin: 0;
padding: 0;
display: flex;
justify-content: flex-end;
align-items: center;
`;

const NavLi = styled.li`
list-style: none;
margin: 0;
color: gray;
padding: 10px 20px;
transition: all 0.3s;
font-size: 20px;
cursor: pointer;

&:hover {    
  background-color: rgb(14, 210, 245);
  color: #fff;
}

&.logOut {
  display: none;
}

&.notdisplay {
  display: none;
}

&.display {
  display: block;
}
`;

const NavLink = styled(Link)`
text-decoration: none;
`;

function Nav(props) {

  let logged = props.logState;
  let display = '';
  let logOutDisplay = '';

  if (logged) {
    display = 'notdisplay';
    logOutDisplay = 'display'
  } else {
    display = '';
    logOutDisplay = '';
  }


  return (
    <nav className="mainNav">
      <NavList className="navList">
        <NavLink to='/react-social-app'>
          <NavLi className="home">
            Home
        </NavLi>
        </NavLink>
        <NavLink to='/react-social-app/login'>
          <NavLi className={`logIn ${display}`}>
            Login
        </NavLi>
        </NavLink>
        <NavLink to='/react-social-app/signup'>
          <NavLi className={`signUp ${display}`}>
            Sign Up
        </NavLi>
        </NavLink>
        <NavLi onClick={() => props.logOutMethod()} className={`logOut ${logOutDisplay}`}>Logout</NavLi>
      </NavList>
    </nav >
  );
}

export default Nav;
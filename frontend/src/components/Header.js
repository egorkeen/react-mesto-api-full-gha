import React, { useState } from 'react';
import logo from '../images/logo.svg';

function Header(props) {
  return(
    <header className="header">
    <img
      src={logo}
      className="header__logo"
      alt="Логотип"
    />
    {props.children}
  </header>
  );
};

export default Header;
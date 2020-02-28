import React from 'react';

import './App.css'

import NavbarHeader from './NavBarHeader';
import Footer from "../footer/Footer";

export default ({ children  }) => {
  return (
    <div className={"pageContainer"}>
      <NavbarHeader/>
      <div className={"contentWrapper"}>
          {children}
      </div>
      <Footer/>
    </div>
  );
}

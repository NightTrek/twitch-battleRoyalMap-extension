import React from 'react';

import './App.css'

import NavbarHeader from './NavBarHeader';


export default ({ children  }) => {
  return (
    <div style={{backgroundColor: "#92a8d1"}}>
      <NavbarHeader/>
      {children}
    </div>
  );
}

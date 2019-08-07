import React from 'react';

import './App.css'

import NavbarHeader from './NavBarHeader';


export default ({ children  }) => {
  return (
    <div style={{height: '100%'}}>
      <NavbarHeader/>
      {children}
    </div>
  );
}

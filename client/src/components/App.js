import React from 'react';

import './App.css'

import Header from './NavBarHeader';


export default ({ children  }) => {
  return (
    <div style={{height: '100%'}}>
      <NavbarHeader/>
      {children}
    </div>
  );
}

import React from 'react';

import './App.css'

import NavbarHeader from './NavBarHeader';


export default ({ children  }) => {
  return (
    <div>
      <NavbarHeader/>
      {children}
    </div>
  );
}

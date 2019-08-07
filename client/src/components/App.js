import React from 'react';

import './App.css'
import Header from './Header';


export default ({ children  }) => {
  return (
    <div style={{height: '100%'}}>
      <Header/>
      {children}
    </div>
  );
}

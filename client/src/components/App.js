import React from 'react';

import Header from './NavBarHeader';



export default ({ children  }) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
}

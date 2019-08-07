import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className= {drawerClasses}>
            <ul>
                <li> USER NAME</li>
                <li><a href="/">MAP</a></li>
                <li><a href="/">STREAMER</a></li>
                <li><a href="/signin">LOG IN</a></li>
            </ul>
        </nav>
    );
};

export default sideDrawer;

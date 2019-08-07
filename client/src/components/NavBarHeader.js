import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Toolbar from './Partials/Toolbar';
import SideDrawer from './Partials/SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
import "./Welcome.css";

class NavBarHeader extends Component {
  state = {
    sideDrawerOpen: false
};

drawerToggleClickHandler = () => {
    this.setState((prevState) => {
        return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
};

backdropClickHandler =() => {
    this.setState({sideDrawerOpen: false});
};

render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
        backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    console.log(this.props);
    return(
      <div style={{height: '100%'}} className={"bg-info"}>
      <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
      <SideDrawer show={this.state.sideDrawerOpen}/>
      {backdrop}
      </div>
        );
    }
}


export default NavBarHeader;

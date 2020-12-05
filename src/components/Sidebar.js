/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

class Sidebar extends Component {
    checkLog = () => {
      if (this.props.name != '') {
        return (
          <Logout />
        );
      } else {
        return (
          <Login />
        );
      }
    }

    render() {
      return (
        <div className="sidebar">
          <div className="main-purple-bar" />
          <div className="button-group-top">
            <div className="logo">logo</div>
            <NavLink to="/">
              <button type="button" className="button-light">The Story</button>
            </NavLink>
            <NavLink to="/tools">
              <button type="button" className="button-light">The Tools</button>
            </NavLink>
            <NavLink to="/hackduke">
              <button type="button" className="button-light">HackDuke</button>
            </NavLink>
          </div>
          <div className="button-group-bottom">
            <NavLink to="/stats">
              <button type="button" className="button-dark">My Stats</button>
            </NavLink>
            {this.checkLog()}

          </div>
        </div>
      );
    }
}

function mapStateToProps(reduxState) {
  return {
    // address: reduxState.address,
    name: reduxState.user.name,
  };
}
export default connect(mapStateToProps, null)(Sidebar);

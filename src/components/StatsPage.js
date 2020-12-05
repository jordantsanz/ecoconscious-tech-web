/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Sidebar from './Sidebar';

class StatsPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Sidebar />
        <div className="green-bar" />
      </div>
    );
  }
}

export default StatsPage;

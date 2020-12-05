/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Sidebar from './Sidebar';

class HackDukePage extends Component {
  render() {
    return (
      <div className="main-page">
        <Sidebar />
        <div className="o">hohoho</div>
      </div>
    );
  }
}

export default HackDukePage;

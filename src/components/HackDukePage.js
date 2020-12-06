/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Sidebar from './Sidebar';

class HackDukePage extends Component {
  render() {
    return (
      <div className="main-page">
        <Sidebar />
        <div className="flexDuke" id="duke">
          <div className="inner-flex">
            <div className="animation" />
            <div className="duke-title">We&apos;re not exempt.</div>
            <div id="duke-d1">During HackDuke,  each participating hacker used an average of <span className="bold-black">225 kWh </span> during the 30 hours of this hackathon, emitting 0.22 kg of C02.

            </div>
            <div id="duke-d2">Together, the 321 hackers at HackDuke <span className="bold-black"> emmitted 70.36 kg of carbon from power supply alone. </span> That doesn’t include the cost of running servers or cloud services that we may have used to support our projects! </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HackDukePage;

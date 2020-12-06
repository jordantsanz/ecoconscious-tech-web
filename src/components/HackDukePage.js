/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import computer from '../images/computer.png';
import leaf from '../images/leaf.png';
import dukedivider from '../images/duke.svg';

class HackDukePage extends Component {
  render() {
    return (
      <div className="main-page">
        <Sidebar story={false} />
        <div className="flexDuke" id="duke">
          <div className="inner-flex">
            <img id="hackduke-image-1" src={computer} className="animation" alt="computer" />
            <div className="duke-title">We&apos;re not exempt.</div>
            <div id="duke-d1">During HackDuke,  each participating hacker used an average of <span className="bold-black">225 kWh </span> during the 30 hours of this hackathon, emitting 0.22 kg of C02.

            </div>
            <div id="duke-d2">Together, the 321 hackers at HackDuke <span className="bold-black"> emmitted 70.36 kg of carbon from power supply alone. </span> That doesn’t include the cost of running servers or cloud services that we may have used to support our projects! </div>
          </div>
        </div>
        <img className="divider" src={dukedivider} alt="divider" />
        <div className="flexDuke" id="duke2">
          <img className="animation" id="hackduke-image-2" src={leaf} alt="leaf" />
          <div className="inner-flex-2">
            <div className="duke-title-upper">We can and must</div>
            <div className="duke-title" id="duke-title-2">take action.</div>
            <div id="duke-d3">Here&apos;s what HackDuke can do to offset carbon emissions:
            </div>
            <div id="duke-d4"><span className="bold-black">Purchase a carbon offset</span> - a $75 small event donation to carbonfund.org covers the footprint of this event by nearly 100 times. </div>
            <div id="duke-d5">Encourage sponsors to purchase their own carbon offsets and <span className="bold-black"> move to renewable energy </span> to power their organizations.</div>
            <div id="duke-d6">
              <span className="bold-black">Continue to inspire future developers</span> to work on social good projects and put their efforts toward improving our world!
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default HackDukePage;

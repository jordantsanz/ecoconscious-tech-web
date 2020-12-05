/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';

class StoryPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Sidebar />

        {/* ------------------------------ Page 1 ----------------------------------------- */}
        <div className="flex-landing" id="page-1">
          <div className="left-landing" />
          <div className="main-landing">
            <div className="animation-landing">Animation</div>
            <div className="title-landing">
              <div className="title-landing-top">Our lives are online,</div>
              <div className="title-landing-bottom">our footprint isn&apos;t.</div>
            </div>
            <div className="description-landing">
              <div className="description" id="description-1">The internet is a huge consumer of energy produced by greenhouse gas emitting sources, such as coal and petroleum.</div>
              <div className="description" id="description-2"><span className="vert-align">It&apos;s estimated that energy usage and carbon footprint of the internet <span className="bold-white">are greater than those of air travel.</span></span></div>
              <div className="description" id="description-3">Not only do our devices need energy to power and cool them,
                tech companies emit carbon when they fabricate and distribute our devices.
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------ Page 2 --------------------------------------- */}
        <div className="flex-landing" id="page-2">
          <div className="main-landing-2">
            <div className="animation-landing" />
            <div className="title-landing">
              <div className="title-landing-top">Google searches</div>
              <div className="title-landing-bottom">aren&apos;t really free.</div>
            </div>
            <div className="description-landing">
              <div className="description" id="description-4">Even our smallest internet habits take a toll on the environment.</div>
              <div className="description" id="description-5">Browsing a webpage with pictures/video emits <span className="bold-black">0.2g of carbon per second.</span></div>
              <div className="description" id="description-6">An email emits<span className="bold-black"> 4g of carbon </span> or <span className="bold-black">50g if it has a large attachment.</span> </div>
              <div className="description" id="description-7"><span className="bold-white">One Google search can emit anywhere from 0.2 to 7 grams of carbon.</span> That’s the equivalent of <span className="bold-white"> driving a car 52 feet </span> at its greatest. </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------- Page 3 ------------------------------------- */}

        <div className="flex-landing" id="page-3">
          <div className="main-landing-3">
            <div className="animation-landing" />
            <div className="title-landing" id="page3">
              <div className="title-landing-top" id="page-3-title-top">Your data is in the</div>
              <div className="title-landing-top">cloud - <span className="title-landing-bottom">of emissions.</span></div>
            </div>
            <div className="description-landing">
              <div className="description" id="description-8">The informations communications and technoloy industry produces more than 830 million tons of carbon dioxide each year.</div>
              <div className="description" id="description-9"><span className="bold-black">That’s ~2% of global carbon emissions.</span></div>
              <div className="description" id="description-10">The U.S. is the largest consumer of data center power.</div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------- Page 4 --------------------------------------*/}
        <div className="flex-landing" id="page-4">
          <div className="main-landing-4">
            <div className="animation-landing" />
            <div className="title-landing" id="page-4-title">
              <div className="title-landing-top" id="page-4-title-top">You&apos;ve got a footprint</div>
              <div className="title-landing-bottom">- take these steps.</div>
            </div>
            <div className="description-landing">
              <div className="description" id="description-11">Download <span className="underlined-and-bold">the tools on our website</span> to monitor your power usage and reduce time on non-green hosted websites.</div>
              <div className="description" id="description-12">Choose a green, conscious cloud provider for yourself.</div>
              <div className="description" id="description-13">Unsubscribe from old newsletters you don&apos;t look at.</div>
              <div className="description" id="description-14">Shut off your computer if you&apos;re not going to use it for more than 2 hours and unplug chargers that aren&apos;t in use.</div>
            </div>
          </div>
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
export default connect(mapStateToProps, null)(StoryPage);

/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import terminal from '../images/terminal.png';
import magnify from '../images/magnify.png';

class ToolsPage extends Component {
  render() {
    return (
      <div className="main-page" id="tools-main">
        <Sidebar purple />
        <div className="flex-tools" id="tools">
          <div className="column-flex">
            <div className="vscode-column">
              <img src={terminal} alt="terminal on computer" className="animation" id="tools-page-1-image" />
              <div className="title-column">Carbon Emissions Monitor</div>
              <div className="description-column">
                <div className="description" id="description-col-1">Have you ever wondered how much your code takes a toll on the environment? </div>
                <div className="description" id="description-col-2">Download our <a href="https://github.com/catherinedparnell/ecoconscious-tech-vsc" className="bold-black">VSCode extension</a> to add a live carbon emissions calculator on your toolbar.</div>
              </div>
            </div>

            <div className="chrome-column">
              <img src={magnify} alt="magnifying glass" id="tools-page-2-image" className="animation" />
              <div className="title-column">Green Web Extension</div>
              <div className="description-column">
                <div className="description" id="description-col-3">How well do you know the websites you visit and their impact on our climate?</div>
                <div className="description" id="description-col-4">
                  Download our <a href="https://github.com/catherinedparnell/ecoconscious-tech-chrome" className="bold-black"> Chrome extension</a> to add a green-hosting indicator to your browser bar. The bubble will be green if it’s hosted with renewable energy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToolsPage;

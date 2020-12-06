/* eslint-disable react/no-unused-state */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { connect } from 'react-redux';
import { Map } from 'immutable';
// import db from '../services/firebase';
import * as db from '../services/firebase';
import Sidebar from './Sidebar';

am4core.useTheme(am4themes_animated);

class StatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gauge: false,
      line: false,
      pie: false,
      top: false,
      mainkey: '',
      max: '',
      green: '',
    };
  }

  componentDidMount() {

  }

  async componentDidUpdate() {
    if (this.props.name != '') {
      db.getAllWebsitesByUser(this.props.email, this.dataVis);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.chart2) {
      this.chart.dispose();
    }
    if (this.chart4) {
      this.chart.dispose();
    }
    if (this.chart5) {
      this.chart.dispose();
    }
  }

  dataVis = (webArray) => {
    Promise.all(webArray).then((array) => {
      if (!this.state.gauge) {
        this.makeGauge(array);
      }
      if (!this.state.line) {
        this.websitesOverTimeLine(array);
      }
      if (!this.state.pie) {
        this.columnChart(array);
      }
      if (!this.state.top) {
        this.topChart(array);
      }
    });
  }

  makeGauge = (webArray) => {
    // Create chart
    let totalNum = 0;
    const set = new Set();
    let greenNum = 0;
    for (let i = 0; i < webArray.length; i++) {
      if (!set.has(webArray[i].website)) {
        set.add(webArray[i].website);
        if (webArray[i].green) {
          greenNum += 1;
        }
        totalNum += 1;
      }
    }
    const percentGreen = Math.round((greenNum / totalNum) * 100);
    let chart = am4core.create('chartdiv', am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    /**
 * Normal axis
 */

    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add('text', (text) => {
      return `${text}%`;
    });

    /**
 * Axis for ranges
 */

    let colorSet = new am4core.ColorSet();

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    axis2.max = 100;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = am4core.color('#00FF19');

    let range1 = axis2.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color('#7000FF');

    /**
 * Label
 */
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(25);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = percentGreen;

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 45;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'bottom';
    label.text = `${hand.value}%`;

    /**
 * Hand
 */

    hand.events.on('propertychanged', (ev) => {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      label.text = `${axis2.positionToValue(hand.currentPosition).toFixed(1)}%`;
      axis2.invalidate();
    });

    let title = chart.titles.create();
    title.text = 'Percentage of Websites Visited That Are Green:';
    title.marginBottom = 30;
    title.fontSize = 25;
    title.marginTop = 30;
    title.fontFamily = 'Aclonica';
    title.fill = '#FFFFFF';
    title.background.fill = '#000000';
    title.padding(10, 10, 10, 10);
    this.chart2 = chart;

    this.setState({
      gauge: true,
    });
  }

  websitesOverTimeLine = () => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create('chartdiv3', am4charts.XYChart);

    // Add data
    chart.data = [{
      date: '2012-07-27',
      value: 13,
    }, {
      date: '2012-07-28',
      value: 11,
    }, {
      date: '2012-07-29',
      value: 15,
    }, {
      date: '2012-07-30',
      value: 16,
    }, {
      date: '2012-07-31',
      value: 18,
    }, {
      date: '2012-08-01',
      value: 13,
    }, {
      date: '2012-08-02',
      value: 22,
    }, {
      date: '2012-08-03',
      value: 23,
    }, {
      date: '2012-08-04',
      value: 20,
    }, {
      date: '2012-08-05',
      value: 17,
    }, {
      date: '2012-08-06',
      value: 16,
    }, {
      date: '2012-08-07',
      value: 18,
    }, {
      date: '2012-08-08',
      value: 21,
    }, {
      date: '2012-08-09',
      value: 26,
    }, {
      date: '2012-08-10',
      value: 24,
    }, {
      date: '2012-08-11',
      value: 29,
    }, {
      date: '2012-08-12',
      value: 32,
    }, {
      date: '2012-08-13',
      value: 18,
    }, {
      date: '2012-08-14',
      value: 24,
    }, {
      date: '2012-08-15',
      value: 22,
    }, {
      date: '2012-08-16',
      value: 18,
    }, {
      date: '2012-08-17',
      value: 19,
    }, {
      date: '2012-08-18',
      value: 14,
    }, {
      date: '2012-08-19',
      value: 15,
    }, {
      date: '2012-08-20',
      value: 12,
    }, {
      date: '2012-08-21',
      value: 8,
    }, {
      date: '2012-08-22',
      value: 9,
    }, {
      date: '2012-08-23',
      value: 8,
    }, {
      date: '2012-08-24',
      value: 7,
    }, {
      date: '2012-08-25',
      value: 5,
    }, {
      date: '2012-08-26',
      value: 11,
    }, {
      date: '2012-08-27',
      value: 13,
    }, {
      date: '2012-08-28',
      value: 18,
    }, {
      date: '2012-08-29',
      value: 20,
    }, {
      date: '2012-08-30',
      value: 29,
    }, {
      date: '2012-08-31',
      value: 33,
    }, {
      date: '2012-09-01',
      value: 42,
    }, {
      date: '2012-09-02',
      value: 35,
    }, {
      date: '2012-09-03',
      value: 31,
    }, {
      date: '2012-09-04',
      value: 47,
    }, {
      date: '2012-09-05',
      value: 52,
    }, {
      date: '2012-09-06',
      value: 46,
    }, {
      date: '2012-09-07',
      value: 41,
    }, {
      date: '2012-09-08',
      value: 43,
    }, {
      date: '2012-09-09',
      value: 40,
    }, {
      date: '2012-09-10',
      value: 39,
    }, {
      date: '2012-09-11',
      value: 34,
    }, {
      date: '2012-09-12',
      value: 29,
    }, {
      date: '2012-09-13',
      value: 34,
    }, {
      date: '2012-09-14',
      value: 37,
    }, {
      date: '2012-09-15',
      value: 42,
    }, {
      date: '2012-09-16',
      value: 49,
    }, {
      date: '2012-09-17',
      value: 46,
    }, {
      date: '2012-09-18',
      value: 47,
    }, {
      date: '2012-09-19',
      value: 55,
    }, {
      date: '2012-09-20',
      value: 59,
    }, {
      date: '2012-09-21',
      value: 58,
    }, {
      date: '2012-09-22',
      value: 57,
    }, {
      date: '2012-09-23',
      value: 61,
    }, {
      date: '2012-09-24',
      value: 59,
    }, {
      date: '2012-09-25',
      value: 67,
    }, {
      date: '2012-09-26',
      value: 65,
    }, {
      date: '2012-09-27',
      value: 61,
    }, {
      date: '2012-09-28',
      value: 66,
    }, {
      date: '2012-09-29',
      value: 69,
    }, {
      date: '2012-09-30',
      value: 71,
    }, {
      date: '2012-10-01',
      value: 67,
    }, {
      date: '2012-10-02',
      value: 63,
    }, {
      date: '2012-10-03',
      value: 46,
    }, {
      date: '2012-10-04',
      value: 32,
    }, {
      date: '2012-10-05',
      value: 21,
    }, {
      date: '2012-10-06',
      value: 18,
    }, {
      date: '2012-10-07',
      value: 21,
    }, {
      date: '2012-10-08',
      value: 28,
    }, {
      date: '2012-10-09',
      value: 27,
    }, {
      date: '2012-10-10',
      value: 36,
    }, {
      date: '2012-10-11',
      value: 33,
    }, {
      date: '2012-10-12',
      value: 31,
    }, {
      date: '2012-10-13',
      value: 30,
    }, {
      date: '2012-10-14',
      value: 34,
    }, {
      date: '2012-10-15',
      value: 38,
    }, {
      date: '2012-10-16',
      value: 37,
    }, {
      date: '2012-10-17',
      value: 44,
    }, {
      date: '2012-10-18',
      value: 49,
    }, {
      date: '2012-10-19',
      value: 53,
    }, {
      date: '2012-10-20',
      value: 57,
    }, {
      date: '2012-10-21',
      value: 60,
    }, {
      date: '2012-10-22',
      value: 61,
    }, {
      date: '2012-10-23',
      value: 69,
    }, {
      date: '2012-10-24',
      value: 67,
    }, {
      date: '2012-10-25',
      value: 72,
    }, {
      date: '2012-10-26',
      value: 77,
    }, {
      date: '2012-10-27',
      value: 75,
    }, {
      date: '2012-10-28',
      value: 70,
    }, {
      date: '2012-10-29',
      value: 72,
    }, {
      date: '2012-10-30',
      value: 70,
    }, {
      date: '2012-10-31',
      value: 72,
    }, {
      date: '2012-11-01',
      value: 73,
    }, {
      date: '2012-11-02',
      value: 67,
    }, {
      date: '2012-11-03',
      value: 68,
    }, {
      date: '2012-11-04',
      value: 65,
    }, {
      date: '2012-11-05',
      value: 71,
    }, {
      date: '2012-11-06',
      value: 75,
    }, {
      date: '2012-11-07',
      value: 74,
    }, {
      date: '2012-11-08',
      value: 71,
    }, {
      date: '2012-11-09',
      value: 76,
    }, {
      date: '2012-11-10',
      value: 77,
    }, {
      date: '2012-11-11',
      value: 81,
    }, {
      date: '2012-11-12',
      value: 83,
    }, {
      date: '2012-11-13',
      value: 80,
    }, {
      date: '2012-11-14',
      value: 81,
    }, {
      date: '2012-11-15',
      value: 87,
    }, {
      date: '2012-11-16',
      value: 82,
    }, {
      date: '2012-11-17',
      value: 86,
    }, {
      date: '2012-11-18',
      value: 80,
    }, {
      date: '2012-11-19',
      value: 87,
    }, {
      date: '2012-11-20',
      value: 83,
    }, {
      date: '2012-11-21',
      value: 85,
    }, {
      date: '2012-11-22',
      value: 84,
    }, {
      date: '2012-11-23',
      value: 82,
    }, {
      date: '2012-11-24',
      value: 73,
    }, {
      date: '2012-11-25',
      value: 71,
    }, {
      date: '2012-11-26',
      value: 75,
    }, {
      date: '2012-11-27',
      value: 79,
    }, {
      date: '2012-11-28',
      value: 70,
    }, {
      date: '2012-11-29',
      value: 73,
    }, {
      date: '2012-11-30',
      value: 61,
    }, {
      date: '2012-12-01',
      value: 62,
    }, {
      date: '2012-12-02',
      value: 66,
    }, {
      date: '2012-12-03',
      value: 65,
    }, {
      date: '2012-12-04',
      value: 73,
    }, {
      date: '2012-12-05',
      value: 79,
    }, {
      date: '2012-12-06',
      value: 78,
    }, {
      date: '2012-12-07',
      value: 78,
    }, {
      date: '2012-12-08',
      value: 78,
    }, {
      date: '2012-12-09',
      value: 74,
    }, {
      date: '2012-12-10',
      value: 73,
    }, {
      date: '2012-12-11',
      value: 75,
    }, {
      date: '2012-12-12',
      value: 70,
    }, {
      date: '2012-12-13',
      value: 77,
    }, {
      date: '2012-12-14',
      value: 67,
    }, {
      date: '2012-12-15',
      value: 62,
    }, {
      date: '2012-12-16',
      value: 64,
    }, {
      date: '2012-12-17',
      value: 61,
    }, {
      date: '2012-12-18',
      value: 59,
    }, {
      date: '2012-12-19',
      value: 53,
    }, {
      date: '2012-12-20',
      value: 54,
    }, {
      date: '2012-12-21',
      value: 56,
    }, {
      date: '2012-12-22',
      value: 59,
    }, {
      date: '2012-12-23',
      value: 58,
    }, {
      date: '2012-12-24',
      value: 55,
    }, {
      date: '2012-12-25',
      value: 52,
    }, {
      date: '2012-12-26',
      value: 54,
    }, {
      date: '2012-12-27',
      value: 50,
    }, {
      date: '2012-12-28',
      value: 50,
    }, {
      date: '2012-12-29',
      value: 51,
    }, {
      date: '2012-12-30',
      value: 52,
    }, {
      date: '2012-12-31',
      value: 58,
    }, {
      date: '2013-01-01',
      value: 60,
    }, {
      date: '2013-01-02',
      value: 67,
    }, {
      date: '2013-01-03',
      value: 64,
    }, {
      date: '2013-01-04',
      value: 66,
    }, {
      date: '2013-01-05',
      value: 60,
    }, {
      date: '2013-01-06',
      value: 63,
    }, {
      date: '2013-01-07',
      value: 61,
    }, {
      date: '2013-01-08',
      value: 60,
    }, {
      date: '2013-01-09',
      value: 65,
    }, {
      date: '2013-01-10',
      value: 75,
    }, {
      date: '2013-01-11',
      value: 77,
    }, {
      date: '2013-01-12',
      value: 78,
    }, {
      date: '2013-01-13',
      value: 70,
    }, {
      date: '2013-01-14',
      value: 70,
    }, {
      date: '2013-01-15',
      value: 73,
    }, {
      date: '2013-01-16',
      value: 71,
    }, {
      date: '2013-01-17',
      value: 74,
    }, {
      date: '2013-01-18',
      value: 78,
    }, {
      date: '2013-01-19',
      value: 85,
    }, {
      date: '2013-01-20',
      value: 82,
    }, {
      date: '2013-01-21',
      value: 83,
    }, {
      date: '2013-01-22',
      value: 88,
    }, {
      date: '2013-01-23',
      value: 85,
    }, {
      date: '2013-01-24',
      value: 85,
    }, {
      date: '2013-01-25',
      value: 80,
    }, {
      date: '2013-01-26',
      value: 87,
    }, {
      date: '2013-01-27',
      value: 84,
    }, {
      date: '2013-01-28',
      value: 83,
    }, {
      date: '2013-01-29',
      value: 84,
    }, {
      date: '2013-01-30',
      value: 81,
    }];

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    dateAxis.title.text = 'Date';
    valueAxis.title.text = 'Percent Green Websites Visited:';

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}';
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color('#7000FF');
    series.strokeWidth = 2;
    series.stroke = am4core.color('#00FF19');

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.label.minWidth = 20;
    series.tooltip.label.minHeight = 20;
    series.tooltip.label.textAlign = 'middle';
    series.tooltip.label.textValign = 'middle';

    // Make bullets grow on hover
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#7000FF');

    let bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panXY';
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    dateAxis.keepSelection = true;

    let title = chart.titles.create();
    title.marginBottom = 27;
    title.fontSize = 25;
    title.marginTop = 10;
    title.text = 'Percent Green Websites Visited Over Time:';
    title.fill = '#FFFFFF';
    title.background.fill = '#000000';
    title.fontFamily = 'Aclonica';
    title.padding(10, 10, 10, 10);
    this.chart = chart;
    this.setState({
      line: true,
    });
  }

  columnChart = (webArray) => {
    let greenNum = 0;
    let currentTime = new Date();
    let currentDate = db.splitDate(currentTime.toString());
    console.log(currentDate);
    for (let i = 0; i < 4; i++) {
      console.log(db.splitDate(webArray[i].timestamp.toDate().toString()));
    }
    let chart4 = am4core.create('chartdiv4', am4charts.PieChart3D);
    chart4.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart4.legend = new am4charts.Legend();

    let series = chart4.series.push(new am4charts.PieSeries3D());

    series.colors.list = [
      am4core.color('#7000FF'),
      am4core.color('#00FF19'),
    ];

    series.dataFields.value = 'Count';
    series.dataFields.category = 'Green';

    let title = chart4.titles.create();
    title.text = 'Green Sites Visited Today:';
    title.fontSize = 25;
    title.marginBottom = 30;
    title.marginTop = 30;
    title.fontFamily = 'Aclonica';
    title.fill = '#FFFFFF';
    title.background.fill = '#000000';
    title.padding(10, 10, 10, 10);

    let data = [{
      Green: 'Not Green',
      Count: 20,
    },
    {
      Green: 'Green',
      Count: 100,
    }];
    this.chart4 = chart4;
    chart4.data = data;
    this.setState({
      pie: true,
    });
  }

  topChart = (array) => {
    let allSitesObj = {};
    for (let i = 0; i < array.length; i++) {
      if (allSitesObj[array[i].website] != undefined) {
        allSitesObj[array[i].website].count += 1;
      } else {
        allSitesObj[array[i].website] = {
          count: 1,
          green: array[i].green,
        };
      }
    }
    let mainKey;
    let max = 0;
    let green = false;
    for (const [key, value] of Object.entries(allSitesObj)) {
      if (value.count > max) {
        max = value.count;
        mainKey = key;
        green = value.green;
      }
    }
    if (green) {
      green = 'is';
    }
    this.setState({
      max,
      mainkey: mainKey,
      green,
      top: true,
    });
  }

    topRender = () => {
      if (!this.state.top) {
        return <div className="blank" />;
      } else if (this.state.green) {
        return (
          <div className="top-result">
            <div className="website">{this.state.mainkey}</div>
            <div className="is"><span className="bold-black">is</span></div>
            <div className="box green"><span className="flexspan">GREEN</span></div>
          </div>
        );
      } else {
        return (
          <div className="top-result">
            <div className="website">{this.state.mainkey}</div>
            <div className="is"><span className="bold-black">is</span></div>
            <div className="box notgreen"><span className="flexspan">NOT GREEN</span></div>
          </div>
        );
      }
    }

    render() {
      return (
        <div id="stats-page">

          <Sidebar />
          <div className="outer-wrapper">
            <div className="wrapper">
              <div className="slide one" />
            </div>
          </div>
          <div className="charts">
            <div id="chartdiv" />
            <div id="chartdiv3" />
            <div id="chartdiv4" />
            <div id="chartdiv5">
              <div className="title-black">
                Your most visited site
              </div>
              {this.topRender()}
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
    email: reduxState.user.email,
  };
}
export default connect(mapStateToProps, null)(StatsPage);

/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
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
import * as Immutable from 'immutable';
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
    axis.renderer.labels.template.radius = 60;
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

    let label2 = chart.chartContainer.createChild(am4core.Label);
    label2.text = '*Percentage of unique websites visited that are green';
    label2.align = 'right';

    this.chart2 = chart;

    this.setState({
      gauge: true,
    });
  }

  websitesOverTimeLine = (array) => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create('chartdiv3', am4charts.XYChart);
    let obj = {};

    for (let i = 0; i < array.length; i++) {
      array[i].date = db.splitDate(array[i].timestamp.toDate().toString());
      console.log(array[i].date);
      if (array[i].green) {
        if (obj[array[i].date] == undefined) {
          obj[array[i].date] = 1;
        } else {
          obj[array[i].date] += 1;
        }
      }
    }
    let dateArray = [];
    for (let prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        dateArray.push({ date: prop, value: obj[prop] });
      }
    }

    console.log(dateArray);

    dateArray.sort((a, b) => {
      return (new Date(a.date)) - (new Date(b.date));
    });
    chart.data = dateArray;

    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    dateAxis.title.text = 'Date';
    valueAxis.title.text = 'Green Websites Visits:';

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
    title.text = 'Green Websites Clicks Over Time:';
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
    let tot = 0;
    let currentTime = new Date();
    let currentDate = db.splitDate(currentTime.toString());

    for (let i = 0; i < webArray.length; i++) {
      webArray[i].date = db.splitDate(webArray[i].timestamp.toDate().toString()); // split dates

      if (webArray[i].date == currentDate) { // if current date
        tot += 1;

        if (webArray[i].green) { // if green
          greenNum += 1;
        }
      }
    }

    let percent = Math.round((greenNum / tot) * 100);

    let notGreen = 100 - percent;
    let data = [{
      Green: 'Green',
      Count: percent,
    },
    {
      Green: 'Not Green',
      Count: notGreen,
    }];

    let chart4 = am4core.create('chartdiv4', am4charts.PieChart3D);
    chart4.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart4.legend = new am4charts.Legend();

    let series = chart4.series.push(new am4charts.PieSeries3D());

    series.colors.list = [
      am4core.color('#00FF19'),
      am4core.color('#7000FF'),

    ];

    series.dataFields.value = 'Count';
    series.dataFields.category = 'Green';

    let title = chart4.titles.create();
    title.text = 'Click on Green Sites Visited Today:';
    title.fontSize = 25;
    title.marginBottom = 30;
    title.marginTop = 30;
    title.fontFamily = 'Aclonica';
    title.fill = '#FFFFFF';
    title.background.fill = '#000000';
    title.padding(10, 10, 10, 10);
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
            <div className="is"><span className="bold-black-new">is</span></div>
            <div className="box green"><span className="flexspan">GREEN</span></div>
          </div>
        );
      } else {
        return (
          <div className="top-result">
            <div className="website">{this.state.mainkey}</div>
            <div className="is"><span className="bold-black-new">is</span></div>
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

/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Sidebar from './Sidebar';

am4core.useTheme(am4themes_animated);

class StatsPage extends Component {
  componentDidMount() {
    const chart1 = am4core.create('chartdiv1', am4charts.XYChart);
    chart1.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: `name${i}`, value: visits });
    }

    chart1.data = data;

    let dateAxis = chart1.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart1.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart1.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';

    series.tooltipText = '{valueY.value}';
    chart1.cursor = new am4charts.XYCursor();

    let title = chart1.titles.create();
    title.text = 'Love that website bb';
    title.fontSize = 25;
    title.marginBottom = 30;
    this.chart1 = chart1;

    this.makeGauge();
  }

  makeGauge = () => {
    // Create chart
    let chart = am4core.create('chartdiv', am4charts.GaugeChart);
    chart.zIndex = -1;

    // Create axis
    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.stroke = am4core.color('#FFFFFF');

    // Set inner radius
    chart.innerRadius = -20;

    // Add ranges
    let range = axis.axisRanges.create();
    range.value = 0;
    range.endValue = 100;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color('#000000');
    range.axisFill.zIndex = -1;

    // Add hand
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.value = 65;
    hand.pin.disabled = true;
    hand.fill = am4core.color('#000000');
    hand.stroke = am4core.color('#000000');
    hand.innerRadius = am4core.percent(50);
    hand.radius = am4core.percent(80);
    hand.startWidth = 15;
  }

  render() {
    return (
      <div className="main-page" id="stats-page">

        <Sidebar />
        <div className="green-bar" />
        <div className="outer-wrapper">
          <div className="wrapper">
            <div className="slide one" />
          </div>
        </div>
        <div id="chartdiv1" style={{ width: '250px', height: '260px' }} />
        <div id="chartdiv" style={{ width: '100%', height: '300px', zIndex: '-2' }} />
      </div>
    );
  }
}

export default StatsPage;

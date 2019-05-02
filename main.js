/*
* main.js for smashalytics
*   Reads tournamentData.csv and calls bubbleChart.js
* Author: Daniel Posse
*/
'use strict'

let csvData;

d3.csv("tournamentData.csv").then( (data) => {

  csvData = data;
  makeChart();

});

function makeChart() {

  let updatableChart = bubbleChart().data(csvData);

  d3.select('#chart').call(updatableChart);

}

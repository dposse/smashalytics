/*
* main.js for smashalytics
*   Reads tournamentData.csv and calls bubbleChart.js
* Author: Daniel Posse
*/

var chart = bubbleChart();


d3.csv("tournamentData.csv", (data) => {

  d3.select("#chart")
    .datum(data)
    .call(chart);

});

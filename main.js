/*
* main.js for smashalytics
*   Reads tournamentData.csv and calls bubbleChart.js
* Author: Daniel Posse
*/

let csvData;

d3.csv("tournamentData.csv").then( (data) => {

  csvData = data;
  makeChart();

});

function makeChart() {

  let updatableChart = bubbleChart().data(csvData);

  d3.select('#chart').call(updatableChart);

}





       /*var updatableChart = barChart().width(500).data(highTemperatures);

       d3.select('#updatableChart')
           .call(updatableChart);*/

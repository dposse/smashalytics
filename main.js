/*
* main.js for smashalytics
*   Reads tournamentData.csv and calls bubbleChart.js
* Author: Daniel Posse
*/

var bubbles = bubbleChart();


d3.csv("tournamentData.csv", (data) => {

  d3.select("#chart")
    .datum(data)
    .call(bubbles);

});

console.log(bubbles.width());

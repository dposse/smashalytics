/*
* Load data from csv and create charts
* name "inputData" to differentiate from d3.data function
*/

d3.csv("tournamentData.csv", (inputData) => {

  console.log(inputData);

  var chart = bubbleChart() //default size, can add .width(w).height(h)

  d3.select("#chart").data(inputData).call(chart);

});

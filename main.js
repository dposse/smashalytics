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

  /*let updatableChart = bubbleChart().data(csvData);

  d3.select('#chart').call(updatableChart);*/

  var svg = d3.select('svg').style('background-color','white');
  var width = +svg.attr('width');
  var height = +svg.attr('height');

  console.log(width,height);

  const data = [
    { 'name': 'Travis', 'sex': 'M' },
    { 'name': 'Rake', 'sex': 'M' },
    { 'name': 'Diana', 'sex': 'F' },
    { 'name': 'Rachel', 'sex': 'F' },
    { 'name': 'Shawn', 'sex': 'M' },
    { 'name': 'Emerald', 'sex': 'F' },
  ];

  var simulation = d3.forceSimulation().nodes(csvData);

  simulation
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width/2,height/2));

  var nodes = svg.append('g')
    .attr('class','nodes')
    .selectAll('circle')
    .data(csvData)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('fill', 'turquoise');

  function tick() {
    nodes
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; });
  }

  simulation.on('tick',tick);

}





       /*var updatableChart = barChart().width(500).data(highTemperatures);

       d3.select('#updatableChart')
           .call(updatableChart);*/

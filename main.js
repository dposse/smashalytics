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

  const entrants = csvData.map( d => d.entrants );
  console.log(entrants);

  /*let updatableChart = bubbleChart().data(entrants);

  d3.select('#chart').call(updatableChart);*/

  var svg = d3.select('#chart')
      .append('svg')
      .attr('height', 500)
      .attr('width', 300)
      .style('fill', 'turquoise')
      .style('background-color', 'white');



  //create nodes from data
  var nodes = svg.selectAll('circle')
    .data(entrants)
    .enter()
    .append('circle')
    .attr('fill', 'turquoise')
    .attr('stroke', 'black')
    //force layout should give random starting (x,y), so can probably delete
    //.attr('cx', (d) => { return Math.random() * width; })
    //.attr('cy', (d) => { return Math.random() * height; })
    .attr('r', function (d) { return Math.max(d / 15,5); });

  //create force layout
  var force = d3.forceSimulation(nodes)
    .force('center', d3.forceCenter(250,150))
    .force('charge', d3.forceManyBody().strength(-20))
    .on('tick', () => {
      nodes.attr('cx', node => node.x)
           .attr('cy', node => node.y);
    })

}





       /*var updatableChart = barChart().width(500).data(highTemperatures);

       d3.select('#updatableChart')
           .call(updatableChart);*/

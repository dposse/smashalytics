/*
* Create bubble chart with D3.js
*   Using reusable charts template by Rob Moore: https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
*   Based on reusable charts by Mike Bostock: https://bost.ocks.org/mike/chart/
*
* Author: Daniel Posse
*/

function bubbleChart() {

  //options accessible to caller
  var data = [],
      width = 800,
      height = 800;

  var updateData,
      updateWidth;

  function chart(selection) {
    //i think after handling data, can remove "d, i" as parameters
    selection.each(function (d, i) {
        var chartElem = d3.select(this);
        var svg = chartElem.selectAll('svg').data([d]);

        var svgEnter = svg.enter().append('svg');

        // Now append the elements which need to be inserted
        // only once to svgEnter.
        // e.g. 'g' which contains axis, title, etc.

        // 'Update' the rest of the graph here.
        // e.g. set the width/height attributes which change:
        svg
           .attr('width', width)
           .attr('height', height);

        updateData = function() {
          // use d3 update pattern with data
        }

        updateWidth = function() {
          // use width to make any changes
        };

    });
  }

  chart.data = function(value) {

    if (!arguments.length)
      return data;

    data = value;

    if (typeof updateData === 'function')
      updateData();

    return chart;

  };

  chart.width = function(value) {

    if (!arguments.length)
      return width;

    width = value;

    if (typeof updateWidth === 'function')
      updateWidth();

    return chart;

  };

  return chart;
} //end bubbleChart


/* OLD CODE
* "main" - read csv and create chart

d3.csv("tournamentData.csv")
  .then( (data) => {

    /*
    * checking syntax
    *//*
    console.log(data);
    data.forEach( (item) => {
      console.log(item.name);
      console.log(item.date);
      console.log(item.entrants);
      console.log(item.winner);
      console.log(item.url);
    });

    var svg = d3.select(".chartContainer")
                .append("svg")
                .attr("viewBox", "0 0 800 800")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .style("background-color","white");

    console.log(svg.style("width"));
    //add circles to svg
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("fill", "turquoise")
       .attr("stroke", "black")
       .attr("r", (data) => { return Math.max(data.entrants / 7, 5); })
       .attr("cx", (d) => { return Math.random() * 800; })
       .attr("cy", (d) => { return Math.random() * 800; });


  });*/

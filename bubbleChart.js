/*
* Create bubble chart with D3.js
*   Using reusable charts template from https://bost.ocks.org/mike/chart/
* Author: Daniel Posse
*/

function bubbleChart() {

  // default chart size
  var width = 700,
      height = 500;

  return function my(selection) {

    selection.each(function (d,i) {

      var chartElem = d3.select(this);
      var svg = chartElem.selectAll('svg').data([d]);
      var svgEnter = svg.enter().append('svg');

      //append elements which need to be inserted only
      //once here

      svg.attr('width', width)
        .attr('height', height);

    });

  }

  // getters/setters
  my.width = function(value) {

    if (!arguments.length) return width;
    width = value;
    return chart;

  };

  return my;

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

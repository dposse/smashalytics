/*
* Create bubble chart with D3.js
*   Using reusable charts template by Rob Moore: https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
*   Based on reusable charts by Mike Bostock: https://bost.ocks.org/mike/chart/
*
* Author: Daniel Posse
*/

function bubbleChart() {

    // All options that should be accessible to caller
    var width = 500;
    var height = 300;
    var barPadding = 1;
    var fillColor = 'turquoise';
    var strokeColor = 'black';
    var backgroundColor = 'white';
    var data = [];

    var updateWidth;
    var updateHeight;
    var updateFillColor;
    var updateData;

    function chart(selection){
        selection.each(function () {

            var barSpacing = height / data.length;
            var barHeight = barSpacing - barPadding;
            var maxValue = d3.max(data);
            var widthScale = width / maxValue;

            var dom = d3.select(this);
            var svg = dom.append('svg')
                .attr('class', 'bar-chart')
                .attr('height', height)
                .attr('width', width)
                .style('fill', fillColor)
                .style('background-color', backgroundColor);


            var nodes = svg.selectAll('circle')
              .data(data)
              .enter()
              .append('circle')
              .attr('fill', fillColor)
              .attr('stroke', strokeColor)
              .attr('cx', (d) => { return Math.random() * width; })
              .attr('cy', (d) => { return Math.random() * height; })
              .attr('r', function (d) { return d / 7; });


            // update functions
            updateWidth = function() {
                widthScale = width / maxValue;
                bars.transition().duration(1000).attr('width', function(d) { return d * widthScale; });
                svg.transition().duration(1000).attr('width', width);
            };

            updateHeight = function() {
                barSpacing = height / data.length;
                barHeight = barSpacing - barPadding;
                bars.transition().duration(1000).attr('y', function(d, i) { return i * barSpacing; })
                    .attr('height', barHeight);
                svg.transition().duration(1000).attr('height', height);

            };

            updateFillColor = function() {
                svg.transition().duration(1000).style('fill', fillColor);
            };

            updateData = function() {
                barSpacing = height / data.length;
                barHeight = barSpacing - barPadding;
                maxValue = d3.max(data);
                widthScale = width / maxValue;

                var update = svg.selectAll('rect.display-bar')
                    .data(data);

                update
                    .transition()
                    .duration(1000)
                    .attr('y', function(d, i) { return i * barSpacing; })
                    .attr('height', barHeight)
                    .attr('x', 0)
                    .attr('width', function(d) { return d * widthScale; });

                update.enter()
                    .append('rect')
                    .attr('class', 'display-bar')
                    .attr('y', function(d, i) { return i * barSpacing; })
                    .attr('height', barHeight)
                    .attr('x', 0)
                    .attr('width', 0)
                    .style('opacity', 0)
                    .transition()
                    .duration(1000)
                    .delay(function(d, i) { return (data.length - i) * 40; })
                    .attr('width', function(d) { return d * widthScale; })
                    .style('opacity', 1);

                update.exit()
                    .transition()
                    .duration(650)
                    .delay(function(d, i) { return (data.length - i) * 20; })
                    .style('opacity', 0)
                    .attr('height', 0)
                    .attr('x', 0)
                    .attr('width', 0)
                    .remove();
            }

        });
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        if (typeof updateWidth === 'function') updateWidth();
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        if (typeof updateHeight === 'function') updateHeight();
        return chart;
    };

    chart.fillColor = function(value) {
        if (!arguments.length) return fillColor;
        fillColor = value;
        if (typeof updateFillColor === 'function') updateFillColor();
        return chart;
    };

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        if (typeof updateData === 'function') updateData();
        return chart;
    };

    return chart;
}

/*function bubbleChart() {

  //options accessible to caller
  var data = [],
      width = 800,
      height = 800,
      backgroundColor = "white";

  var updateData,
      updateWidth;

  function chart(selection) {

    var svg = d3.select(this)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', backgroundColor);

    selection.each(function () {

        svg.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("fill", "turquoise")
          .attr("stroke", "black")
          .attr("r", (d) => { return Math.max(d / 7, 5); })
          .attr("cx", (d) => { return Math.random() * 800; })
          .attr("cy", (d) => { return Math.random() * 800; });

          console.log(data);
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
} //end bubbleChart*/


/* OLD CODE
* "main" - read csv and create chart

d3.csv("tournamentData.csv")
  .then( (data) => {

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

/*
* Create bubble chart with D3.js
*   Using reusable charts template by Rob Moore: https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
*   Based on reusable charts by Mike Bostock: https://bost.ocks.org/mike/chart/
*
* Author: Daniel Posse
*/

function bubbleChart() {

    // All options that should be accessible to caller
    //default width and height for 1080p monitor fullscreen
    var width = 1000;
    var height = 600;
    var fillColor = 'turquoise';
    var strokeColor = 'black';
    var backgroundColor = 'white';
    var data = [];

    function chart(selection){
        selection.each(function () {

          //make chart
          //create svg in selection
          var dom = d3.select(this);
          var svg = dom.append('svg')
              .attr('height', height)
              .attr('width', width)
              .style('fill', fillColor)
              .style('background-color', backgroundColor);

          var simulation = d3.forceSimulation().nodes(data);

          simulation
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width/2, height/2))
            .force('xAxis', d3.forceX(width/2).strength(0.4))
            .force('yAxis', d3.forceY(height/2).strength(0.6));

          var nodes = svg.append('g')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('fill', 'turquoise')
            .attr('stroke', 'black')
            .attr('r', (d) => { return Math.max((d.entrants/7), 5); });

          function tick() {
            nodes
              .attr('cx', function(d) { return d.x; })
              .attr('cy', function(d) { return d.y; });
          }

          simulation.on('tick', tick);

          //test data
          console.log(data);
          data.forEach( (item) => {
            console.log(item.name,item.date,item.entrants,item.winner);
          });

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

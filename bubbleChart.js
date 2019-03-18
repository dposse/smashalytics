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
    var width = 1200;
    var height = 800;
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
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width/2, height/2));

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

            //KEEPING FOR FUTURE REFERENCE
            // update functions from rob moore
            /*updateWidth = function() {
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
            }*/

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

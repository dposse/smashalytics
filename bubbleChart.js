/*
* Create bubble chart with D3.js
*   Using reusable charts template by Rob Moore: https://www.toptal.com/d3-js/towards-reusable-d3-js-charts
*   Based on reusable charts by Mike Bostock: https://bost.ocks.org/mike/chart/
*
* Author: Daniel Posse
*/

function bubbleChart() {

    //implement margin convention from https://bl.ocks.org/mbostock/3019563
    const margin = { top: 20, right: 10, bottom: 20, left: 10 };

    // All options that should be accessible to caller
    //default width and height for 1080p monitor fullscreen
    var width = 1000 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
    var fillColor = 'turquoise';
    var strokeColor = 'black';
    var backgroundColor = 'white';
    var tooltipOpacity = 0.95; // 0 to 1
    var transitionSpeed = 200; //in milliseconds
    var manyBodyStrength = 30;
    var collisionOffset = 10;
    var minRadius = 5;
    var data = [];

    function chart(selection){
        selection.each(function () {

          //make chart
          //create svg in selection
          var dom = d3.select(this);
          var svg = dom.append('svg')
              .attr('height', height + margin.top + margin.bottom)
              .attr('width', width + margin.left + margin.right)
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
              .style('fill', fillColor)
              .style('background-color', backgroundColor);

          var simulation = d3.forceSimulation().nodes(data);

          /*
          * FORCES
          *   change forces here
          */
          simulation
            .force('charge', d3.forceManyBody().strength(manyBodyStrength))
            .force('center', d3.forceCenter(width/2, height/2))
            .force('collision', d3.forceCollide().radius( (d) => { return Math.max((d.entrants/20), minRadius) + collisionOffset; }));
            //.force('xAxis', d3.forceX(width/2).strength(0.4))
            //.force('yAxis', d3.forceY(height/2).strength(0.6));

          var tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .attr('opacity', 0);

          var nodes = svg.append('g')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('fill', fillColor)
            .attr('stroke', strokeColor)
            .attr('r', (d) => { return Math.max((d.entrants/20), minRadius); })
            .call(d3.drag()
                    .on('start', dragstart)
                    .on('drag', dragging)
                    .on('end', dragend))
            .on('mouseover', function() {
              tooltip
                .transition()
                .duration(transitionSpeed)
                .style('opacity', tooltipOpacity);
            })
            .on('mousemove', function(d) {
              tooltip
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY + 'px')
                .style('display', 'block')
                .html(
                      '<span id="tournamentName">' + d.name + '</span><br>' +
                      //'<span id="tournamentDate">' + d.date + '</span><br>' +
                      '<span id="tournamentWinner">Winner: ' + d.winner + '</span><br>' +
                      '<span id="numberOfEntrants">' + d.entrants + ' entrants</span>'
                      );
            })
            .on('mouseout', function() {
              tooltip
                .transition()
                .duration(transitionSpeed)
                .style('opacity', 0);
            });


          function tick() {
            nodes
              .attr('cx', (d) => { return d.x; })
              .attr('cy', (d) => { return d.y; });
          } //end tick

          function dragstart(d) {

            if (!d3.event.active)
              simulation.alphaTarget(0.8).restart();

            d.fx = d.x;
            d.fy = d.y;

          } //end dragstart

          function dragging(d) {

            d.fx = d3.event.x;
            d.fy = d3.event.y;

          } //end dragging

          function dragend(d) {

            if (!d3.event.active)
              simulation.alphaTarget(0.7);

            d.fx = null;
            d.fy = null;

          } //end dragend

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

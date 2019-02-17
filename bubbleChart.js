/*
* Creates bubble chart with D3.js
*/

function bubbleChart() {

  //default chart size
  var width = 600;
  var height = 400;

  //create chart object, return it
  function chart(selection) {

  }

  /*
  * functions that change width and height
  * can be added on construction, i.e.
  *   bubbleChart().width(200).height(200);
  */
  chart.width = function(w) {

    if (!arguments.length)
      return width;

    width = w;

    return chart;

  } //end chart.width

  chart.height = function(h) {

    if (!arguments.length)
      return height;

    height = h;

    return chart;

  } //end chart.height

  /*
  * Physics simulation
  */
  /*var simulation = d3.forceSimulation(data)
                      .force("charge", d3.forceManyBody().strength([-50]))
                      .force("x", d3.forceX())
                      .force("y", d3.forceY())
                      .on("tick", ticked);*/

  function ticked(e) {

    //each circle is a node
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

  }

  /*
  * Size of nodes - NEED TO MESS WITH THIS
  * domain - min and max values of input data
  *     refers to number of tournament wins in this case
  * range - min and max output, aka radius of nodes
  *     initially set to 5, 18 to match example
  */
  var scaleRadius = d3.scaleLinear()


  return chart;

}

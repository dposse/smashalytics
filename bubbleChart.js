/*
* Creates bubble chart with D3.js
* Author: Daniel Posse
*/




/*
* "main" - read csv and create chart
*/
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
    });*/

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", 600)
                .attr("height",600)
                .style("background-color","white");
    /*svg.selectAll("circle")
       .data([32,57,112,293])
       .enter()
       .append("circle")
       .attr("cy", 60)
       .attr("cx", function(d,i) { return i * 100 + 30; })
       .attr("r", function(d) { return Math.sqrt(d); });*/

  });

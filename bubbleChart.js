/*
* Creates bubble chart with D3.js
* Author: Daniel Posse
*/

//chart variables
//var width = "100%"; // CHANGE TO PERCENT TO BE RESPONSIVE
//var height = "100";


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

    var svg = d3.select(".chartContainer")
                .append("svg")
                .attr("width", "100%")  // CHANGE TO PERCENT TO BE RESPONSIVE
                .attr("height", "100%")// CHANGE TO PERCENT TO BE RESPONSIVE
                .style("background-color","white");

    console.log(svg.style("width"));
    //add circles to svg
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("fill", "turquoise")
       .attr("stroke", "black")
       .attr("r", (data) => { return data.entrants / 7; })
       .attr("cx", (d) => { return Math.random() * parseInt(svg.style("width")); })
       .attr("cy", (d) => { return Math.random() * parseInt(svg.style("height")); });


  });

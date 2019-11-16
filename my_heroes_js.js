

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("my_heroes_csv.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0,100])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0,100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["Tank", "Bruiser", "Support", "Healer", "Ranged Assassin", "Melee Assassin" ])
    .range([ "#73C8FF", "#FF965A", "#73C8FF", "#64C8CD", "#FFCD3C", "#FF5F69"])

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Like); } )
      .attr("cy", function (d) { return y(d.Skilled); } )
      .attr("r",  function (d) { return y(d.Played) / 20 ; } )
      .style("fill", function (d) { return color(d.Role); } )
      .style("opacity", function (d) { return color(d.Played); } )


    svg.append("g")
     .attr("stroke-width", 1.5)
     .attr("font-family", "sans-serif")
     .attr("font-size", 10)
   .selectAll("g")
   .data(data)
   .join("g")
     .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
     .call(g => g.append("circle")
         .attr("stroke", "steelblue")
         .attr("fill", "none")
         .attr("r", 3))
     .call(g => g.append("text")
         .attr("dy", "0.35em")
         .attr("x", 7)
         .text(d => d.Hero));
})

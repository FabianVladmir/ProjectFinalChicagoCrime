import * as d3 from "d3";
// topojson = require('https://d3js.org/topojson.v1.min.js');

const array = [100, 200, 300, 350, 375, 400, 500];

d3.select("#chart")
 .selectAll("circle")
 .data(array)
 .enter()
 .append("circle")
 .attr("r", "10")
 .attr("cy", 100)
 .attr("cx", d => d)

setTimeout(function() {
  d3.select("#chart").selectAll("circle")
  .data([50, 75, 125, 225, 325, 425, 450])
  .transition().duration(1000)
  .attr("r", 5)
  .attr("cx", d => d)
  .style("fill", "red")
  }, 2000)

// d3.json("/src/js/world.geojson", createMap);
      
// function createMap(countries) {
  
//   var aProjection = d3.geoMercator()
//     .scale(80)
//     .translate([250, 250]);
  
//   var geoPath = d3.geoPath().projection(aProjection);
  
//   d3.select("svg").selectAll("path").data(countries.features)
//     .enter()
//     .append("path")
//       .attr("d", geoPath)
//       .attr("class", "countries");
//     }

// d3.json("/src/js/zipcodes.geojson", function(json) {

//   //Width and height
//   var width = 900;
//   var height = 450;

//   // create a first guess for the projection
//   var center = d3.geo.centroid(json)
//   var scale = 150;
//   var projection = d3.geo.mercator().scale(scale).center(center);
//   //Define path generator
//   var path = d3.geo.path()
//                   .projection(projection);

//   // using the path determine the bounds of the current map and use
//   // these to determine better values for the scale and translation
//   var bounds = path.bounds(json);
//   var hscale = scale * width / (bounds[1][0] - bounds[0][0]);
//   var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
//   var scale = (hscale < vscale) ? hscale : vscale;
//   var offset = [width - (bounds[0][0] + bounds[1][0]) / 2,
//                    height - (bounds[0][1] + bounds[1][1]) / 2];

//   // new projection
//   projection = d3.geo.mercator().center(center)
//    .scale(scale * 0.9).translate(offset);
//   path = path.projection(projection);

//   //Create SVG element
//   var svg = d3.select(".map")
//              .attr("width", width)
//              .attr("height", height)

//   //Bind data and create one path per GeoJSON feature
//   svg.selectAll("path")
//     .data(json.features)
//     .enter()
//     .append("path")
//     .attr("d", path)
//     .attr("class", "zipcode");

// });


// const width = 800; // Width of the map container
// const height = 600; // Height of the map container

// const svg = d3.select('#map')
//   .append('svg')
//   .attr('width', width)
//   .attr('height', height);

// // Load the GeoJSON data for Chicago
// d3.json('/src/js/zipcodes.geojson').then(function (data) {
//   // Create a geographic projection for Chicago
//   const projection = d3.geoMercator()
//   .fitSize([width, height], data)
//   .center([-87.6298, 41.8781]) // Set the center of the map to Chicago's latitude and longitude
//   .translate([width / 2, height / 2]); // Translate the map to the center of the container

//   // Create a path generator using the projection
//   const path = d3.geoPath().projection(projection);
//   // Render the map
//   svg.selectAll('path')
//   .data(data.features)
//   .enter()
//   .append('path')
//   .attr('d', path)
//   .attr('fill', 'steelblue')
//   .attr('stroke', 'white');

// });


// d3.json("zipcodes.geojson", function(json) {

//   //Width and height
//   var width = 900;
//   var height = 450;

//   // create a first guess for the projection
//   var center = d3.geo.centroid(json)
//   var scale = 150;
//   var projection = d3.geo.mercator().scale(scale).center(center);
//   //Define path generator
//   var path = d3.geo.path()
//                   .projection(projection);

//   // using the path determine the bounds of the current map and use
//   // these to determine better values for the scale and translation
//   var bounds = path.bounds(json);
//   var hscale = scale * width / (bounds[1][0] - bounds[0][0]);
//   var vscale = scale * height / (bounds[1][1] - bounds[0][1]);
//   var scale = (hscale < vscale) ? hscale : vscale;
//   var offset = [width - (bounds[0][0] + bounds[1][0]) / 2,
//                    height - (bounds[0][1] + bounds[1][1]) / 2];

//   // new projection
//   projection = d3.geo.mercator().center(center)
//    .scale(scale * 0.9).translate(offset);
//   path = path.projection(projection);

//   //Create SVG element
//   var svg = d3.select(".map")
//              .attr("width", width)
//              .attr("height", height)

//   //Bind data and create one path per GeoJSON feature
//   svg.selectAll("path")
//     .data(json.features)
//     .enter()
//     .append("path")
//     .attr("d", path)
//     .attr("class", "zipcode");

// });

// const width = 960;
// const height = 1000;

// projection = d3.geoMercator()
// .scale(width * 90)
// .center([-87.6298, 41.8781])
// .translate([width / 2, height / 2])
 

// data = d3.json("https://raw.githubusercontent.com/michaeltranxd/UIC-Undergraduate-Research-2019-2020/master/HTML/MyWebsite/topojson/chicago_zipcodes.json");


// geojson = topojson.feature(data, data.objects["Boundaries - ZIP Codes"]);

// colorScheme = d3.schemeBlues[4];

// colorScale = d3.scaleThreshold()
// .domain([0, 5, 10, 20])
// .range(colorScheme);



// function generate1DRandomDataSet(dataSetSize, minValue, maxValue) {
//   var dataset = []; //Initialize empty array
//   for (var i = 0; i < dataSetSize; i++) {
//     var newNumber = Math.random() * (maxValue - minValue + 1) + minValue;
//     newNumber = Math.floor(newNumber) // Round to nearest integer value
//     dataset.push(newNumber); //Add new number to array
//   }
//   return dataset
// }

// function mapDataToPopulation(data, dictionaryData){
//   for(const element of data){
//     if(dictionaryData[element] != null){
//       dictionaryData[element] = dictionaryData[element] + 1;
//     }
//   }
//   return dictionaryData
// }


// // Randomly generate data for choropleth map
// populationData = {
//   // Generate random data for our "population", every entry is a "patient"
// let randomZipcodeData = generate1DRandomDataSet(1000, 60601, 60827);
// var dictionaryPopData = {}
// // Define the valid zipcodes that will map to the choropleth map
// for(const elem of geojson.features){
//   // Populate dictionary with keys that will be valid "keys" based on the geojson
//   dictionaryPopData[elem.properties.zip] = 0;
// }
// // Map random data to dictionary (its possible that the data may not be in the dictionary, that case we ignore data)
// let populationData = mapDataToPopulation(randomZipcodeData, dictionaryPopData);
// return populationData
// }

  
// const svg = d3.select("#map").selectAll("svg").data(['foo']).enter().append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("class", "topo")
  
//   // Add group for color legend
//   var g = svg.append("g")
//   .attr("class", "legendThreshold")
//   .attr("transform", "translate(" + width * .65 + "," + height / 2 + ")");
//   g.append("text")
//     .attr("class", "caption")
//     .attr("x", 0)
//     .attr("y", -6)
//     .text("Population");

//   // Add labels for legend
//   var labels = ['0', '1-5', '6-10', '11-20'];

//   // Create the legend based on colorScale and our labels
//   var legend = d3.legendColor()
//   .labels(function (d) { return labels[d.i]; })
//   .shapePadding(4)
//   .scale(colorScale);
//   svg.select(".legendThreshold")
//     .call(legend);  

//   // Add the data to the choropleth map
//   svg.selectAll("path")
//     .data(geojson.features)
//     .enter()
//     .append("path")
//     .attr("fill", function(d, i){
//     return colorScale(populationData[d.properties.zip]);
//   })
//     .attr("d", d3.geoPath(projection))  


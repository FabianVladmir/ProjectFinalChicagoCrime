import * as d3 from "d3";
import name_value from "./listLocations";
import {getCrimeRateByYear} from "../CrimeRate/getCrimeRate"

//** d3 */
var svg = d3.select(".map")
            .append("svg")
            .attr('width', 1400)
            .attr('height', 550)

//** By Coordinates */
const onChangeSelect = async (event) => {
  let boundariesCurrent = event.target.value;
  let byYear = document.getElementById("slide_by_year");
  await drawMap(boundariesCurrent,byYear.value);
}
const selectChicagoMap = document.querySelector('#selectMap');
selectChicagoMap.addEventListener('change', onChangeSelect);

//** By Year */
async function onChangeSelectByYear(event) {
  let byYear = event.target.value
  let boundariesCurrent = document.getElementById("selectMap");
  await drawMap(boundariesCurrent.value,byYear);
}
const slideChicagoMap = document.querySelector('#slide_by_year');
slideChicagoMap.addEventListener('change', onChangeSelectByYear);

//** plot Map */
async function drawMap(boundariesCurrent,byYear){
    // await getMap(boundariesCurrent)
  if (boundariesCurrent === "") {
    alert("Por favor seleccione una escala");  
    return;
  }

  try {
      var currData;
      var selectString = name_value[boundariesCurrent];

      await fetch(`src/maps/${selectString}`)
        .then(response => response.json())
        .then(data => {
          currData = data;
        })
        .catch(error => {
          throw new Error('Error al cargar el archivo JSON: ' + error);
        });
  } catch (error) {
    console.error(error);
  }

  /** COORDINATES */
  const {features} = currData;
  // console.log("datos : ",features);
  // console.log("datos : ",typeof features);
  const coordinatesList = features.map((element)=>{
    const {geometry: {coordinates}, properties} = element ?? {};
    console.log("Properties: ", properties);
    return coordinates;
  });
  
  const maxMinXY = coordinatesList.reduce((accumulator, currentValue) => {
    
  currentValue.forEach(element => {
      element.forEach(coordinates => {
        coordinates.forEach(value => {
          if (value[0] > accumulator?.X[1]){
            accumulator.X[1] = value[0];
          }
          if (value[0] < accumulator?.X[0]){
            accumulator.X[0] = value[0];
          }
          if (value[1] > accumulator?.Y[1]){
            accumulator.Y[1] = value[1];
          }
          if (value[1] < accumulator?.Y[0]){
            accumulator.Y[0] = value[1];
          }
        })
      });
    });
    return accumulator
  }, {'X': [0,-999], 'Y': [999,-999]})

  var x = d3.scaleLinear().range([0, 1000]);
  var x2 = d3.scaleLinear().range([800, 1800]);
  var y = d3.scaleLinear().range([1350, 50]);

  // x.domain([-88, -87]);
  // x2.domain([-88, -87]);
  // y.domain([41, 42]);
  maxMinXY.X[0] = Math.floor(maxMinXY.X[0]);
  maxMinXY.X[1] = Math.ceil(maxMinXY.X[1]);
  maxMinXY.Y[0] = Math.floor(maxMinXY.Y[0]);
  maxMinXY.Y[1] = Math.floor(maxMinXY.Y[1]);
  
  // console.log(maxMinXY);

  x.domain(maxMinXY.X ?? [-88, -87]);
  x2.domain(maxMinXY.X ?? [-88, -87]);
  y.domain(maxMinXY.Y ?? [41, 42]);

  /** BY YEARS */
  try {
    var rateCrime = await getCrimeRateByYear(boundariesCurrent,byYear)  
    if (boundariesCurrent === "beat") {
      var locationList = features.map((element)=>{
        const {properties: {beat_num}} = element ?? {};
        return beat_num;
      }); 
    }else if(boundariesCurrent === "ward"){
      var locationList = features.map((element)=>{
        const {properties: {ward}} = element ?? {};
        return ward;
      }); 
    }else if(boundariesCurrent === "district"){
      var locationList = features.map((element)=>{
        const {properties: {dist_num}} = element ?? {};
        return dist_num;
      }); 
    }else if(boundariesCurrent === "community_area"){
      var locationList = features.map((element)=>{
        const {properties: {area_numbe}, properties: {community}} = element ?? {};
        return area_numbe;
      }); 
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Tasa de crimen por: ", boundariesCurrent, " y ", byYear,rateCrime);
    console.log("Por locacion en: ", locationList);
  }

  // percent by Location
  let percentByLocation = [];
  let sumTotal = 0;
  for (const key in rateCrime) {
    const values = Object.values(rateCrime[key]);
    const percent = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    percentByLocation.push(percent);
    sumTotal+=percent;
  }
  console.log(percentByLocation);
  percentByLocation = percentByLocation.map(percent => 1/percent);
  console.log(percentByLocation);
  
  //each boundaries
  for (var i = 0; i < coordinatesList.length; i++) {
    //some boundaries contain more coordinates for example 3 beats belong to a district
    for (var j = 0; j < coordinatesList[i].length; j++){
      //total of polygon
      for (let k = 0; k < coordinatesList[i][j].length; k++) {
        svg.append("polygon").data([coordinatesList[i][j][k]])
        .attr("points", function (d) {
            return d.map(function (d) {
                return [x(d[0]), y(d[1])].join(",");
            }).join(" ");
        })
        .attr('stroke-width', 1.5)
        // .attr("fill", 'rgb('+ (212 * percentByLocation[i]) +',' + (173 * percentByLocation[i]) + ','+ (252 * percentByLocation[i]) +')')
        .attr("fill", 'rgb(0,' + (255 * percentByLocation[i] * 80) + ',0)')
        // .attr("fill", '#D0D0D0')
        
        // rgb(212, 173, 252)
        .attr("stroke", 'white')
        .on("mouseover", function () {
          var originalColor = d3.select(this).attr("fill");  
          d3.select(this).attr("fill", '#D0D0D0');
          d3.select(this).on("mouseout", function () {
            d3.select(this).attr("fill", originalColor);
          });
        })
        // .on("mouseout", function () {
        //   d3.select(this).attr("fill", originalColor)

        // })
        .on("click", function () {
          var coordinates = d3.select(this).data()[0];
          // console.log(coordinates);
          var centroid = d3.polygonCentroid(coordinates);
        
          var xPosition = x(centroid[0]);
          var yPosition = y(centroid[1]);
        
          var tooltip = d3.select("#tooltip");
          
          // var content = locationList[k];
          console.log(locationList);
          
          tooltip
            .style("left", xPosition+80 + "px")
            .style("top", yPosition+270 + "px")
            .style("display", "block")
            .text("Numero de Localidad: " + content + ": "+ "rateCrime[content]");
          //hidden
          setTimeout(function () {
            tooltip.style("display", "none");
          }, 2000);
        });
        
      }
    }
  }
}
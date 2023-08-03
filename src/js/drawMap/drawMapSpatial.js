import * as d3 from "d3";
import name_value from "./listLocations";
import {getCrimeRate, getCrimeRateByYear, getDataTotal} from "../CrimeRate/getCrimeRate"

import 
{ countCrimesPerYear, countCrimesPerYearBySpecificCrime,countCrimesPerYearByRegion, counterCrimePerMounthBySpecificCrime,countCrimesPerMonth } 
from '../Time Series/functionsTimeSeries';

import 
{ drawTotalCrimeTimeSeries,drawTotalCrimeByTypesTimeSeries,drawTotalCrimeTypesByRegionTimeSeries,drawCrimeMonthByTypes } 
from '../Time Series/drawLine';


import { drawTopCrimesTypesBarChart } from "../barChart/drawBarChartHor";

//** d3 */
var svg = d3.select(".map")
            .append("svg")
            .attr('width', 1400)
            .attr('height', 550)
            .attr('transform', `translate(${400}, ${0})`) // Centrar el svg


//** By Coordinates */
const onChangeSelect = async (event) => {
  let boundariesCurrent = event.target.value;
  // let byYear = document.getElementById("slide_by_year");
  await drawMapGeneral(boundariesCurrent);
}
const selectChicagoMap = document.querySelector('#selectMap');
selectChicagoMap.addEventListener('change', onChangeSelect);
let boundariesDefault = selectChicagoMap.value;
//** By Year */
// async function onChangeSelectByYear(event) {
//   let byYear = event.target.value
//   let boundariesCurrent = document.getElementById("selectMap");
//   await drawMap(boundariesCurrent.value,byYear);
// }
// const slideChicagoMap = document.querySelector('#slide_by_year');
// slideChicagoMap.addEventListener('change', onChangeSelectByYear);

//** Color */
const interpolateColor = d3.interpolateRgb("#FFEECC", "#C51605");

/** Draw by default */
drawMapGeneral(boundariesDefault)

//** Draw Map */

async function drawMapGeneral(boundariesCurrent) {
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
  console.log("datos : ",features);
  // console.log("datos : ",typeof features);
  const coordinatesList = features.map((element)=>{
    const {geometry: {coordinates}, properties} = element ?? {};
    // console.log("Properties: ", properties);
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
    var rateCrime = await getCrimeRate(boundariesCurrent)  
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
    console.log("Tasa de crimen por: ", boundariesCurrent, " y ",rateCrime );
    
    // datos de  location list del features
    locationList = locationList.map((value) => parseInt(value));
    console.log("Por location por features en: ", locationList);
  }
  
  // percent by Location
  let percentByLocation = [];
  let nameByLocation = []
  
  let sumTotal = 0;
  for (const key in rateCrime) {
    const values = Object.values(rateCrime[key]);
    const percent = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    percentByLocation.push(percent);
    nameByLocation.push(parseInt(key))
    sumTotal+=percent;
  }
  // console.log(percentByLocation);
  // console.log(nameByLocation);
  // percentByLocation = percentByLocation.map(percent => 1/percent);
  
  //normalization
  percentByLocation = percentByLocation.map(value => value / sumTotal);
  // Definir el dominio y rango para el escalamiento lineal
  var domain = [0, 1]; // Rango de valores normalizados [0, 1]
  var range = [0, 1]; // Rango de valores para la interpolación [0, 1]
  
  var scale = d3.scaleLinear().domain(domain).range(range);
  
  // console.log(percentByLocation);
  
  /**draw Map*/
  
  //each boundaries
  for (var i = 0; i < coordinatesList.length; i++) {
    // console.log("INDICES LIST: ", locationList[i]);
    // console.log("INDICES NAME: ", nameByLocation[i]);
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
        .attr("fill", function (d) {
          const idx = nameByLocation.indexOf(locationList[i]);
          // console.log(locationList[i]);
          // console.log(idx);
          // console.log(interpolateColor(scale(percentByLocation[idx]*10)));
          // console.log(percentByLocation[idx]);
          // console.log(locationList[i]);
          if (idx == -1) {
            console.log("no existe");
            return interpolateColor(scale(0*10));
          }
          if (boundariesCurrent === "district")
            return interpolateColor(scale(percentByLocation[idx]*10));          
          if (boundariesCurrent === "ward")
            return interpolateColor(scale(percentByLocation[idx]*100));
          if (boundariesCurrent === "beat")
            return interpolateColor(scale(percentByLocation[idx]*100));
          if (boundariesCurrent === "community_area")
            return interpolateColor(scale(percentByLocation[idx]*100));
        })
        // .attr("fill", 'rgb(0,' + (255 * percentByLocation[i]) + ',0)')
        .attr("subLocation", locationList[i])
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
        .on("click",async function () {
          let coordinates = d3.select(this).data()[0];
          // console.log(coordinates);
          let centroid = d3.polygonCentroid(coordinates);
          let xPosition = x(centroid[0]);
          let yPosition = y(centroid[1]);
          let tooltip = d3.select("#tooltip");
          
          const numLocal = d3.select(this).attr("subLocation");
          let content = "";
          const byLocalRate= rateCrime[numLocal]
          let sumTotal = 0;
          for (const key in byLocalRate) {
            if (Object.hasOwnProperty.call(byLocalRate, key)) {
              const element = byLocalRate[key];
              content += `${key}: ${element} <br>`;
              sumTotal += element;
            }
          }
  
          tooltip
            // .style("left", xPosition+80 + "px")
            // .style("top", yPosition+270 + "px")
            .style("left",10 + "px")
            .style("top", 1 + "px")
            .style("display", "block")
            .style("width", "300px")
            // .text("Numero de Localidad: " + numLocal + ": "+ content);
            .html("Numero de Localidad: " + numLocal + "<br> Total de Crimenes: "+ sumTotal +"<br>" + content);
  
            //hidden
          setTimeout(function () {
            tooltip.style("display", "none");
          }, 8000);

          //draw Bar chart
          // let rateCrime = await getCrimeRate(boundariesCurrent)

          drawTopCrimesTypesBarChart(rateCrime,numLocal);

          /** invocar la serie temporal */
          const dataChicago = await getDataTotal(); 
          const totalCrimeTypeByRegion = countCrimesPerYearByRegion(dataChicago,boundariesCurrent);
          drawTotalCrimeTypesByRegionTimeSeries(totalCrimeTypeByRegion,numLocal);
  
          
        });
        
      }
    }
  }  
}


//** plot Map by year*/
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
  console.log("datos : ",features);
  // console.log("datos : ",typeof features);
  const coordinatesList = features.map((element)=>{
    const {geometry: {coordinates}, properties} = element ?? {};
    // console.log("Properties: ", properties);
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
    console.log("Tasa de crimen por: ", boundariesCurrent, " y ", byYear,rateCrime );
    
    // datos de  location list del features
    locationList = locationList.map((value) => parseInt(value));
    console.log("Por location por features en: ", locationList);
  }

  // percent by Location
  let percentByLocation = [];
  let nameByLocation = []

  let sumTotal = 0;
  for (const key in rateCrime) {
    const values = Object.values(rateCrime[key]);
    const percent = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    percentByLocation.push(percent);
    nameByLocation.push(parseInt(key))
    sumTotal+=percent;
  }
  console.log(percentByLocation);
  console.log(nameByLocation);
  // percentByLocation = percentByLocation.map(percent => 1/percent);

  //normalization
  percentByLocation = percentByLocation.map(value => value / sumTotal);
  // Definir el dominio y rango para el escalamiento lineal
  var domain = [0, 1]; // Rango de valores normalizados [0, 1]
  var range = [0, 1]; // Rango de valores para la interpolación [0, 1]

  var scale = d3.scaleLinear().domain(domain).range(range);

  console.log(percentByLocation);
  
  //each boundaries
  for (var i = 0; i < coordinatesList.length; i++) {
    // console.log("INDICES LIST: ", locationList[i]);
    // console.log("INDICES NAME: ", nameByLocation[i]);
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
        .attr("fill", function (d) {
          const idx = nameByLocation.indexOf(locationList[i]);
          // console.log(locationList[i]);
          // console.log(idx);
          // console.log(interpolateColor(scale(percentByLocation[idx]*10)));
          // console.log(percentByLocation[idx]);
          // console.log(locationList[i]);
          if (idx == -1) {
            console.log("no existe");
            return interpolateColor(scale(0*10));
          }
          if (boundariesCurrent === "district")
            return interpolateColor(scale(percentByLocation[idx]*10));          
          if (boundariesCurrent === "ward")
            return interpolateColor(scale(percentByLocation[idx]*1000));
          if (boundariesCurrent === "beat")
            return interpolateColor(scale(percentByLocation[idx]*100));
          if (boundariesCurrent === "community_area")
            return interpolateColor(scale(percentByLocation[idx]*100));
        })
        // .attr("fill", 'rgb(0,' + (255 * percentByLocation[i]) + ',0)')
        .attr("subLocation", locationList[i])
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
          let coordinates = d3.select(this).data()[0];
          // console.log(coordinates);
          let centroid = d3.polygonCentroid(coordinates);
          let xPosition = x(centroid[0]);
          let yPosition = y(centroid[1]);
          let tooltip = d3.select("#tooltip");
          
          const numLocal = d3.select(this).attr("subLocation");
          let content = "";
          const byLocalRate= rateCrime[numLocal]
          let sumTotal = 0;
          for (const key in byLocalRate) {
            if (Object.hasOwnProperty.call(byLocalRate, key)) {
              const element = byLocalRate[key];
              content += `${key}: ${element} <br>`;
              sumTotal += element;
            }
          }
          xPosition = xPosition/2
          yPosition = yPosition/2

          tooltip
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .style("display", "block")
            .style("width", "300px")
            // .text("Numero de Localidad: " + numLocal + ": "+ content);
            .html("Numero de Localidad: " + numLocal + "<br> Total de Crimenes: "+ sumTotal +"<br>" + content);

            //hidden
          setTimeout(function () {
            tooltip.style("display", "none");
          }, 8000);
        });
        
      }
    }
  }
}
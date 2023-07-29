import {fetchDataChicago, fetchDataChicagoByYear} from './APIChicagoCrime.js'; // to download chicago data
import {drawMap} from './d3MapCrime.js'; // to mapping crime 
import 
{getTotalCrimesByBeat, getTotalCrimesByCommunityArea, getTotalCrimesByWard, getTotalCrimesByDistrict, sortObjectEntries} 
from './functions.js';

import 
{ drawTotalCrimeTimeSeries,drawTotalCrimeByTypesTimeSeries,drawCrimeMonthByTypes } 
from './Time Series/drawLine.js';

import 
{ countCrimesPerYear, countCrimesPerYearBySpecificCrime,counterCrimePerMounthBySpecificCrime,countCrimesPerMonth } 
from './Time Series/functionsTimeSeries.js';

const btnChicagoMap = document.querySelector('#btnChicagoMap');
console.log(btnChicagoMap);
btnChicagoMap.addEventListener('click', showMapChicago);
// showMapChicago()

(async function __st__() {
  const dataChicago = await fetchDataChicago();
  const totalCrimeByTypes = countCrimesPerYearBySpecificCrime(dataChicago);

  drawTotalCrimeByTypesTimeSeries(totalCrimeByTypes);
  
})();

async function showMapChicago (){
  
    try {
        const dataChicago = await fetchDataChicago();

        // console.log(dataChicago);
        
        // console.log(`Data Chicago ${JSON.stringify(dataChicago,null,2)}`);
        // console.log(`Cantidad de datos: `, dataChicago.length);
        
        const dataChicagoYear = await fetchDataChicagoByYear(2001);
        
        // console.log(`Cantidad de dato chicago ${JSON.stringify(dataChicago,null,2)}`);
        // console.log(`Cantidad de dato chicago en años ${JSON.stringify(dataChicagoYear,null,2)}`);

        let chicagoCrimeWard = {};
        let chicagoCrimeBeat = {};
        let chicagoCrimeDistrict = {};
        let chicagoCrimeCommunityArea = {};
        // dataChicago.forEach(currDataChicago => {
        //   // chicagoCrimeWard = getTotalCrimesByWard(currDataChicago);
        //   const currchicagoCrimeWard = getTotalCrimesByWard(currDataChicago);
        //   chicagoCrimeWard[currDataChicago];
        //   console.log(currchicagoCrimeWard);
        // });

        // console.log(chicagoCrimeWard);

        // console.log("DATA FOR WORK");
        // chicagoCrimeBeat = getTotalCrimesByBeat(dataChicagoYear);
        // console.log(`Chicago crime beat ${JSON.stringify(chicagoCrimeBeat,null,2)}`);
        // chicagoCrimeWard = getTotalCrimesByWard(dataChicagoYear);
        // console.log(`Chicago crime Wardt ${JSON.stringify(chicagoCrimeWard,null,2)}`);
        // chicagoCrimeDistrict = getTotalCrimesByDistrict(dataChicagoYear);
        // console.log(`Chicago crime District ${JSON.stringify(chicagoCrimeDistrict,null,2)}`);
        // chicagoCrimeCommunityArea = getTotalCrimesByCommunityArea(dataChicagoYear);
        // console.log(`Chicago crime CommunityArea ${JSON.stringify(chicagoCrimeCommunityArea,null,2)}`);


        // const objSorted = sortObjectEntries(chicagoCrimeCommunityArea)
        // console.log(objSorted);
        
        //Print de min and max values from some attributes
        const desiredAttributes = ["beat", "community_area","district", "ward", "year"];

        const maxValues = {};
        const minValues = {};
        const attributeCounts = {};

        dataChicago.forEach(element => {
          desiredAttributes.forEach(attr => {
            if (attr in element) {
              const value = parseInt(element[attr]); 
              if (!(attr in maxValues) || value > maxValues[attr]) {
                maxValues[attr] = value;
              }
              if (!(attr in minValues) || value < minValues[attr]) {
                minValues[attr] = value;
              }
            }
            if (!(attr in attributeCounts)) {
              attributeCounts[attr] = 1;
            } else {
              attributeCounts[attr]++;
            }
          });
        });

        console.log("Maximum values:", maxValues);
        console.log("Minimum values:", minValues);
        console.log("Attribute counts:", attributeCounts);



        const totalCrimeAllYears = countCrimesPerYear(dataChicago);

        // console.log(totalCrimeAllYears);

        drawTotalCrimeTimeSeries(totalCrimeAllYears);

        const totalCrimeByTypes = countCrimesPerYearBySpecificCrime(dataChicago);

        drawTotalCrimeByTypesTimeSeries(totalCrimeByTypes);

        // console.log(totalCrimeByTypes);

        const totalCrimeByMonths = countCrimesPerMonth(dataChicago);

        console.log(totalCrimeByMonths);

        const CrimeMonthByTypes = counterCrimePerMounthBySpecificCrime(dataChicago);

        drawCrimeMonthByTypes(CrimeMonthByTypes,2017);
       
        console.log(CrimeMonthByTypes);
        // console.log(Object.values(currTotalCrimeByYear[0][1]));
        // console.log(currTotalCrimeByYear[1]);


        // drawMap(dataChicagoJSON);        
        

      } catch (error) {
        console.log(error)
      }
}
import {fetchDataChicago, fetchDataChicagoByYear} from './APIChicagoCrime.js';
import {drawMap} from './d3MapCrime.js';
import 
{getTotalCrimesByBeat, getTotalCrimesByCommunityArea, getTotalCrimesByWard, getTotalCrimesByDistrict, sortObjectEntries} 
from './functions.js';

import { countCrimesPerYear } from './Time Series/functionsTimeSeries.js';

const btnChicagoMap = document.querySelector('#btnChicagoMap');
console.log(btnChicagoMap);
btnChicagoMap.addEventListener('click', showMapChicago);

async function showMapChicago (){
  
    try {
        const dataChicago = await fetchDataChicago();
        
        console.log( dataChicago);
        
        // const dataChicagoYear = await fetchDataChicagoByYear(2001);

        // console.log(dataChicagoYear);

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

        // chicagoCrimeBeat = getTotalCrimesByBeat(dataChicago);
        // console.log(chicagoCrimeBeat);
        // chicagoCrimeWard = getTotalCrimesByWard(dataChicago);
        // console.log(chicagoCrimeWard);
        // chicagoCrimeDistrict = getTotalCrimesByDistrict(dataChicago);
        // console.log(chicagoCrimeDistrict);
        // chicagoCrimeCommunityArea = getTotalCrimesByCommunityArea(dataChicago);
        // console.log(chicagoCrimeCommunityArea);


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

        console.log(totalCrimeAllYears);
        console.log(Object.keys(totalCrimeAllYears));

        const currTotalCrimeByYear = Object.entries(totalCrimeAllYears)
        console.log(Object.values(currTotalCrimeByYear[0][1]));
        console.log(currTotalCrimeByYear[1]);


        // drawMap(dataChicagoJSON);        
        

      } catch (error) {
        console.log(error)
      }
}
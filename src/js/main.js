import {fetchDataChicago, fetchDataChicagoByYear} from './APIChicagoCrime.js'; // to download chicago data
import {drawMap} from './d3MapCrime.js'; // to mapping crime 
import 
{getTotalCrimesByBeat, getTotalCrimesByCommunityArea, getTotalCrimesByWard, getTotalCrimesByDistrict, sortObjectEntries} 
from './functions.js'

const btnChicagoMap = document.querySelector('#btnChicagoMap');
console.log(btnChicagoMap);
btnChicagoMap.addEventListener('click', showMapChicago);

async function showMapChicago (){
  
    try {
        const dataChicago = await fetchDataChicago();        

        console.log(`Tipo de datos de Chicago ${ typeof dataChicago}`);
        
        console.log(`Data Chicago ${JSON.stringify(dataChicago,null,2)}`);
        console.log(`Cantidad de datos: `, dataChicago.length);
        
        const dataChicagoYear = await fetchDataChicagoByYear(2001);

        console.log(`Cantidad de dato chicago en años ${JSON.stringify(dataChicagoYear,null,2)}`);

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

        chicagoCrimeBeat = getTotalCrimesByBeat(dataChicago);
        console.log(`Chicago crime beat ${JSON.stringify(chicagoCrimeBeat,null,2)}`);
        chicagoCrimeWard = getTotalCrimesByWard(dataChicago);
        console.log(`Chicago crime Wardt ${JSON.stringify(chicagoCrimeWard,null,2)}`);
        chicagoCrimeDistrict = getTotalCrimesByDistrict(dataChicago);
        console.log(`Chicago crime District ${JSON.stringify(chicagoCrimeDistrict,null,2)}`);
        chicagoCrimeCommunityArea = getTotalCrimesByCommunityArea(dataChicago);
        console.log(`Chicago crime CommunityArea ${JSON.stringify(chicagoCrimeCommunityArea,null,2)}`);


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

        
        // drawMap(dataChicagoJSON);        
        

      } catch (error) {
        console.log(error)
      }
}
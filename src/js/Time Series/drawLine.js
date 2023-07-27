import { Chart } from "chart.js/auto";
function drawTotalCrimeTimeSeries(totalCrimeAllYears){
  const allYears = Object.keys(totalCrimeAllYears); //2001 ...
  const totalCrimeByYear = [];
  // const labelnn = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050]
  
  Object.values(totalCrimeAllYears).forEach(currCrimesByYear=>{
    // console.log(currCrimesByYear)
    // console.log(Object.values(currCrimesByYear));
    totalCrimeByYear.push(Object.values(currCrimesByYear));
  })

  const allYearsInt = allYears.map(Number);
  const totalCrimeByYearInt = totalCrimeByYear.map(Number);
  // console.log(labelnn);
  console.log(allYears);
  console.log(allYearsInt);
  console.log(totalCrimeByYear);
  console.log(totalCrimeByYearInt);
  
  new Chart(document.getElementById("line-chart-crime"),{
    type: 'line',
    data: {
      labels: allYearsInt,
      datasets: 
      [
        {
        data: totalCrimeByYearInt,
        label: "Total Crimes",
        borderColor: "#3e95cd",
        fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Total crimes in Chicago City'
      }
    }

  })

  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
      datasets: [{ 
          data: [86,114,106,106,107,111,133,221,783,2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: [282,350,411,502,635,809,947,1402,3700,5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        }, { 
          data: [168,170,178,190,203,276,408,547,675,734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        }, { 
          data: [40,20,10,16,24,38,74,167,508,784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        }, { 
          data: [6,3,2,2,7,26,82,172,312,433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });


  (async function() {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
  
    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );
  })();

}

function drawTotalCrimeByTypesTimeSeries(totalCrimeByTypes){

  const allYears = Object.keys(totalCrimeByTypes);
  const allYearsInt = allYears.map(Number);

  // Object.values(totalCrimeByTypes).forEach(currCrimesByType=>{
    
  //   console.log(currCrimesByType)
  //   console.log(Object.values(currCrimesByType));
  //   const currVal = currCrimesByType.hasOwnProperty('THEFT') ? Object.values(currCrimesByType) : 0;
  //   console.log(currVal);
  //   // totalCrimeByYear.push(Object.values(currCrimesByType));
  // })

  // ["THEFT", "BATTERY", "CRIMINAL DAMAGE", "NARCOTICS", "ASSAULT"]

  const crimesByTheft = [];
  const crimesByBattery = [];
  const crimesByCriminalDamage = [];
  const crimesByNarcotics = [];
  const crimesByAssault = [];

  Object.keys(totalCrimeByTypes).forEach(year => {
    const yearData = totalCrimeByTypes[year];

    const valueTheft = yearData.hasOwnProperty('THEFT') ? yearData['THEFT'] : 0;
    const valueBattery = yearData.hasOwnProperty('BATTERY') ? yearData['BATTERY'] : 0;
    const valueCriminalDamage= yearData.hasOwnProperty('CRIMINAL DAMAGE') ? yearData['CRIMINAL DAMAGE'] : 0;
    const valueNarcotics = yearData.hasOwnProperty('NARCOTICS') ? yearData['NARCOTICS'] : 0;
    const valueAssault = yearData.hasOwnProperty('ASSAULT') ? yearData['ASSAULT'] : 0;
    crimesByTheft.push(valueTheft);
    crimesByBattery.push(valueBattery);
    crimesByCriminalDamage.push(valueCriminalDamage);
    crimesByNarcotics.push(valueNarcotics);
    crimesByAssault.push(valueAssault);
  });
  console.log(crimesByTheft)
  console.log(crimesByBattery)
  console.log(crimesByCriminalDamage)
  console.log(crimesByNarcotics)
  console.log(crimesByAssault)

  new Chart(document.getElementById("line-chart-crime-types"), {
    type: 'line',
    data: {
      labels: allYearsInt,
      datasets: [{ 
          data: crimesByTheft,
          label: "THEFT",
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: crimesByBattery,
          label: "BATTERY",
          borderColor: "#8e5ea2",
          fill: false
        }, { 
          data: crimesByCriminalDamage,
          label: "CRIMINAL DAMAGE",
          borderColor: "#3cba9f",
          fill: false
        }, { 
          data: crimesByNarcotics,
          label: "NARCOTICS",
          borderColor: "#e8c3b9",
          fill: false
        }, { 
          data: crimesByAssault,
          label: "ASSAULT",
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });


}


export{
  drawTotalCrimeTimeSeries,
  drawTotalCrimeByTypesTimeSeries
}
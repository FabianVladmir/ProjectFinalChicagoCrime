import { Chart } from "chart.js/auto";
import { getCrimeRate, getCrimeRateByYear,getDataTotal } from "../CrimeRate/getCrimeRate";

const btnBarChart = document.querySelector('#barChart');
btnBarChart.addEventListener('click', async () =>{
    const dataChicago = await getDataTotal(); 
    
    let rateCrime = await getCrimeRate("beat")

    console.log("Desde BarChart");
    // console.log(dataChicago);
    // console.log(btnBarChart);
    console.log(rateCrime);
    console.log(rateCrime[113]);
    console.log(Object.keys(rateCrime[113]));
    console.log(Object.values(rateCrime[113]));

    const dataLabels = Object.keys(rateCrime[113]);
    const dataValues = Object.values(rateCrime[113]);
    
    const ctx = document.getElementById('barChartHorizontal').getContext('2d');
    const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dataLabels,
        datasets: [{
        label: 'Easy as',
        data: dataValues,
        }],
    },
    options: {
        indexAxis: 'y', // <-- here
        responsive: true
    }
    });

    
    // console.log(totalCrimeTypeByRegion);
});

let chart;

let chart2;
function drawTopCrimesTypesBarChart(data,boundariesCurrent, numLocal, sumTotal){
    
    console.log("DATA REAL");
    console.log(numLocal);
    console.log(sumTotal);
    console.log(boundariesCurrent);
    console.log(data);

    const dataArray = Object.entries(data);

    dataArray.sort((a, b) => b[1] - a[1]);

    const top5 = dataArray.slice(0, 5);

    const top5Dictionary = Object.fromEntries(top5);

    const dataLabels = Object.keys(top5Dictionary);
    const dataValues = Object.values(top5Dictionary);
    
    const ctx = document.getElementById('barChartHorizontal').getContext('2d');
    
    if(chart){
        chart.destroy();
    }
    chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dataLabels,
        datasets: [{
            label: `AREA: ${boundariesCurrent} - ZONA: ${numLocal} - TOTAL DELITOS:${sumTotal} `,
            data: dataValues,
            backgroundColor: [
                'rgba(255, 26, 104, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 26, 104, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ]
        }],
    },
    options: {
        indexAxis: 'y', // <-- here
        responsive: false
    }
    });

}

function drawMultipleBarChart(data,boundariesCurrent ){
    var densityCanvas = document.getElementById("densityChart");

    const dataLabels = Object.keys(data);
    const dataValues = Object.values(data);


    console.log(dataLabels)
    console.log(dataValues)
    // Chart.defaults.global.defaultFontFamily = "Lato";
    // Chart.defaults.global.defaultFontSize = 18;
    if(chart2){
        chart2.destroy();
    }
    var densityData = {
        label: 'THEFT',
        data: [5427, 5243, 5514, 3933, 1326, 687],
        backgroundColor: 'rgba(255, 26, 104, 0.2)',
        borderColor: 'rgba(255, 26, 104, 1)',
        yAxisID: "y-axis-density"
    };
    
    var gravityData = {
        label: 'BATTERY',
        data: [40, 50, 10, 37, 51, 87],
        backgroundColor: 'rgba(99, 132, 0, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        yAxisID: "y-axis-gravity"
    };
    
    var CriminalDamage = {
        label: 'CRIMINAL DAMAGE',
        data: [37, 89, 98, 37, 231, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        yAxisID: "y-axis-gravity"
    };
    

    var planetData = {
        labels: ["1", "2", "4", "5", "6", "7"],
        datasets: [densityData, gravityData,CriminalDamage]
    };
    
    var chartOptions = {
    scales: {
        xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.6
        }],
        yAxes: [{
        id: "y-axis-density"
        }, {
        id: "y-axis-gravity"
        }]
    }
    };
    
    chart2 = new Chart(densityCanvas, {
    type: 'bar',
    data: planetData,
    options: chartOptions
    });

}

export {
    drawTopCrimesTypesBarChart,
    drawMultipleBarChart
}
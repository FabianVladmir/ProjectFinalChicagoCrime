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
function drawTopCrimesTypesBarChart(data,boundariesCurrent, numLocal, sumTotal){
    
    console.log(numLocal);
    console.log(sumTotal);
    console.log(boundariesCurrent);


    const dataLabels = Object.keys(data);
    const dataValues = Object.values(data);
    
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

export {
    drawTopCrimesTypesBarChart
}
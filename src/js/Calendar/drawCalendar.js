
import 
{ countCrimesPerYear, countCrimesPerYearBySpecificCrime,countCrimesPerYearByRegion, counterCrimePerMounthBySpecificCrime,countCrimesPerMonth, extractTotalCrimesPerHour, extractTotalCrimesPerHourV2} 
from '../Time Series/functionsTimeSeries';

import {getCrimeRate, getCrimeRateByYear, getDataTotal} from "../CrimeRate/getCrimeRate"

import {calendarHeatmap} from "./src/calendar-heatmap"

// import { drawMapByBoundaries } from "../drawMap/drawMapSpatialByBoundaries";

import { drawMapByBoundaries } from "../drawMap/drawMapSpatialByBoundaries";

import { drawMapGeneral } from "../drawMap/drawMapSpatialGeneral";


(async function () {
    // Initialize random data for the demo
    const dataChicago = await getDataTotal();
    // const dataByHour = extractTotalCrimesPerHour(dataChicago);
    const dataByHourV2 = extractTotalCrimesPerHourV2(dataChicago);
    console.log("data Calendar:", dataByHourV2);
    // Set the div target id
    var div_id = 'showCalendar';

    // Set custom color for the calendar heatmap
    var color = '#cd2327';

    // Set overview type (choices are year, month and day)
    var overview = 'global';

    // Handler function
    // var print = function (val) {
    //   console.log(val);
    // };

    // Initialize calendar heatmap
    calendarHeatmap.init(dataByHourV2, div_id, color, overview, print,drawMapByBoundaries,drawMapGeneral);
  })();

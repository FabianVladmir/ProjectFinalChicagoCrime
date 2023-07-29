import {getTotalCrimesByBeat, getTotalCrimesByCommunityArea, getTotalCrimesByWard, getTotalCrimesByDistrict, sortObjectEntries} from '../functions' // function  filter by beats, ward, district, and community area 
import {fetchDataChicago, fetchDataChicagoByYear} from '../APIChicagoCrime'; // to download chicago data

export async function getCrimeRateByYear(byLocation,byYear){
  
    try {
        var dataChicagoYear = await fetchDataChicagoByYear(parseInt(byYear));        
    } catch (error) {
        console.log(error)
    } finally {
        console.log(`Cantidad de dato chicago en años ${JSON.stringify(dataChicagoYear,null,2)}`);
    }
    
    let chicagoCrimebyLocation = {};

    switch (byLocation) {
        case "beat":
            chicagoCrimebyLocation = getTotalCrimesByBeat(dataChicagoYear);
            break;
        case "ward":
            chicagoCrimebyLocation = getTotalCrimesByWard(dataChicagoYear);
            break;
        case "district":
            chicagoCrimebyLocation = getTotalCrimesByDistrict(dataChicagoYear);
            break;
        case "community_area":
            chicagoCrimebyLocation = getTotalCrimesByCommunityArea(dataChicagoYear);
            break;
        default:
            break;
    }

    return chicagoCrimebyLocation;
}

export async function getCrimeRate(byLocation){
    try {
        var dataChicago = await fetchDataChicago();
    } catch (error) {
        console.log(error)
    } finally {
        console.log(`Cantidad de dato chicago del 2001 al 2023 ${JSON.stringify(dataChicago,null,2)}`);
    }
    
    let chicagoCrimebyLocation = {};

    switch (byLocation) {
        case "beat":
            chicagoCrimebyLocation = getTotalCrimesByBeat(dataChicago);
            break;
        case "ward":
            chicagoCrimebyLocation = getTotalCrimesByWard(dataChicago);
            break;
        case "district":
            chicagoCrimebyLocation = getTotalCrimesByDistrict(dataChicago);
            break;
        case "community_area":
            chicagoCrimebyLocation = getTotalCrimesByCommunityArea(dataChicago);
            break;
        default:
            break;
    }

    return chicagoCrimebyLocation;
}
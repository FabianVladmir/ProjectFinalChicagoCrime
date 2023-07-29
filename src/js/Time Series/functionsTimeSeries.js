function countCrimesPerYear(data) {
  // Initialize an object to store the total crimes per year
  const totalCrimesPerYear = {};

  // Iterate through each object in the data
  Object.values(data).forEach(crimeObj => {
    // Extract the year from the current object
    const {year} = crimeObj;

    // If the year is not already in the object, add it with a count of 1
    if (!totalCrimesPerYear.hasOwnProperty(year)) {
      totalCrimesPerYear[year] = 1;
    } else {
      // If the year is already in the object, increment the count by 1
      totalCrimesPerYear[year]++;
    }
  });

  // Create the final result object with the desired structure
  const result = {};
  Object.keys(totalCrimesPerYear).forEach(year => {
    result[year] = { 'Total_crimes': totalCrimesPerYear[year] };
  });

  return result;
}


function getSpecificCrime(data, typeCrime){
  const result = {};
  // Object.values(data).forEach(currCrimeObj => {
  //   if(currCrimeObj[primary_type])
  // })
}


function counterCrimePerMounthBySpecificCrime(data) {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };

  const result = {};

  // Initialize the result object with the specified structure for each year and primary type
  for (let year = 2001; year <= 2023; year++) {
    result[year] = {};

    // Filter primary types of interest
    const primaryTypesOfInterest = ["THEFT", "BATTERY", "CRIMINAL DAMAGE", "NARCOTICS", "ASSAULT"];

    primaryTypesOfInterest.forEach(primaryType => {
      result[year][primaryType] = {};
      Object.values(months).forEach(monthName => {
        result[year][primaryType][monthName] = 0;
      });
    });
  }

  // Filter primary types of interest
  const primaryTypesOfInterest = ["THEFT", "BATTERY", "CRIMINAL DAMAGE", "NARCOTICS", "ASSAULT"];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const crimeObj = data[key];
      const year = parseInt(crimeObj['year']);
      const date = new Date(crimeObj['date']);
      const month = months[("0" + (date.getMonth() + 1)).slice(-2)];
      const primaryType = crimeObj['primary_type'];

      // Check if the primary type is of interest
      if (primaryTypesOfInterest.includes(primaryType)) {
        // Increment the count for the primary type and month
        result[year][primaryType][month]++;
      }
    }
  }
  return result; 

}




function countCrimesPerMonth(data) {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };

  const result = {};

  // Initialize the result object with the specified structure for each year
  for (let year = 2001; year <= 2023; year++) {
    result[year] = {
      'January': 0,
      'February': 0,
      'March': 0,
      'April': 0,
      'May': 0,
      'June': 0,
      'July': 0,
      'August': 0,
      'September': 0,
      'October': 0,
      'November': 0,
      'December': 0
    };
  }

  // Iterate through each object in the data
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const crimeObj = data[key];
      const year = parseInt(crimeObj['year']);
      const date = new Date(crimeObj['date']);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      result[year][months[month]]++;
    }
  }

  return result;
}



function countCrimesPerYearBySpecificCrime(data) {
  // Initialize an object to store the total crimes per year for each primary type
  const totalCrimesPerYearByType = {};

  // Specify the primary types of interest
  const mostFrequentCrimes = ["THEFT", "BATTERY", "CRIMINAL DAMAGE", "NARCOTICS", "ASSAULT"];  

  // Iterate through each object in the data
  Object.values(data).forEach(crimeObj => {
    // const year = parseInt(crimeObj['year']);
    // const primaryType = crimeObj['primary_type'];
    const {year, primary_type} = crimeObj;   

    // Only consider the primary types of interest
    if (mostFrequentCrimes.includes(primary_type)) {
      // If the year is not already in the object, add it with the primary type and count of 1
      if (!totalCrimesPerYearByType.hasOwnProperty(year)) {
        totalCrimesPerYearByType[year] = { [primary_type]: 1 };
      } else {
        // If the year is already in the object, increment the count for the primary type by 1
        if (!totalCrimesPerYearByType[year].hasOwnProperty(primary_type)) {
          totalCrimesPerYearByType[year][primary_type] = 1;
        } else {
          totalCrimesPerYearByType[year][primary_type]++;
        }
      }
    }
  });
  // console.log(totalCrimesPerYearByType);
  return totalCrimesPerYearByType;
}


function countCrimesPerYearByRegion(data,region) {
  // Initialize an object to store the total crimes per year for each primary type
  const totalCrimesPerYearByType = {};

  // Specify the primary types of interest
  const mostFrequentCrimes = ["THEFT", "BATTERY", "CRIMINAL DAMAGE", "NARCOTICS", "ASSAULT"];  
  console.log(data);
  // Iterate through each object in the data
  Object.values(data).forEach(crimeObj => {
    // const year = parseInt(crimeObj['year']);
    // const primaryType = crimeObj['primary_type'];
    const {year, primary_type, district, beat, ward, community_area} = crimeObj;   

    // console.log("data crime: ", year,primary_type,district);
    if (region === "district" ) {
      if (mostFrequentCrimes.includes(primary_type)) {
        // If the year is not already in the object, add it with the primary type and count of 1
        if (!totalCrimesPerYearByType.hasOwnProperty(year)) {
          totalCrimesPerYearByType[year] = { [parseInt(district)]: "" };
          totalCrimesPerYearByType[year][parseInt(district)] = {[primary_type]: 1}
        
          // if (parseInt(year) == 2018) {
          //   console.log(parseInt(district));
          //   console.log(primary_type); 
          // }
        }else{
          // if (parseInt(year) == 2018 && parseInt(district) == 1) {
          //   console.log("tiene los delitos: ",primary_type); 
          // }
          if (!totalCrimesPerYearByType[year].hasOwnProperty(parseInt(district))) {    
            totalCrimesPerYearByType[year][parseInt(district)] = { [primary_type]: 1 };
          }else{
            if (!totalCrimesPerYearByType[year][parseInt(district)].hasOwnProperty(primary_type)) {
              totalCrimesPerYearByType[year][parseInt(district)][primary_type] = 1;
            } else {
              totalCrimesPerYearByType[year][parseInt(district)][primary_type]++;
            } 
          }
        }      
      }
    }
    // Only consider the primary types of interest
    
  });
  // console.log("totalCrimesPerYearByType: ", totalCrimesPerYearByType);
  return totalCrimesPerYearByType;
}

export {
    countCrimesPerYear,
    getSpecificCrime,
    countCrimesPerMonth,
    countCrimesPerYearBySpecificCrime,
    countCrimesPerYearByRegion,
    counterCrimePerMounthBySpecificCrime
}
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

  

export {
    countCrimesPerYear,
    getSpecificCrime,
    countCrimesPerYearBySpecificCrime
}
function countCrimesPerYear(data) {
    // Initialize an object to store the total crimes per year
    const totalCrimesPerYear = {};
  
    // Iterate through each object in the data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const crimeObj = data[key];
        // Extract the year from the current object
        const year = parseInt(crimeObj['year']);
  
        // If the year is not already in the object, add it with a count of 1
        if (!totalCrimesPerYear.hasOwnProperty(year)) {
          totalCrimesPerYear[year] = 1;
        } else {
          // If the year is already in the object, increment the count by 1
          totalCrimesPerYear[year]++;
        }
      }
    }
  
    // Create the final result object with the desired structure
    const result = {};
    for (const year in totalCrimesPerYear) {
      if (totalCrimesPerYear.hasOwnProperty(year)) {
        result[year] = { 'Total_crimes': totalCrimesPerYear[year] };
      }
    }
  
    return result;
  }
  

  export {
     countCrimesPerYear
  }
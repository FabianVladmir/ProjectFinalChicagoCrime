
const mostFrequentCrimes = ["THEFT", "BATTERY", "CRIMINAL DAMAGE","NARCOTICS", "ASSAULT"];

function getTotalCrimesByBeat (data) {   
    const result = {};
    data.forEach(currCrime => {   
      const {primary_type, beat} = currCrime;
      const num = parseInt(beat);
      if (!result[num]) {
        result[num] = {};
      }
      
      if (!result[num][primary_type]) {
        result[num][primary_type] = 1;
      } else {
        result[num][primary_type]++;
      }
    });
    // console.log(result);
    return result;

}

function getTotalCrimesByWard (data) {
    const result = {};
    data.forEach(currCrime => {   
      const {primary_type, ward} = currCrime;
      const num = parseInt(ward);
      if (!result[num]) {
        result[num] = {};
      }
      
      if (!result[num][primary_type]) {
        result[num][primary_type] = 1;
      } else {
        result[num][primary_type]++;
      }
    });
    // console.log(result);
    return result;
}

function getTotalCrimesByDistrict (data) {
    const result = {};
    data.forEach(currCrime => {   
      const {primary_type, district} = currCrime;
      const num = parseInt(district);
      
      if (!result[num]) {
        result[num] = {};
      }
      
      if (!result[num][primary_type]) {
        result[num][primary_type] = 1;
      } else {
        result[num][primary_type]++;
      }
    });
    // console.log(result);
    return result;
}

function getTotalCrimesByCommunityArea (data) {
    const result = {};
    data.forEach(currCrime => {
      const {primary_type, community_area} = currCrime;
      const num = parseInt(community_area)
      if (!result[num]) {
        result[num] = {};
      }
      
      if (!result[num][primary_type]) {
        result[num][primary_type] = 1;
      } else {
        result[num][primary_type]++;
      }
    });
    // console.log(result);
    return result;
}



function sortObjectEntries(data, n) {
  // Loop through each object in data
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // Convert the object into an array of key-value pairs
      const entries = Object.entries(data[key]);

      // Sort the array based on the values in descending order
      entries.sort((a, b) => b[1] - a[1]);

      // Create a new object to store the sorted entries up to the limit 'n'
      const sortedObj = {};
      for (let i = 0; i < n && i < entries.length; i++) {
        sortedObj[entries[i][0]] = entries[i][1];
      }

      // Replace the original object with the sorted one
      data[key] = sortedObj;
    }
  }

  return data;
}

function getTotalCrimesByLocationByDistrict (data,name) {
  return data.filter((elem) => elem.district == parseInt(name))
}

function getTopRegionsCrimes(data, n) {
  const result = {};

  // Create an array of objects containing the region and its total crimes
  const regionsData = Object.entries(data).map(([key, value]) => ({
    region: key,
    totalCrimes: Object.values(value).reduce((acc, val) => acc + val, 0),
  }));

  // Sort the array based on totalCrimes in descending order
  regionsData.sort((a, b) => b.totalCrimes - a.totalCrimes);

  // Take the top 'n' regions from the sorted array and store them in the result object
  for (let i = 0; i < n && i < regionsData.length; i++) {
    const regionKey = regionsData[i].region;
    result[regionKey] = data[regionKey];
  }

  return result;
}


// function sortObjectEntries(obj, n) {
   
//     let sortedList = Object.entries(obj).sort((a,  b)=>  {
        
//         // console.log(a[0]); // indice        

//         const objA = a[1];
//         const objB = b[1];  
        
        // const objeASort = Object.entries(objA).sort((key,value) =>{
        //   // console.log(key);
        //   // console.log(value);
        // });
        // const objeBSort = Object.entries(objB).sort();        

        // console.log(objeASort)        
        // console.log(objeBSort)        
        
        // return Object.values(objB) - Object.values(objA).map(el=>el[0]).slice(0,n);        
    // })

    // console.log(sortedList);
    
    // const sortedList = obj => {
    //     const sortedValues = [], res = {};
    //     Object.keys(obj).forEach(key => {
    //         return sortedValues[obj[key][1] - 1] = key;
    //     })
    //     sortedValues.forEach(key => {
    //         res[key] = sortedValues[key]
    //     });

    //     console.log(res);
    //     return res
    // }

    // const sorted = Object.entries(obj)
    //     .sort(([,a],[,b]) => a.value - b.value)
    //     .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    // console.log(sorted);
    // console.log(sortedList[0][1]);
    // console.log(sortedList[1][1]);

    


    // let sortedList = Object.entries(obj).sort((a, b) => {
    //   const objA = a[1];
    //   const objB = b[1];
  
    //   const sumA = Object.values(objA).reduce((acc, value) => acc + value, 0);
    //   const sumB = Object.values(objB).reduce((acc, value) => acc + value, 0);
  
    //   if (sumB > sumA) return 1;
    //   else if (sumB < sumA) return -1;
    //   else {
    //     if (a[0] > b[0]) return 1;
    //     else if (a[0] < b[0]) return -1;
    //     else return 0;
    //   }
    // });
  
    // // Return first n keys from sortedList
    // return sortedList.map(el => el[0]).slice(0, n);
  // }
  

 
export{
    getTotalCrimesByBeat,
    getTotalCrimesByWard,
    getTotalCrimesByCommunityArea,
    getTotalCrimesByDistrict,
    getTotalCrimesByLocationByDistrict,
    sortObjectEntries,
    getTopRegionsCrimes
}

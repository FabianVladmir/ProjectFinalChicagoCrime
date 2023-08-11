export function rawDataToDateByDay(rawData) {

  // console.log("raw Data: ", rawData);
  var now = moment().endOf('day').toDate();
  var time_ago = moment().startOf('day').year(2001).month(0).date(1).hour(19).toDate(); // Usamos year(2011) para el año, month(3) para abril (0-indexed), date(1) para el día y hour(19) para la hora.
  var listByHour = d3.timeDays(time_ago, now);

  
  const sameDateList = rawData.reduce((dataAccumulator,dataCurrentValue) => {
    
    // console.log("dataCurrentValue: ", dataCurrentValue);
    const dataFormaterList = dataCurrentValue.reduce((accumulator,currentValue) => {
      
      const dateOnly = currentValue.date.slice(0, 10);
      // console.log(dateOnly);
      const parser = d3.timeParse("%Y-%m-%d");
      const dataObject = parser(dateOnly);
      const formatter = d3.timeFormat("%a %b %d %Y %H:%M:%S GMT%Z (hora estándar de Colombia)");
      
      const fechaFormated = formatter(dataObject);

      if (!accumulator[fechaFormated]) {
          accumulator[fechaFormated] = []
      }
      const momentObj = moment(currentValue.date);
      const formattedDate = momentObj.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ") + " (hora estándar de Colombia)";
      
      accumulator[fechaFormated].push({
          0:currentValue.primary_type,
          1:new Date(formattedDate),
      })
      return accumulator;
    },{});

    console.log("dataFormaterList: ", dataFormaterList);

    var example_data = listByHour.map(function (dateElement, index) {
      
      if(dataFormaterList.hasOwnProperty(dateElement)) {
        // console.log("dataFormaterList[dateElement]: ", dataFormaterList[dateElement]);  
        
        const objSummary = Object.entries(dataFormaterList[dateElement].reduce((accumulator, currentValue) => {
          const name = currentValue[0];
          accumulator[name] = (accumulator[name] || 0) + 1;
          return accumulator;
        }, {})).map(([name, value]) => ({ name, value }));
        
        const tavg =objSummary.reduce((accumulator,currentValue) => {
            return accumulator + currentValue.value;
          },0);

        const tmax =  objSummary.reduce((maxValue, currentValue) => {
          return (currentValue.value > maxValue) ? currentValue.value : maxValue;
        },0);

        return {
          'DATE': dateElement,
          'TAVG': tavg,
          'TMAX': tmax,
          'TMIN': 1,
        }    
      }
      return {
        
        'DATE': dateElement,
        'TAVG': 0,
        'TMAX': 0,
        'TMIN': 0
      }
    });
  
    example_data['columns'] = ['DATE', 'TAVG', 'TMAX', 'TMIN']
    dataAccumulator.push(example_data);

    return dataAccumulator;
  },[]);

  // console.log("same Date: ", sameDateList);


  return sameDateList;
}
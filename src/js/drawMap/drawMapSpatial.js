import * as d3 from "d3";
import name_value from "./listBoundaries";

var svg = d3.select(".map")
            .append("svg")
            .attr('width', 1400)
            .attr('height', 550)

const onChangeSelect = async (event) => {
    let boundariesCurrent = event.target.value;
    console.log(boundariesCurrent);
    await drawMap(boundariesCurrent);
  }
  
  
const selectChicagoMap = document.querySelector('#selectMap');
selectChicagoMap.addEventListener('change', onChangeSelect);


const drawMap =  async (boundariesCurrent) => {
    // await getMap(boundariesCurrent)
    try {
        let currData;
        let selectString = name_value[boundariesCurrent];

        await fetch(`src/maps/${selectString}`)
          .then(response => response.json())
          .then(data => {
            currData = data;
          })
          .catch(error => {
            throw new Error('Error al cargar el archivo JSON: ' + error);
          });
        const {features} = currData;
        // console.log("datos : ",features);

        // console.log("datos : ",typeof features);
        
        const coordinatesList = features.map((element)=>{
          const {geometry: {coordinates}, properties} = element ?? {};
          return coordinates;
        });
        
        const maxMinXY = coordinatesList.reduce((accumulator, currentValue) => {
          
          currentValue.forEach(element => {
            element.forEach(coordinates => {
              coordinates.forEach(value => {
                if (value[0] > accumulator?.X[1]){
                  accumulator.X[1] = value[0];
                }
                if (value[0] < accumulator?.X[0]){
                  accumulator.X[0] = value[0];
                }
                if (value[1] > accumulator?.Y[1]){
                  accumulator.Y[1] = value[1];
                }
                if (value[1] < accumulator?.Y[0]){
                  accumulator.Y[0] = value[1];
                }
              })
            });
          });
          return accumulator
        }, {'X': [0,-999], 'Y': [999,-999]})
      
        var x = d3.scaleLinear().range([0, 1000]);
        var x2 = d3.scaleLinear().range([800, 1800]);
        var y = d3.scaleLinear().range([1350, 50]);

        // x.domain([-88, -87]);
        // x2.domain([-88, -87]);
        // y.domain([41, 42]);
        maxMinXY.X[0] = Math.floor(maxMinXY.X[0]);
        maxMinXY.X[1] = Math.ceil(maxMinXY.X[1]);
        maxMinXY.Y[0] = Math.floor(maxMinXY.Y[0]);
        maxMinXY.Y[1] = Math.floor(maxMinXY.Y[1]);
        
        console.log(maxMinXY);

        x.domain(maxMinXY.X ?? [-88, -87]);
        x2.domain(maxMinXY.X ?? [-88, -87]);
        y.domain(maxMinXY.Y ?? [41, 42]);
        
        //each boundaries
        for (var i = 0; i < coordinatesList.length; i++) {
          //some boundaries contain more coordinates for example 3 beats belong to a district
          for (var j = 0; j < coordinatesList[i].length; j++){
            //total of polygon
            for (let k = 0; k < coordinatesList[i][j].length; k++) {
              svg.append("polygon").data([coordinatesList[i][j][k]])
              .attr("points", function (d) {
                  return d.map(function (d) {
                      return [x(d[0]), y(d[1])].join(",");
                  }).join(" ");
              })
              .attr('stroke-width', 1.5)
              .attr("fill", '#D0D0D0')
              .attr("stroke", 'white');
              
            }
          }
        }
    } catch (error) {
      console.error(error);
    }
    
    // console.log("data_Map");
}

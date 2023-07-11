export function drawMap(dataChicagoJSON) {
    console.log(dataChicagoJSON)
    // Set the width and height of the map
    const width = 800;
    const height = 600;

    // Create an SVG element to contain the map
    const svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Load the GeoJSON data file
    d3.json(dataChicagoJSON).then(function(data) {
        // Create a projection for Chicago using Albers USA
        const projection = d3.geoAlbersUsa()
            .fitSize([width, height], data);

        // Create a path generator
        const path = d3.geoPath()
            .projection(projection);

        // Draw the map
        svg.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "lightblue")
            .style("stroke", "white")
            .style("stroke-width", 1);
    });
}






//** d3 */
export var svg = d3.select(".map")
            .append("svg")
            .attr('width', 1400)
            .attr('height', 550)
            .attr('transform', `translate(${100}, ${0})`) // Centrar el svg

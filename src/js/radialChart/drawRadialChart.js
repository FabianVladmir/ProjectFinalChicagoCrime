
export function drawRadialByYear(rawdata,year) {
    
    const data = rawdata.map(list => {
        
        return Array.from(d3.rollup(
        list, 
        v => ({
          date: new Date(Date.UTC(year, v[0].DATE.getUTCMonth(), v[0].DATE.getUTCDate())),
          avg: d3.mean(v, d => d.TAVG+1 * 5.5 || NaN),
          min: d3.mean(v, d => d.TMIN+2 * 2.5 || NaN),
          max: d3.mean(v, d => d.TMAX+1 * 7.5 || NaN)
        }), 
        d => `${d.DATE.getUTCMonth()}-${d.DATE.getUTCDate()}`
      ).values())
        .sort((a, b) => d3.ascending(a.date, b.date))
        }
    )

    console.log("data of radial funciton", data);
    const width = 686;
    const height = 686;
    const margin  = 10;
    const innerRadius = width/5;
    const outerRadius = width/2 - margin;

    const x = d3.scaleUtc()
        .domain([Date.UTC(year, 0, 1), Date.UTC(year + 1, 0, 1) - 1])
        .range([0, 2 * Math.PI])
    const y = d3.scaleLinear()
        .domain([d3.min(d3.merge(data), d => d.min), d3.max(d3.merge(data), d => d.max)])
        .range([innerRadius, outerRadius])

    // const xAxis = g => g
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", 10)
    //     .call(g => g.selectAll("g")
    //     .data(x.ticks())
    //     .join("g")
    //         .each((d, i) => d.id = DOM.uid("month"))
    //         .call(g => g.append("path")
    //             .attr("stroke", "#000")
    //             .attr("stroke-opacity", 0.2)
    //             .attr("d", d => `
    //             M${d3.pointRadial(x(d), innerRadius)}
    //             L${d3.pointRadial(x(d), outerRadius)}
    //             `))
    //         .call(g => g.append("path")
    //             .attr("id", d => d.id.id)
    //             .datum(d => [d, d3.utcMonth.offset(d, 1)])
    //             .attr("fill", "none")
    //             .attr("d", ([a, b]) => `
    //             M${d3.pointRadial(x(a), innerRadius)}
    //             A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(x(b), innerRadius)}
    //             `))
    //         .call(g => g.append("text")
    //         .append("textPath")
    //             .attr("startOffset", 6)
    //             .attr("xlink:href", d => d.id.href)
    //             .text(d3.utcFormat("%B"))))
    
    const xAxis = g => g
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .call(g => g.selectAll("g")
    .data(x.ticks())
    .join("g")
        .each((d, i) => d.id = "month-" + i) // Cambiamos esto para asignar un ID único
        .call(g => g.append("path")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .attr("d", d => `
            M${d3.pointRadial(x(d), innerRadius)}
            L${d3.pointRadial(x(d), outerRadius)}
            `))
        .call(g => g.append("path")
            .attr("id", d => d.id)
            .datum(d => [d, d3.utcMonth.offset(d, 1)])
            .attr("fill", "none")
            .attr("d", ([a, b]) => `
            M${d3.pointRadial(x(a), innerRadius)}
            A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(x(b), innerRadius)}
            `))
        .call(g => g.append("text")
        .append("textPath")
            .attr("startOffset", 6)
            .attr("xlink:href", d => "#" + d.id) // Cambiamos esto para usar el ID directamente
            .text(d => d3.utcFormat("%B")(d)))) // Formateamos el mes usando d3.utcFormat("%B")

    const yAxis = g => g
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .call(g => g.selectAll("g")
        .data(y.ticks(3).reverse())
        .join("g")
            .attr("fill", "none")
            .call(g => g.append("circle")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.2)
                .attr("r", y))
            .call(g => g.append("text")
                .attr("y", d => -y(d))
                .attr("dy", "0.15em")
                .attr("stroke", "#fff")
                .attr("stroke-width", 5)
                .text((x, i) => `${x.toFixed(0)}${i ? "" : " Incidencias"}`)
            .clone(true)
                .attr("y", d => y(d))
            .selectAll(function() { return [this, this.previousSibling]; })
            .clone(true)
                .attr("fill", "currentColor")
                .attr("stroke", "none")))
        
        const line = d3.lineRadial()
            .curve(d3.curveLinearClosed)
            .defined(d => !isNaN(d.avg))
            .angle(d => x(d.date))
            .radius(d => y(d.avg))

        const area = d3.areaRadial()
            .curve(d3.curveLinearClosed)
            .defined(d => !isNaN(d.min) && !isNaN(d.max))
            .angle(d => x(d.date))
            .innerRadius(d => y(d.min))
            .outerRadius(d => y(d.max))
        
    /**draw  */
    const chartRadial = d3.select("#chart-radial");
    const existingSvg = chartRadial.select("svg");

    if (existingSvg.size() > 0) {
        existingSvg.remove();
    }

    const svgF = chartRadial
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round");

    const colors = [];
    for (let i = 0; i < data.length; i++) {
        const colorale = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
        }
        const color = `rgb(${colorale.r}, ${colorale.g}, ${colorale.b})`;

        colors.push(color);
    }
    const airports = svgF.selectAll("g")
        .data(data)
        .enter()
        .append("g");

    airports.append("path")
        .attr("fill", (d,i) => colors[i])
        .attr("fill-opacity", 0.2)
        .attr("d", area);

    airports.append("path")
        .attr("fill", "none")
        .attr("stroke", (d,i) => colors[i])
        .attr("stroke-width", 1.5)
        .attr("d", line);

    svgF.append("g")
        .call(xAxis);

    svgF.append("g")
        .call(yAxis);
    svgF.node()

}
function drawChart() {
    d3.selectAll("svg > *").remove();

    const letters = document.getElementById("inputLetters").value.toUpperCase().split('');
    const letterCounts = {};

    letters.forEach(letter => {
        if(!letterCounts[letter]) {
            letterCounts[letter] = 1;
        } else {
            letterCounts[letter]++;
        }
    });

    const svgWidth = window.innerWidth * 0.7;
    const svgHeight = window.innerHeight * 0.7;
    const chartWidth = svgWidth * 0.8;
    const chartHeight = svgHeight * 0.8;
    const margin = {
        top: svgHeight * 0.1,
        right: svgWidth * 0.1,
        bottom: svgHeight * 0.1,
        left: svgWidth * 0.1
    };

    const x = d3.scaleBand()
        .range([margin.left, chartWidth - margin.right])
        .padding(0.1)
        .domain(Object.keys(letterCounts));

    const y = d3.scaleLinear()
        .range([chartHeight - margin.bottom, margin.top])
        .domain([0, d3.max(Object.values(letterCounts))]);

    const svg = d3.select("#chart")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const chart = svg.append("g");

    const bars = chart.selectAll(".bar")
        .data(Object.entries(letterCounts))
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d[0]))
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => chartHeight - margin.bottom - y(d[1]))
        .attr("width", x.bandwidth());

    const textLabels = chart.selectAll(".textLabel")
        .data(Object.entries(letterCounts))
        .join("text")
        .attr("class", "textLabel")
        .attr("x", (d) => x(d[0]) + x.bandwidth() / 2)
        .attr("y", (d) => y(d[1]) + 15)
        .text((d) => `${d[0]}: ${d[1]}`);

    const xAxis = chart.append("g")
        .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
        .call(d3.axisBottom(x));

    const yAxis = chart.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y));
}

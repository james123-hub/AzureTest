const form = document.querySelector("form");
const lettersInput = document.querySelector("#letters-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const letters = lettersInput.value.trim(); // 获取用户输入的字母，去除首尾空格
  const count = letters.split("").reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});
  const data = Object.keys(count).map((letter) => {
    return {
      letter,
      count: count[letter],
    };
  });

  // 创建饼图及渲染
  const width = window.innerWidth * 0.8; // 定义饼图的宽度
const height = window.innerHeight * 0.8; // 定义饼图的高度
const radius = Math.min(width, height) / 2; // 计算饼图的半径
const colors = d3.schemeCategory10; // 定义颜色

const svg = d3
  .select("#pie-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

const pie = d3
  .pie()
  .value((d) => d.count)
  .sort(null);

const path = d3.arc().outerRadius(radius - 10).innerRadius(0);

const label = d3
  .arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);

const arc = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

arc
  .append("path")
  .attr("d", path)
  .attr("fill", (d, i) => colors[i % colors.length]);

arc
  .append("text")
  .attr("transform", (d) => `translate(${label.centroid(d)})`)
  .attr("dy", "0.35em")
  .text((d) => `${d.data.letter}: ${d.data.count}`)
  .style("text-anchor", "middle");
});

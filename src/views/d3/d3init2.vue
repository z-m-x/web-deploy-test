<template>
  <div class="scale">
    <svg id="myD3" width="1000" height="800" />
  </div>
</template>

<script>
let data = [
  { name: "das", value: 22 },
  { name: "et", value: 12 },
  { name: "fsf", value: 33 },
  { name: "ajr", value: 7 },
  { name: "rfv", value: 16 },
  { name: "pou", value: 19 },
  { name: "alo", value: 38 },
];
export default {
  name: "d3init2",
  mounted() {
    const d3 = window.d3;
    const svg = d3.select("#myD3");
    let margin = { top: 100, right: 200, bottom: 100, left: 200 };
    let svgWidth = +svg.attr("width");
    let svgHeight = +svg.attr("height");
    let innerWidth = svgWidth - margin.left - margin.right; //图表载体宽度
    let innerHeight = svgHeight - margin.top - margin.bottom;
    /* 定义x y 轴并映射 */
    let xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])
      .range([0, innerWidth]); //domain 数据范围 range 像素范围
    let yScale = d3
      .scaleBand()
      .domain(data.map((item) => item.name))
      .range([0, innerHeight]);

    /* 创建图表承载容器留出边距 */
    let g = svg
      .append("g")
      .attr("id", "maingroup")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    /*创建左边y轴 并把定义的y轴传入*/
    let yAxis = d3.axisLeft(yScale);
    /* 创建一个组装载y轴呈现 */
    g.append("g").call(yAxis);
    /* 创建x轴,并把定义的x轴传入 */
    let xAxis = d3.axisBottom(xScale);
    g.append("g").call(xAxis).attr("transform", `translate(0,${innerHeight})`);
    /* 设定长方形柱子 */
    g.selectAll("rect") //表示所有rect被暂定选中
      .data(data) //绑定数据
      .enter() //获取到没有绑定上的数据
      .append("rect") //添加和数据相同个数的长方形元素
      .attr("width", (data) => xScale(data.value)) //给每个rect添加线性比例尺宽度
      .attr("height", yScale.bandwidth() - 10) //给每个rect添加以条带比例尺宽度相当的高度
      .attr("y", (data, i) => i * yScale.bandwidth()); //给每个元素设置y轴位置

    // data.forEach((item) => {
    //   g.append("rect")
    //     .attr("width", xScale(item.value)) //把具体的值通过xScale映射到x轴
    //     .attr("height", yScale.bandwidth()) //设定对应条带值的宽度
    //     .attr("fill", "green") //填充颜色
    //     .attr("y", yScale(item.name)); //把离散的值映射到y轴条带上
    // });
  },
};
</script>

<style lang="scss" scoped>
.scale {
  height: 100%;
}
</style>
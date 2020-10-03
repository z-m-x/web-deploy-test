<template>
  <div class="d3init">
    <svg />
  </div>
</template>

<script>
export default {
  name: "d3init",
  mounted() {
    const d3 = window.d3;
    var dataset = [250, 210, 170, 130, 90]; //数据（表示矩形的宽度）
    var svg = d3.select("svg").attr("width", "1000px"); //得到svg画布
    var g = svg.append("g"); //定义一个用来装整个图表的一个分组，并设置他的位置
    var rectHeight = 30; //设置每一个矩形的高度
    g.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", 20) //设置左上点的x
      .attr("y", function (d, i) {
        //设置左上点的y
        return i * rectHeight;
      })
      .attr("width", function (d) {
        //设置宽
        return d;
      })
      .attr("height", "10") //设置高度,由于设置了y坐标,所以会根据高度产生间隔
      .attr("fill", "blue"); //颜色填充
  },
};
</script>

<style lang="scss" scoped>
.d3init {
  height: 100%;
}
</style>
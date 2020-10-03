<template>
  <div class="d3test">
    <p class="firstElement"></p>
    <p class="firstElement"></p>
    <p class="firstElement"></p>
    <p class="firstElement"></p>
    <p class="firstElement"></p>
  </div>
</template>

<script>
export default {
  name: "d3test",
  mounted() {
    let enterData = [1, 2, 3, 4, 5, 6, 7];
    const d3 = window.d3;
    let firstElement = d3.select(".d3test").selectAll(".firstElement");
    var update = firstElement.data(enterData);
    let enter = update.enter();

    update.text(function (d, i) {
      return "update: " + d + ",index: " + i;
    });

    var pEnter = enter
      .insert("p", ".firstElement")
      .attr("class", "firstElement"); //添加足够多的<p>
    pEnter.text(function (d, i) {
      return "enter: " + d + ",index: " + i;
    });

    // let exitData = [8, 9];
    // update = firstElement.data(exitData);
    // var exit = update.exit(); //得到exit部分
    // console.log(exit);
    // //对于update的处理
    // update.text(function (d, i) {
    //   return "update: " + d + ",index: " + i;
    // });
    // //对于exit的处理通常是删除 ，但在这里我并没有这么做
    // exit.text(function (d, i) {
    //   d, i;
    //   return "exit";
    // });
    /* 
    总结:
    update:图元绑定数据之后返回值,包含enter和exit;
    enter:图元比绑定数据少,返回占位符,一般做法就是通过这个返回值直接添加这些元素,使用添加会自动把剩下的数据全部转为元素
    exit:图元比绑定数据多,返回数据不存在的图元一般做删除操作
    append:元素后添加
    insert:元素前添加
    remove:删除元素
     */
  },
};
</script>

<style lang="scss" scoped>
</style>
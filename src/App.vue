<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/elform">elform</router-link>|
      <router-link to="/d3">D3</router-link>|
      <router-link to="/eltree">eltree</router-link>|
      <router-link to="/function">function</router-link>|
    </div>
    <router-view />
    <div>
      <el-button @click="setupClick('getComp')">下一步</el-button>
      <div>{{ setup }}</div>
      <el-button @click="setupClick('sendAjax')">上一步</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      setup: 0,
      compInfo: {
        name: "",
      },
      /* 处理的方法映射 */
      fn: { getComp: this.getComp, sendAjax: this.sendAjax },
    };
  },
  created() {},
  mounted() {},
  watch: {
    setup(v) {
      let keys = Object.keys(this.fn);
      console.log(keys, keys.indexOf(v));
    },
  },
  methods: {
    /* 改变步骤 */
    setupClick(setup) {
      this.setup = setup;
    },
    /* 获取选中的公司 */
    getComp() {
      this.compInfo.name = "xxxxx公司";
    },
    /* t提交发送请求 */
    sendAjax() {},
  },
};
</script>
<style lang="scss">
#app {
  height: 100%;
}
</style>

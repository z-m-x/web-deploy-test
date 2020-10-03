<template>
  <div>
    <eltree v-if="treeData.length!=0" :treeData="treeData"></eltree>
  </div>
</template>

<script>
/* 自动导入组件 */
const ctx = require.context("./components", false, /\.vue$/);
let componentsModule = {};
ctx.keys().forEach((fileName) => {
  //ctx(fileName).default：ctx传入由（ctx.keys（）得到的模块名）的moduleName可以返回一个真实的引入模块变量
  componentsModule[fileName.replace(/^\.\/(.*)\.\w+$/, "$1")] = ctx(
    fileName
  ).default;
});
export default {
  components: {
    ...componentsModule,
  },
  data() {
    return {
      treeData: [],
    };
  },
  created() {
    new Promise((resolve) => {
      //模拟请求延迟
      setTimeout(() => {
        let reqTreeData = [
          { name: "文件夹1", pid: 0, id: 1 },
          { name: "文件夹2", pid: 0, id: 2 },
          { name: "文件夹3", pid: 0, id: 3 },
          { name: "文件夹1-1", pid: 1, id: 4 },
          { name: "文件夹2-1", pid: 2, id: 5 },
          { name: "文件1", pid: 1, id: 10001 },
          { name: "文件2", pid: 1, id: 10002 },
          { name: "文件2-1", pid: 2, id: 10003 },
          { name: "文件2-2", pid: 2, id: 10004 },
          { name: "文件1-1-1", pid: 4, id: 10005 },
          { name: "文件2-1-1", pid: 5, id: 10006 },
          { name: "文件2-1-1-1", pid: 10006, id: 10007 },
          { name: "文件2-1-1-1-1", pid: 10007, id: 10008 },
        ];
        resolve(reqTreeData);
      }, 3000);
    }).then((res) => {
      this.treeData = res;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
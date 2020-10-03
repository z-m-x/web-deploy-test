<template>
  <div>
    <Tree :data="allData" default-expand-all :render-content="renderContent"></Tree>
  </div>
</template>

<script>
import { Tree } from "element-ui";
export default {
  components: {
    Tree,
  },
  props: {
    treeData: {
      default: () => [],
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      allData: [],
    };
  },
  watch: {
    // treeData: {
    //   handler (v) {
    //     v.length != 0 && this.transformTreeData(v);
    //   },
    //   deep:true
    // },
  },
  methods: {
    /* 克隆数据 */
    cloneDeepTreeData(data) {
      let cloneDeepedtreeData = JSON.parse(JSON.stringify(data));
      return cloneDeepedtreeData;
    },
    /* 处理数据格式变成多维数组 */
    transformTreeData(data) {
      let treeData = this.cloneDeepTreeData(data);
      /* 映射每个元素id */
      let treeMap = treeData.reduce((pre, current) => {
        pre[current["id"]] = current;
        return pre;
      }, {});
      let result = treeData.reduce((pre, current) => {
        let pid = current.pid; //所属父元素的id
        let parent = treeMap[pid]; //获取父元素
        if (parent) {
          parent.type = "parent"; //给父元素一个类型标识
          parent.children
            ? parent.children.push(current)
            : (parent.children = [current]);
        } else {
          current.type = "parent"; //给父元素一个类型标识
          pre.push(current);
        }
        return pre;
      }, []);
      this.allData = result;
    },
    /* 设置每个节点的图标 */
    setNodeIcon(type, isOpen = false, isHaveChild = false) {
      switch (type) {
        case "parent":
          return isOpen == false || isHaveChild == false ? (
            <label class="el-icon-folder"></label>
          ) : (
            <label class="el-icon-folder-opened"></label>
          );
        default:
          return <label class="el-icon-document"></label>;
      }
    },
    /* 自定义节点函数 */
    renderContent(h, { node, data, store }) {
      let isHaveChild =
        node.childNodes.length == 0 || !node.childNodes ? false : true; //判断是否有子节点
      data, store;
      return (
        <div class="menu-item">
          <span>{this.setNodeIcon(data.type, node.expanded, isHaveChild)}</span>
          {data.name}
        </div>
      );
    },
  },
  created() {
    this.$nextTick(() => {
      this.transformTreeData(this.treeData);
    });
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .menu-item {
    display: flex;
  }
}
</style>
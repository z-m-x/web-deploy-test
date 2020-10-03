<template>
  <div class="about">
    <!-- 
      type="flex"
      :gutter="20"
      :inline="false"
      :row="false"
      :col="false"
      size="mini"
      inline-message
      disabled
      justify="end"
      align="center"
      label-position="left"
      :formData='{}'//回显数据key:value形式
      :formConfigData='{}'//后端返回数据字典 key:value形式
    -->
    <myform
      :formData="formData"
      :formConfigData="formConfigData"
      :cof="cof"
      @getFormData="getFormData"
      @getFormRef="getFormInstance"
    >
    </myform>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="resetForm">重置</el-button>
  </div>
</template>

<script>
var formInstance;
import { configJson } from "@/views/myform/config.js";
import { configJson as cof } from "@/views/myform/configJson.js";
import myform from "@/views/myform";

export default {
  name: "elform",
  components: {
    myform,
  },
  data() {
    return {
      select: "",
      disabled: true,
      formData: { form1: { input: 12 } }, //用于回显数据
      formConfigData: {
        select1: [
          //无子表单项
          {
            value: "1",
            label: "黄金糕",
          },
          {
            value: "2",
            label: "双皮奶",
          },
          {
            value: "3",
            label: "蚵仔煎",
          },
          {
            value: "3",
            label: "蚵仔煎",
          },
          {
            value: "3",
            label: "蚵仔煎",
          },
        ],
        form1: {
          //有子表单项
          select1: [
            {
              value: "1",
              label: "黄金糕",
            },
            {
              value: "2",
              label: "双皮奶",
            },
            {
              value: "3",
              label: "蚵仔煎",
            },
            {
              value: "3",
              label: "蚵仔煎",
            },
            {
              value: "3",
              label: "蚵仔煎",
            },
          ],
        },
      },
    };
  },
  created() {
    /* 演示直接引用改变配置文件 */
    configJson.forEach((i) => {
      if (i.valueKey == "transfer") {
        i.props["render-content"] = this.renderFunc;
      }
    });
    /* 演示动态控制禁用 */
    setTimeout(() => {
      this.disabled = false;
    }, 5000);
  },
  mounted() {},
  watch: {
    select(V) {
      console.log(V);
    },
  },
  methods: {
    alert() {
      alert(1);
    },
    getFormData(formData) {
      formData;
      console.log(formData);
    },

    getFormInstance(form) {
      //获取form实例
      formInstance = form;
    },
    resetForm() {
      formInstance.resetFields();
    },
    onSubmit() {
      formInstance.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    renderFunc(h, option) {
      return (
        <span>
          {option.key} - {option.label}
        </span>
      );
    },
    /* 级联选择动态加载，直接再配置中配置关键字，value为指向此实例的方法 */
    lazyLoad(node, resolve) {
      var id = 0;
      const { level } = node;
      setTimeout(() => {
        const nodes = Array.from({ length: level + 1 }).map(() => ({
          value: ++id,
          label: `选项${id}`,
          leaf: level >= 2,
        }));
        // 通过调用resolve将子节点数据返回，通知组件数据加载完成
        resolve(nodes);
      }, 1000);
    },
  },
  computed: {
    configJson() {
      return configJson;
    },
    cof() {
      return cof;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .input-select {
    width: 100px;
  }
}
.about {
  height: 100vh;
}
form {
  height: 100vh;
}
</style>
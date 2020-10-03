
<template>
  <div>
    <el-button type="text" @click="handleClose">点击打开 Dialog</el-button>
    <mydialog :visible.sync="dialogVisible" width="80%" title="myForm">
      <template v-slot>
        <myform
          :inline="false"
          :row="false"
          :col="false"
          :cof="cof"
          :formConfigData="formConfigData"
          :formData="formData"
          @getFormData="getFormData"
          @getFormRef="getFormRef"
          :show="showForm"
        >
          <!-- 每个form一个lable -->
          <template slot="form1">
            <div class="formLableBox"><div>form1</div></div>
          </template>
          <template slot="form2">
            <div class="formLableBox"><div>form2</div></div>
          </template>
        </myform>
        <div>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary">确 定</el-button>
          <el-button @click="nextSetup('form1')">上一步</el-button>
          <el-button @click="nextSetup('form2')">下一步</el-button>
        </div>
      </template>
    </mydialog>
  </div>
</template>

<script>
import mydialog from "./eldialog";
import myform from "@/views/myform";
// import { configJson as cof } from "@/views/myform/config.js";
import { configJson as cof } from "@/views/myform/configJson.js";

var formInstance;
var showFormMap = Array.from(new Set(["form1", "form2"])); //每步对应form映射
var setup = 0; //当前第几步
export default {
  components: { mydialog, myform },
  data() {
    return {
      dialogVisible: false, //抽屉开关
      showForm: showFormMap[setup],
      formData: { form1: { input: 12 }, form2: { radio2: "ra1" } }, //用于回显数据
      //用于异步拉取字典
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
  computed: {
    cof() {
      return cof;
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = true;
    },

    /* 获取form表单所有数据 */
    getFormData(formData) {
      console.log(formData);
    },
    /* 获取form实例 */
    getFormRef(e) {
      formInstance = e;
    },
    /* 清空表单 */
    resetForm() {
      formInstance.resetFieldsFn();
    },
    /* 模拟下一步上一步 */
    nextSetup(formKey) {
      this.onSubmit(formKey);
    },
    /* 提交表单 */
    onSubmit(formKey) {
      formInstance.validate((valid) => {
        if (valid) {
          this.showForm = formKey; //要显示的form
          setup = showFormMap[formKey]; //当前第几步了
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
};
</script>

<style lang="scss" scoped>
.formLableBox {
  margin: 20px 0;
  position: relative;
  & div {
    text-indent: 2rem;

    padding-left: 10px;
    &::before {
      content: "";
      height: 14px;
      width: 2px;
      top: 50%;
      left: 2rem;
      margin-top: -7px;
      position: absolute;
      background-color: #409eff;
    }
  }
}
</style>
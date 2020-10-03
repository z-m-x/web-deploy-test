<template>
  <div class="home">
    <el-upload
      class="upload-demo"
      action
      :show-file-list="false"
      :on-change="handleChange"
      :auto-upload="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getTest } from "@/api";
import { onMounted } from "@vue/composition-api";
import XLSX from "xlsx";
import { readFile } from "@/utils";
export default {
  name: "Home",
  components: {},
  setup() {
    onMounted(async () => {
      let res = await getTest({ a: 1 });
      console.log(res);
    });
  },
  methods: {
    async handleChange(ev) {
      let file = ev.raw; //获取文件对象
      let data = await readFile(file); //文件读取为二进制格式
      let workBook = XLSX.read(data, { type: "binary" }); //以二进制读取为excel工作本
      let workSheet = workBook.Sheets[workBook.SheetNames[0]]; //取出表中第1tab页数据
      let workSheetJson = XLSX.utils.sheet_to_json(workSheet); //利用工具类转为json格式
      console.log(workSheetJson);
    },
  },
};
</script>
<style lang="scss">
</style>

const ctx = require.context("./components", false, /\.js$/);
/* 引入所有render方法 */
const renderModules = {};
ctx.keys().forEach((item) => {
  renderModules[item.replace(/^\.\/(.*)\.\w+$/, "$1")] = ctx(item).default;
});
var formDatas = null; //拷贝一份form初始值
export default {
  name: "myform",
  inheritAttrs: false,
  components: {},
  props: {},
  render(h) {
    /* 解构外部传入的额外的属性配置 */
    let { row, cof, show } = this.$attrs;
    let _self = this;
    /* 有children,绑定的数据会在整个对象的formKey下面 */
    let copyCof = JSON.parse(JSON.stringify(cof)); //拷贝一份配置
    /* form分割显示,如果传入show=‘slotname’ 代表当前要显示的form,slotname是数组也可以是字符串*/
    copyCof = show
      ? copyCof.filter((item) => {
          let foo;
          Array.isArray(show)
            ? show.forEach((i) => {
                if (i == item.formKey) {
                  foo = item;
                }
              })
            : show == item.formKey
            ? (foo = item)
            : null;
          if (foo) return item;
        })
      : copyCof;
    let childVnodes = copyCof.reduce((pre, item) => {
      /* 使用者在摸板中传入form的slot用于渲染每个formKey的lable */
      this.$slots[item.formKey] && pre.push(this.$slots[item.formKey]);
      if (item.children) {
        let childVnodes = item.children.reduce((pr, ite) => {
          pr.push(this.itemsToCol(_self, h, ite, item.formKey));
          return pr;
        }, []);
        pre = pre.concat(childVnodes);
      } else {
        pre.push(this.itemsToCol(_self, h, item));
      }
      return pre;
    }, []);
    //  栅格布局包裹 el-row
    let elrow =
      row == false ? childVnodes : this.colsToRow(_self, h, childVnodes);
    /* form包裹 */
    let thisForm = renderModules["el-form"](_self, h, this.$attrs, elrow);
    return thisForm;
  },
  created() {
    let elType = [
      "el-checkbox",
      "el-cascader",
      "el-transfer",
      "el-date-picker",
    ]; //这些表单项的数据类型是数组
    /* 如果没有传入formData */
    let { cof, formData, formConfigData } = this.$attrs;
    cof.forEach((item) => {
      if (item.children) {
        this.$set(this.formData, item.formKey, {});
        item.children.forEach((i) => {
          if (elType.includes(i.type)) {
            this.$set(this.formData[item.formKey], i.valueKey, []);
          } else if (i.type == "el-input-number") {
            this.$set(this.formData[item.formKey], i.valueKey, 0);
          } else {
            this.$set(this.formData[item.formKey], i.valueKey, "");
          }
        });
      } else {
        if (elType.includes(item.type)) {
          this.$set(this.formData, item.valueKey, []);
        } else if (item.type == "el-input-number") {
          this.$set(this.formData, item.valueKey, 0);
        } else {
          this.$set(this.formData, item.valueKey, "");
        }
      }
    });

    formDatas = JSON.parse(JSON.stringify(this.formData)); //拷贝form初始值用于手动重置
    /* 用于回显,做字段合并*/
    formData && this.mergeFormData();
    /* 用于异步拉取数据字典字段 */
    formConfigData && this.mergeFormConfigData();
  },
  mounted() {
    /* 挂载自己封装的方法到实例上 */
    this.$refs.myForm.resetFieldsFn = this.resetFieldsFn;
    /* 给组件返回当前实例 */
    this.$emit("getFormRef", this.$refs.myForm);
  },
  data() {
    return {
      formData: {},
    };
  },
  watch: {
    formData: {
      handler(v) {
        this.$emit("getFormData", v);
      },
      deep: true,
    },
  },
  methods: {
    /* 合并传入的formData和通过配置自动生成的form项 */
    mergeFormData() {
      let propForm = this.$attrs.formData;
      let formData = this.formData;
      for (let key in formData) {
        propForm[key] &&
          (formData[key] = { ...formData[key], ...propForm[key] });
      }
    },
    /* 合并传入的formConfigData和通过拉取后端字典的字段 */
    mergeFormConfigData() {
      let cof = this.$attrs.cof;

      let formConfigData = this.$attrs.formConfigData;

      for (let item of cof) {
        if (item.formKey) {
          //如果表单配置是小表单的集合,找到对应的小表单塞字典字段
          let formKey = item.formKey;
          let currentItemOption = formConfigData[formKey];
          item.children.forEach((i) => {
            currentItemOption &&
              currentItemOption[i.valueKey] &&
              (i[this.getTypeOptionKey(i.type)] =
                currentItemOption[i.valueKey]);
          });
        } else {
          formConfigData[item.valueKey] &&
            (item[this.getTypeOptionKey(item.type)] =
              formConfigData[item.valueKey]);
        }
      }
    },
    /* 由于遵循element属性项key,这里区分下不同form-item类型,选项做字段区分 */
    getTypeOptionKey(formItemType) {
      if (formItemType == "el-select" || formItemType == "el-cascader") {
        return "options";
      } else if (formItemType == "el-radio" || formItemType == "el-checkbox") {
        return "items";
      }
    },
    /* 把元素用item包裹并用col包裹 */
    itemsToCol(_self, h, item, formKey) {
      let formItem = h(
        "el-form-item",
        {
          props: {
            ...item["form-item"],
            prop: formKey
              ? `${formKey}.${item["form-item"].prop}`
              : item["form-item"].prop,
          },
          attrs: {},
        },
        renderModules[item.type](_self, h, item, formKey)
      );
      // 栅格布局包裹 el-col
      let elcol =
        this.$attrs.col == false
          ? formItem
          : renderModules["el-col"](_self, h, item, formItem);

      return elcol;
    },
    /* 给栅格布局分行 */
    colsToRow(_self, h, childVnodes) {
      /* 给form-col分行,采用一行24列规则,每满24列分一行 */
      let formCols = childVnodes.reduce((pre, item) => {
        let span = item[0].data.props.span; //获取每项span值,满足和之前每项小于24
        if (!pre[0]) {
          //开始第一项收集,0作为每个col组的标记初始化,后面会累加
          pre[0] = {
            span, //第一项的span收集,用于后面累加
            items: [item],
          };
        } else {
          let currentRowKey = Number(
            //从最后一个对象找到当前col组标记key,准没错
            Object.keys(pre)[Object.keys(pre).length - 1]
          );
          if (pre[currentRowKey].span + span <= 24) {
            pre[currentRowKey].span += span; //累加span值,确保不超过24
            pre[currentRowKey].items.push(item); //如果满足就把当前项添加到对象items数组内
          } else {
            //如果不满足,从起一项 对象key在上一次基础上累加1
            pre[currentRowKey + 1] = {
              span, //第一项的span收集,用于后面累加
              items: [item],
            };
          }
        }
        return pre;
      }, {});
      console.log(formCols);
      let rowCols = []; //收集被包裹好的row
      for (let i in formCols) {
        rowCols.push(renderModules["el-row"](_self, h, formCols[i].items));
      }
      return rowCols;
    },
    /* 重置表单封装 */
    resetFieldsFn() {
      this.$nextTick(function() {
        this.$refs.myForm.resetFields();
        /* 因为reset方法是将modle绑定的表单数据重置为初始值,这里有多个form情况每次只能重置一个form,重置之后其他form初始值就定在此刻,如果已经有值输入,那么reset方法就无法实现.所以手动清除 */
        let showedForm = this.$attrs.show;
        Array.isArray(showedForm)
          ? showedForm.forEach((i) => {
              this.formData[i] = formDatas[i];
            })
          : (this.formData[showedForm] = formDatas[showedForm]);
      });
    },
  },
};

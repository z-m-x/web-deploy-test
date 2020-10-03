export default function(_self, h, item, formKey) {
  /*   _self.$parent找到调用form组件的实例，绑定钩子 */
  let { data } = item.props;
  if (data && data.length != 0) {
    return [
      h("el-transfer", {
        props: {
          value: formKey
            ? _self.formData[formKey][item.valueKey]
            : _self.formData[item.valueKey],
          // 针对 props 进行解构
          ...(item.props || {}),
        },
        attrs: {
          value: formKey
            ? _self.formData[formKey][item.valueKey]
            : _self.formData[item.valueKey],
          // 针对 attrs 进行解构
          ...(item.props || {}),
        },
        on: {
          input: function(value) {
            formKey
              ? (_self.formData[formKey][item.valueKey] = value)
              : (_self.formData[item.valueKey] = value);
          },
        },
      }),
    ];
  }
}

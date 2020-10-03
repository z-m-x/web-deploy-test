export default function(_self, h, item, formKey) {
  return [
    h("el-input", {
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

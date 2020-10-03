export default (_self, h, item, formKey) => {
  return [
    h("el-cascader", {
      props: {
        ...(item.props || {}),

        value: formKey
          ? _self.formData[formKey][item.valueKey]
          : _self.formData[item.valueKey],
      },
      on: {
        change(value) {
          formKey
            ? (_self.formData[formKey][item.valueKey] = value)
            : (_self.formData[item.valueKey] = value);
        },
      },
    }),
  ];
};

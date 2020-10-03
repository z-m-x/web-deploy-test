export default (_self, h, item, formKey) => {
  return [
    h("el-input-number", {
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

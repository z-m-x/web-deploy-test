export default (_self, h, item, formKey) => {
  return [
    h("el-time-select", {
      props: {
        ...(item.props || {}),
        value: formKey
          ? _self.formData[formKey][item.valueKey]
          : _self.formData[item.valueKey],
      },
      on: {
        input(value) {
          formKey
            ? (_self.formData[formKey][item.valueKey] = value)
            : (_self.formData[item.valueKey] = value);
        },
      },
    }),
  ];
};

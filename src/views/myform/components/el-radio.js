export default (_self, h, item, formKey) => {
  return [
    h(
      "el-radio-group",
      {
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
      },
      item.items.map((v) => {
        return h(
          item["el-radio-button"] ? "el-radio-button" : "el-radio",
          {
            props: {
              label: v.label,
            },
          },
          v.name
        );
      })
    ),
  ];
};

export default (_self, h, item, formKey) => {
  return [
    h(
      "el-checkbox-group",
      {
        props: {
          value: formKey
            ? _self.formData[formKey][item.valueKey]
            : _self.formData[item.valueKey],
          ...(item.props || {}),
        },
        on: {
          input(arr) {
            formKey
              ? (_self.formData[formKey][item.valueKey] = arr)
              : (_self.formData[item.valueKey] = arr);
          },
        },
      },
      item.items.map((v) => {
        return h(
          "el-checkbox",
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

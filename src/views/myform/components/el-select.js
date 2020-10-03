export default function(_self, h, item, formKey) {
  return [
    h(
      "el-select",
      {
        on: {
          change(value) {
            formKey
              ? (_self.formData[formKey][item.valueKey] = value)
              : (_self.formData[item.valueKey] = value);
          },
        },
        props: {
          value: formKey
            ? _self.formData[formKey][item.valueKey]
            : _self.formData[item.valueKey],
          ...(item.props || {}),
        },
      },
      item.options.map((v) => {
        return h("el-option", {
          props: {
            label: v.label,
            value: v.value,
          },
        });
      })
    ),
  ];
}

export default (_self, h, $attrs, formItem) => {
  return [
    h(
      "el-form",
      {
        props: {
          model: _self.formData,
          inline: $attrs.inline == false ? $attrs.inline : true,
          "label-position": $attrs["label-position"] || "right", //对齐方式
          "label-width": $attrs["label-width"] || "100px", //label宽度
          size: $attrs.size || "medium", //form项大小
          inlineMessage: $attrs["inline-message"], //行内校验
          disabled: $attrs.disabled === "" ? true : $attrs.disabled, //所有项禁用
        },
        ref: "myForm",
      },
      [formItem]
    ),
  ];
};

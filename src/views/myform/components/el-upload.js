export default (_self, h, item, formKey) => {
  // let parentVm = _self.$parent;
  /* 自定义缩略图插槽 default*/

  return [
    h(
      "el-upload",
      {
        props: {
          ...(item.props || {}),
          value: formKey
            ? _self.formData[formKey][item.valueKey]
            : _self.formData[item.valueKey],
        },
        scopedSlots: {
          file: (props) => {
            let { file } = props;
            return [
              h("img", {
                class: "el-upload-list__item-thumbnail",
                attrs: {
                  src: file.url,
                  alt: "",
                },
              }),
              item.props &&
                h("span", { class: "el-upload-list__item-actions" }, [
                  h(
                    "span",
                    {
                      class: "el-upload-list__item-delete",
                      on: {
                        click() {
                          _self.$emit("handleFileDownload", file); //通过回调
                        },
                      },
                    },
                    [h("i", { class: "el-icon-download" })]
                  ),
                  h(
                    "span",
                    {
                      class: "el-upload-list__item-delete",
                      on: {
                        click() {
                          _self.$emit("handleFileRemove", file); //点击删除
                        },
                      },
                    },
                    [h("i", { class: "el-icon-delete" })]
                  ),
                ]),
            ];
          },
        },
        on: {
          change(value) {
            debugger;
            formKey
              ? (_self.formData[formKey][item.valueKey] = value)
              : (_self.formData[item.valueKey] = value);
          },
        },
      },
      [h("i", { slot: "default", class: "el-icon-plus" })]
    ),
  ];
};

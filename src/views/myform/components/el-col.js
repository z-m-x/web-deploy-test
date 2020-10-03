export default (_self, h, item, formItem) => {
  return [
    h(
      "el-col",
      {
        props: {
          span: _self.$attrs.span || 6,
          ...item.col,
        },
      },
      [formItem]
    ),
  ];
};

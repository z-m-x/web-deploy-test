export default (_self, h, vNodes) => {
  let { type, justify, align } = _self.$attrs;
  return [
    h(
      "el-row",
      {
        props: {
          gutter: _self.$attrs.gutter || 0,
          type,
          justify,
          align,
        },
      },
      [vNodes]
    ),
  ];
};

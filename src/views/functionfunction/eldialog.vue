<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
  render() {
    let that = this;
    console.log(that.$attrs);
    return (
      <el-dialog
        width="50%"
        visible={that.visible}
        before-close={that.handleClose}
        destroy-on-close={true}
        {...{ attrs: that.$attrs }}
      >
        {that.$slots.default[0]}
        <div slot="footer" class="dialog-footer">
          {that.$slots.default[that.$slots.default.length - 1]}
        </div>
      </el-dialog>
    );
  },
  methods: {
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.$emit("update:visible", false);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
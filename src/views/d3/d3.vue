<template>
  <div class="d3">
    <div id="d3-nav">
      <router-link to="/d3/d3test">d3test</router-link>|
      <router-link to="/d3/d3init">d3init</router-link>|
      <router-link to="/d3/d3init2">d3init2</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.d3 {
  height: 100%;
}
</style>
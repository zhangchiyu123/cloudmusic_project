<template>
  <div class="discover clearfix">
    <!-- 轮播图组件 -->
    <Banner></Banner>
    <div class="discover_main">
      <!-- 首页中心组件 -->
      <Main></Main>
      <!-- 首页右边组件 -->
      <Secondary></Secondary>
    </div>
  </div>
</template>

<script>
import Banner from "./Banner";
import Main from "./Main";
import Secondary from "./Secondary";
export default {
  name: "Discover",
  components: {
    Banner,
    Main,
    Secondary,
  },
  mounted() {
    // 回首页添加小三角和背景
    this.$bus.$emit("changeTop", 1);
  },
};
</script>

<style lang="less" scoped>
.discover_main {
  width: 1100px;
  margin: 0 auto;
}
</style>

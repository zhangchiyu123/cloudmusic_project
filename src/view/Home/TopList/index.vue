<template>
  <div class="top_list">
    <MainLeft></MainLeft>
    <MainRight></MainRight>
  </div>
</template>

<script>
import MainLeft from "./MainLeft";
import MainRight from "./MainRight";
export default {
  name: "TopList",
  components: {
    MainLeft,
    MainRight,
  },
};
</script>

<style lang="less" scoped>
.top_list {
  width: 983px;
  height: 3478px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-top: none;
  border-bottom: 0;
}
</style>

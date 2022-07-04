<template>
  <div class="dj-radio">
    <!-- 分类组件 -->
    <Category></Category>
  </div>
</template>

<script>
import Category from "./Category";
export default {
  // 主播电台组件
  name: "DjRadio",
  components: {
    Category,
  },
};
</script>

<style lang="less" scoped>
.dj-radio {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-top: none;
  border-bottom: none;
}
</style>

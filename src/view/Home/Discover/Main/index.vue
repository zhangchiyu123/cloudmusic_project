<template>
  <div class="main">
    <!-- 热门推荐组件 -->
    <Recommend></Recommend>
    <!-- 新碟上架组件 -->
    <New></New>
    <!-- 榜单组件 -->
    <RankingList></RankingList>
  </div>
</template>

<script>
import Recommend from "./Recommend";
import New from "./New";
import RankingList from "./RankingList";
export default {
  name: "Main", //中间主体组件
  components: {
    Recommend,
    New,
    RankingList,
  },
};
</script>

<style lang="less" scoped>
.main {
  float: left;
  width: 730px;
  padding: 20px 20px 40px 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-bottom: none;
}
</style>

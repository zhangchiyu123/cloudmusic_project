<template>
  <div class="dj">
    <div class="header">热门主播</div>
    <ul>
      <li v-for="djList in djTopList" :key="djList.id">
        <a><img :src="djList.avatarUrl" /></a>
        <div class="info">
          <p class="name">{{ djList.nickName }}</p>
          <p class="play">{{ parseInt(djList.score / 10000) + "万" }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DJ",
  data() {
    return {
      limit: 5, //获取五位最热主播的数据
    };
  },
  mounted() {
    this.$store.dispatch("getDjTopList", this.limit);
  },
  computed: {
    ...mapGetters(["djTopList"]),
  },
};
</script>

<style lang="less" scoped>
.dj {
  width: 250px;
  height: 775px;
  padding-top: 30px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .header {
    color: #333;
    width: 210px;
    height: 23px;
    font-size: 12px;
    border-bottom: 1px solid #ccc;
    margin: 0 auto;
    font-weight: 600;
  }
  ul {
    float: left;
    width: 100%;
    height: 250px;
    margin: 20px 0 0 20px;
    li {
      float: left;
      width: 210px;
      height: 50px;
      a {
        float: left;
        margin-right: 10px;
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        float: left;
        width: 160px;
        height: 42px;
        p {
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

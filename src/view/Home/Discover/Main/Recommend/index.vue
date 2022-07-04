<template>
  <div class="recommend">
    <header>
      <a href="#" class="hot">热门推荐</a>
      <div class="tab">
        <span class="tab_span">华语</span><i class="line">|</i>
        <span class="tab_span">流行</span><i class="line">|</i>
        <span class="tab_span">摇滚</span><i class="line">|</i>
        <span class="tab_span">民谣</span><i class="line">|</i>
        <span class="tab_span">电子</span>
      </div>
      <i class="more_right"></i>
      <a href="#" class="more">更多</a>
    </header>
    <div class="main_body">
      <li v-for="List in recommendList" :key="List.id">
        <img :src="List.picUrl" alt="" />
        <!-- 镜面效果,后改为router-link作为路由跳转使用 -->
        <a class="shadow"></a>
        <div class="bottom">
          <span class="icon_headset"></span>
          <span class="number">{{
            parseInt(List.playCount / 10000) + "万"
          }}</span>
          <span class="icon_play"></span>
        </div>
        <a href="#" class="text">{{ List.name }}</a>
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "recommend", //热门推荐组件
  data() {
    return {
      limit: 8,
    };
  },
  mounted() {
    this.$store.dispatch("getPersonalized", this.limit);
  },
  computed: {
    ...mapGetters(["recommendList"]),
  },
  methods: {
    // play(id) {
    //   this.$store.dispatch("getSongUrl", id);
    // },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  width: 689px;
  height: 480px;
  header {
    width: 100%;
    height: 35px;
    padding: 0 10px 0 34px;
    background: url("./images/index.png") -225px -156px no-repeat;
    border-bottom: 2px solid #c10d0c;
    margin-bottom: 20px;
    .hot {
      float: left;
      font-size: 20px;
      color: #333;
      line-height: 28px;
    }
    .tab {
      float: left;
      height: 16px;
      margin: 9px 0 0 20px;
      .tab_span {
        width: 15px;
        &:hover {
          border-bottom: 1px #c10d0c solid;
          cursor: pointer;
        }
      }
      .line {
        display: inline-block;
        margin: 0 10px;
        line-height: 18px;
        color: #ccc;
        font-size: 12px;
      }
    }
    .more {
      margin-top: 11px;
      float: right;
      margin-right: 10px;
    }
    .more_right {
      float: right;
      margin-top: 13px;
      width: 12px;
      height: 12px;
      background: url("./images/index.png") 0 -240px no-repeat;
    }
  }
  .main_body {
    width: 800px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    li {
      position: relative;
      width: 140px;
      height: 204px;
      margin-right: 42px;
      .shadow {
        width: 140px;
        height: 140px;
        display: block;
        background: url("./images/coverall.png") no-repeat;
        position: absolute;
        top: 0;
      }
      img {
        width: 140px;
        height: 140px;
      }
      .bottom {
        position: absolute;
        top: 113px;
        width: 100%;
        height: 27px;
        background: url("./images/coverall.png") 0 -537px no-repeat;
        .icon_headset {
          float: left;
          width: 14px;
          height: 11px;
          background: url("./images/iconall.png") 0 -24px no-repeat;
          margin: 8px 5px 9px 10px;
        }
        .number {
          font-size: 12px;
          float: left;
          line-height: 27px;
          color: #fff;
        }
        .icon_play {
          float: right;
          width: 16px;
          height: 17px;
          background: url("./images/iconall.png") 0 0 no-repeat;
          margin: 6px;
          &:hover {
            background-position: 0 -60px;
            cursor: pointer;
          }
        }
      }
      .text {
        width: 140px;
        color: #000;
        margin-top: 5px;
        &:hover {
          cursor: pointer;
          //   复习:下划线
          text-decoration: underline;
          border-bottom: none !important;
        }
      }
    }
  }
}
</style>

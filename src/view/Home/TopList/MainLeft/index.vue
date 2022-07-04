<template>
  <div class="main">
    <div class="main_left">
      <h2 class="list1">云音乐特色榜</h2>
      <ul class="list1_ul">
        <li
          class="list1_ul_li"
          v-for="(list1, index) in musicFeatures_topList"
          :key="index"
          @click="Go(list1.id, index)"
          :class="{ active: list1.id == isActive }"
        >
          <div class="img_div"><img :src="list1.coverImgUrl" /></div>
          <p>{{ list1.name }}</p>
          <span>{{ list1.updateFrequency }}</span>
        </li>
      </ul>
    </div>
    <div class="main_right">
      <h2 class="media_list">全球媒体榜</h2>
      <ul class="media_list_ul">
        <li
          class="list2_ul_li"
          v-for="list2 in globalMedia_topList"
          :key="list2.id"
          @click="Go(list2.id)"
          :class="{ active: list2.id == isActive }"
        >
          <div class="img_div2"><img :src="list2.coverImgUrl" /></div>
          <p>{{ list2.name }}</p>
          <span>{{ list2.updateFrequency }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainLeft",
  data() {
    return {
      isActive: "",
    };
  },
  mounted() {
    this.$store.dispatch("getTopList");
  },
  computed: {
    ...mapGetters([
      "musicFeatures_topList",
      "globalMedia_topList",
      "topList_first",
    ]),
  },
  // 把vuex的值赋给data里的isActive
  watch: {
    musicFeatures_topList: {
      handler(newValue, oldValue) {
        this.isActive = newValue[0].id;
      },
    },
  },
  methods: {
    // 点击修改isActive并携带参数跳转到对应的歌单页面
    Go(id, index) {
      this.isActive = id;
      this.$router.push({
        path: "/home/toplist",
        query: {
          id: id,
        },
      });
      this.$bus.$emit("getSongList");
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin-top: 40px;
  float: left;
  width: 240px;
  .main_left {
    width: 240px;
    .list1 {
      width: 215px;
      height: 21px;
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #333;
      margin-bottom: 7px;
    }
    .list1_ul {
      width: 240px;
      height: 248px;
      .list1_ul_li {
        width: 240px;
        height: 62px;
        padding: 10px 0 10px 20px;
        &:hover {
          background-color: #e6e6e6;
          cursor: pointer;
        }
        .img_div {
          float: left;
          width: 40px;
          height: 40px;
          background: #333;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          color: #333;
          margin-top: 2px;
          margin-bottom: 5px;
        }
      }
    }
  }
  .main_right {
    width: 240px;
    margin-top: 20px;
    .media_list {
      width: 215px;
      height: 21px;
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #333;
    }
    .media_list_ul {
      width: 100%;
      .list2_ul_li {
        width: 240px;
        height: 62px;
        padding: 10px 0 10px 20px;
        &:hover {
          background-color: #e6e6e6;
          cursor: pointer;
        }
        .img_div2 {
          float: left;
          width: 40px;
          height: 40px;
          background: #333;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          color: #333;
          margin-top: 2px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
.active {
  background-color: #e6e6e6;
}
</style>

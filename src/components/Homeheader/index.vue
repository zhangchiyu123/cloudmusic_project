<template>
  <div class="header_wrapper" :class="{ header: searchShow == 100 }">
    <ul>
      <li>
        <router-link to="/home/discover" @click.native="isActive = 1"
          ><em :class="{ active: isActive == 1 }">推荐</em></router-link
        >
      </li>
      <li>
        <router-link to="/home/toplist" @click.native="isActive = 2"
          ><em :class="{ active: isActive == 2 }">排行榜</em></router-link
        >
      </li>
      <li>
        <router-link to="/home/playlist" @click.native="isActive = 3"
          ><em :class="{ active: isActive == 3 }">歌单</em></router-link
        >
      </li>
      <li>
        <router-link to="/home/djradio" @click.native="isActive = 4"
          ><em :class="{ active: isActive == 4 }">主播电台</em></router-link
        >
      </li>
      <li>
        <a href="#" @click="isActive = 5"
          ><em :class="{ active: isActive == 5 }">歌手</em></a
        >
      </li>
      <li>
        <a href="#" @click="isActive = 6"
          ><em :class="{ active: isActive == 6 }">新碟上架</em></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      isActive: 1,
      // 控制红条是否显示为5px
      searchShow: 1,
    };
  },
  mounted() {
    this.$bus.$on("changeIsActive", this.changeIsActive);
    this.$bus.$on("changeSearch", (data) => {
      this.searchShow = data;
    });
    // 解决刷新页面，选中的阴影框丢失的问题
    let path = this.$route.path;
    switch (path) {
      case "/home/discover":
        this.isActive = 1;
        break;
      case "/home/toplist":
        this.isActive = 2;
        break;
      case "/home/playlist":
        this.isActive = 3;
        break;
      case "/home/djradio":
        this.isActive = 4;
      default:
        break;
    }
  },
  methods: {
    changeIsActive() {
      // 点击首页logo的回调
      this.isActive = 1;
    },
  },
};
</script>

<style lang="less" scoped>
.header_wrapper {
  height: 35px;
  background: #c20c0c;
  ul {
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding-right: 50px;
    padding-top: 7px;
    a {
      width: 80px;
      height: 100%;
      padding: 0 26px;
      padding-top: 6px;
      em {
        height: auto;
        display: block;
        float: left;
        padding: 0 10px;
        line-height: 21px;
        color: #fff;
        border-radius: 20px;
        &:hover {
          background: #9b0909;
        }
      }
    }
  }
}

.active {
  background: #9b0909;
}
.header {
  width: 100%;
  height: 5px !important;
  overflow: hidden;
}
</style>

<template>
  <div class="playlist">
    <nav>
      <h3>
        <span>{{ catCopy }}</span>
        <a class="nav-btn" @click.stop="isShow = !isShow">
          <i>
            选择分类
            <em></em>
          </i>
        </a>
      </h3>
      <div class="hot">
        <a class="hot-text" @click="changeHot">热门</a>
      </div>
    </nav>
    <div class="classlist-box" v-show="isShow">
      <div class="hd">
        <i></i>
      </div>
      <div class="bd">
        <h3>
          <a @click="allStyle">全部风格</a>
        </h3>
        <!-- 语种一行 -->
        <dl>
          <dt>
            <i class="lang"></i>
            语种
          </dt>
          <dd>
            <i v-for="langList in languages" :key="langList.id"
              ><a @click="changeCategory(langList.name)">{{ langList.name }}</a>
              <span>|</span></i
            >
          </dd>
        </dl>
        <!-- 风格一行 -->
        <dl>
          <dt>
            <i class="style"></i>
            风格
          </dt>
          <dd>
            <i v-for="styleList in style" :key="styleList.id"
              ><a @click="changeCategory(styleList.name)">{{
                styleList.name
              }}</a>
              <span>|</span></i
            >
          </dd>
        </dl>
        <!-- 场景一行 -->
        <dl>
          <dt>
            <i class="scene"></i>
            场景
          </dt>
          <dd>
            <i v-for="sceneList in scene" :key="sceneList.id"
              ><a @click="changeCategory(sceneList.name)">{{
                sceneList.name
              }}</a>
              <span>|</span></i
            >
          </dd>
        </dl>
        <!-- 情感一行 -->
        <dl>
          <dt>
            <i class="emotion"></i>
            情感
          </dt>
          <dd>
            <i v-for="emotionList in emotion" :key="emotionList.id"
              ><a @click="changeCategory(emotionList.name)">{{
                emotionList.name
              }}</a>
              <span>|</span></i
            >
          </dd>
        </dl>
        <!-- 主题一行 -->
        <dl>
          <dt>
            <i class="theme"></i>
            主题
          </dt>
          <dd>
            <i v-for="themeList in theme" :key="themeList.id"
              ><a @click="changeCategory(themeList.name)">{{
                themeList.name
              }}</a>
              <span>|</span></i
            >
          </dd>
        </dl>
      </div>
      <div class="ft"></div>
    </div>
    <ul class="pl-container clearfix">
      <li v-for="list in playlists" :key="list.id" :title="list.name">
        <img :src="list.coverImgUrl" alt="" />
        <!-- 镜面效果,后改为router-link作为路由跳转使用 -->
        <a class="shadow"></a>
        <div class="bottom">
          <span class="icon_headset"></span>
          <span class="number">{{
            list.playCount > 10000
              ? parseInt(list.playCount / 10000) + "万"
              : list.playCount
          }}</span>
          <span class="icon_play"></span>
        </div>
        <a href="#" class="text over">{{ list.name }}</a>
        <p>
          <span class="color666 font">by&nbsp;</span>
          <a class="pl-singer color666">{{ list.creator.nickname }}</a>
          <img
            :src="list.creator.avatarDetail.identityIconUrl"
            v-if="list.creator.avatarDetail != null"
            class="img-detail"
          />
        </p>
      </li>
    </ul>
    <Pagination
      :pageNo="pageNo"
      :pageSize="pageSize"
      :total="total"
      :continues="continues"
      @getPageNo="getPageNo"
    ></Pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PlayList", // 歌单组件
  data() {
    return {
      order: "hot",
      cat: "全部",
      isShow: false, // 控制分类框显示隐藏
      pageNo: 1, //当前页
      pageSize: 35, //每一页展示多少条
      continues: 7, //连续页码数
      catCopy: "全部", //当前选择的大分类名
    };
  },
  mounted() {
    this.getList();
    this.getCatList();
    // 给整个页面注册点击事件
    document.addEventListener("click", this.handleClose);
  },
  computed: {
    ...mapGetters(["playlists", "total", "class", "catList"]),
    // 语种
    languages() {
      let arr = this.catList.filter((item) => item.category == 0);
      return arr;
    },
    // 风格
    style() {
      let arr = this.catList.filter((item) => item.category == 1);
      return arr;
    },
    // 场景
    scene() {
      let arr = this.catList.filter((item) => item.category == 2);
      return arr;
    },
    // 情感
    emotion() {
      let arr = this.catList.filter((item) => item.category == 3);
      return arr;
    },
    // 主题
    theme() {
      let arr = this.catList.filter((item) => item.category == 4);
      return arr;
    },
  },
  methods: {
    getPageNo(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },
    getList() {
      // 获取列表的请求
      this.$store.dispatch("getHotPlayList", {
        order: this.order,
        cat: this.cat,
        limit: this.pageSize,
        offset: (this.pageNo - 1) * this.pageSize,
      });
      //
      // this.order,
      //   this.cat,
      //   this.pageSize,
      //   (this.pageNo - 1) * this.pageSize
    },
    //切换分类
    changeCategory(name) {
      this.cat = name;
      this.getList();
      this.isShow = false;
      this.catCopy = name;
      // this.$bus.$emit("changeClass");
      this.pageNo = 1;
    },
    //热门
    changeHot() {
      this.cat = this.catCopy;
      this.isShow = false;
      this.pageNo = 1;
      this.getList();
    },
    // 全部风格按钮
    allStyle() {
      this.cat = "全部";
      this.order = "hot";
      this.catCopy = "全部";
      this.pageNo = 1;
      this.getList();
    },
    // 点击空白区域隐藏弹出框
    handleClose() {
      this.isShow = false;
    },
    // 获取歌单分类的名字
    getCatList() {
      this.$store.dispatch("getCatList");
    },
  },
};
</script>

<style lang="less" scoped>
.playlist {
  position: relative;
  width: 900px;
  min-height: 700px;
  padding: 40px;
  background: #fff;
  margin: 0 auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  nav {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    padding-bottom: 5px;
    h3 {
      float: left;
      width: 151px;
      height: 40px;
      span {
        position: relative;
        bottom: 2px;
        display: inline-block;
        height: 40px;
        font-size: 24px;
        font-weight: 400;
        color: #333;
      }
      .nav-btn {
        display: inline-block;
        position: relative;
        bottom: 5px;
        width: 86px;
        height: 31px;
        margin: 2px 0 0 12px;
        font-weight: 400;
        background: url("./images/button2.png") 0 -59px no-repeat;
        &::after {
          content: "";
          position: absolute;
          right: -3px;
          width: 5px;
          height: 31px;
          background: url("./images/button2.png")-245px -100px no-repeat;
        }
        i {
          display: inline-block;
          width: 61px;
          height: 31px;
          color: #0c73c2;
          font-size: 12px;
          line-height: 31px;
          text-align: center;
          margin-left: 12px;
          em {
            display: inline-block;
            width: 8px;
            height: 5px;
            background: url("./images/icon.png")-70px -543px no-repeat;
            vertical-align: middle;
            margin-left: 1px;
          }
        }
      }
    }
    .hot {
      float: right;
      position: relative;
      width: 46px;
      height: 29px;
      padding-left: 13px;
      background: url("./images/button.png") 0 0 no-repeat;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: -3px;
        width: 5px;
        height: 31px;
        background: url("./images/button.png")-87px -32px;
      }
      &:hover {
        cursor: pointer;
      }
      &:hover .hot-text {
        text-decoration: underline;
      }
      .hot-text {
        color: #fff;
        line-height: 29px;
      }
    }
  }
  // 弹出框
  .classlist-box {
    width: 720px;
    height: 437px;
    position: absolute;
    top: 75px;
    left: 0;
    z-index: 5;
    .hd {
      position: relative;
      width: 100%;
      height: 32px;
      background: url("./images/sltlyr.png") no-repeat;
      i {
        position: absolute;
        width: 24px;
        height: 11px;
        display: inline-block;
        top: 2px;
        left: 132px;
        background: url("./images/iconall.png") -48px 0 no-repeat;
      }
    }
    .bd {
      width: 100%;
      height: 385px;
      padding: 0 10px;
      background: url("./images/sltlyr.png") repeat-y -720px 0;
      h3 {
        width: 100%;
        height: 38px;
        padding-left: 26px;
        border-bottom: 1px solid #e6e6e6;
        font-weight: normal;
        a {
          display: inline-block;
          width: 75px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          font-size: 12px;
          background: url("./images/button.png") 0 -64px no-repeat;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      dl {
        width: 100%;
        padding-left: 26px;
        dt {
          float: left;
          width: 72px;
          height: auto;
          padding-top: 15px;
          font-weight: 700;

          .lang,
          .style,
          .scene,
          .emotion,
          .theme {
            display: inline-block;
            width: 23px;
            height: 23px;
            margin: 0 3px 0 0;
            background: url("./images/icon.png") -20px -735px no-repeat;
            vertical-align: middle;
          }
          .style {
            background-position: -2px -64px;
            margin-left: 2px;
            margin-right: 1px;
          }
          .scene {
            width: 25px;
            background-position: 0px -88px;
            margin-bottom: 5px;
          }
          .emotion {
            background-position: 0px -118px;
          }
          .theme {
            background-position: 0 -143px;
          }
        }
        dd {
          width: 573px;
          margin-left: 74px;
          padding: 16px 15px 0 15px;
          line-height: 22px;
          border-left: 1px solid #e6e6e6;
          a {
            color: #333;
            &:hover {
              text-decoration: underline;
            }
          }
          span {
            color: #d8d8d8;
            margin: 0 8px 0 10px;
          }
        }
      }
    }
    .ft {
      width: 100%;
      height: 20px;
      background: url("./images/sltlyr.png") -1440px -12px no-repeat;
    }
  }
  // ul
  .pl-container {
    width: 950px;
    margin-top: 20px;
    li {
      float: left;
      position: relative;
      width: 140px;
      height: 204px;
      margin-right: 29px;
      margin-top: 10px;
      line-height: 1.4;
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
        display: inline-block;
        width: 140px;
        color: #000;
        margin-top: 7px;
        &:hover {
          cursor: pointer;
          //   复习:下划线
          text-decoration: underline;
          border-bottom: none !important;
        }
      }
      p {
        &:hover .pl-singer {
          text-decoration: underline;
        }
        .img-detail {
          margin-top: -2px;
          margin-left: 2px;
          width: 13px;
          height: 14px;
        }
      }
    }
  }
}

.color666 {
  color: #666;
}
.font {
  font-family: Arial, Helvetica, sans-serif;
  color: #999;
}
/* 超出部分省略号表示 */
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
</style>

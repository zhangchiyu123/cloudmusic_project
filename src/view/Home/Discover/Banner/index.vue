<template>
  <div class="banner">
    <div class="big_background" v-if="bannerList[Num]">
      <img :src="bannerList[Num].imageUrl" />
    </div>
    <div class="carousel_center">
      <div
        class="button_left"
        @click="reduceNum"
        @mouseenter="endBanner"
        @mouseleave="startBanner"
      ></div>
      <div
        class="button_right"
        @click="AddNum"
        @mouseenter="endBanner"
        @mouseleave="startBanner"
      ></div>
      <div class="banner_center">
        <!-- 轮播 -->
        <div class="carousel_left">
          <div class="banner_list" v-if="bannerList[Num]">
            <img
              :src="bannerList[Num].imageUrl"
              alt=""
              @mouseenter="endBanner"
              @mouseleave="startBanner"
            />
          </div>
          <div class="dotlist">
            <ul>
              <!-- 轮播图的切换小点 -->
              <li
                v-for="(dot, index) in bannerList"
                :key="index"
                class="dot"
                @click="changeImage(index)"
                :class="{ dotColor: index == Num }"
                @mouseenter="endBanner"
                @mouseleave="startBanner"
              ></li>
            </ul>
          </div>
        </div>
        <div class="carousel_right">
          <a href="https://music.163.com/#/download" class="download"></a>
          <span>PC 安卓 iPhone WP Mac 六大客户端</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "banner",
  data() {
    return {
      // 轮播图切换的数值
      Num: 0,
    };
  },
  mounted() {
    // 调用获取banner图的方法
    // this.getBanner();
    this.$store.dispatch("getBannerList");
    // 页面挂在完毕，开启定时器轮播图自动播放
    this.startBanner();
  },
  methods: {
    // 封装获取banner的接口
    // async getBanner() {
    //   let result = await this.$API.reqBanner();
    //   if (result.code == 200) {
    //     this.bannerList = result.banners;
    //   }
    // },
    // 右边按钮，点击图片切换下一张
    AddNum() {
      if (this.Num < this.bannerList.length - 1) {
        this.Num++;
      } else if (this.Num >= this.bannerList.length - 1) {
        this.Num = 0;
      }
    },
    // 左边按钮，点击切换上一张图片
    reduceNum() {
      if (this.Num <= this.bannerList.length && this.Num > 0) {
        this.Num--;
      } else if (this.Num == 0) {
        this.Num = this.bannerList.length - 1;
      }
    },
    // 点击轮播图小按钮切换到对应的banner图
    changeImage(index) {
      this.Num = index;
    },
    // 开启自动播放轮播图
    startBanner() {
      this.timer = setInterval(() => {
        this.AddNum();
      }, 4000);
    },
    // 清除轮播图定时器
    endBanner() {
      clearInterval(this.timer);
    },
  },
  computed: {
    ...mapGetters(["bannerList"]),
  },
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 285px;
  position: relative;
  .big_background {
    z-index: -100;
    height: 285px;
    img {
      width: 100%;
      height: 100%;
      filter: blur(15px);
    }
  }
  .carousel_center {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -550px;
    width: 980px;
    height: 100%;
    .button_left {
      z-index: 100;
      position: absolute;
      top: 100px;
      left: -70px;
      width: 37px;
      height: 63px;
      z-index: 5;
      background: url("./images/banner.png") 0px -360px no-repeat;
      &:hover {
        background-position: 0 -430px;
        cursor: pointer;
      }
    }
    .button_right {
      position: absolute;
      top: 100px;
      left: 1010px;
      width: 37px;
      height: 63px;
      z-index: 5;
      background: url("./images/banner.png") 0px -508px no-repeat;
      &:hover {
        background-position: 0 -578px;
        cursor: pointer;
      }
    }
    .banner_center {
      z-index: 100;
      width: 980px;
      height: 100%;
      margin: 0 auto;
      .carousel_left {
        position: relative;
        float: left;
        width: 730px;
        height: 100%;
        .banner_list {
          width: 100%;
          height: 285px;
          overflow: hidden;
          img {
            width: 730px;
            height: 285px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .dotlist {
          height: 20px;
          position: absolute;
          top: 265px;
          left: 50%;
          margin-left: -90px;
          z-index: 2;
          .dot {
            float: left;
            margin-left: 10px;
            margin-top: 5px;
            width: 7px;
            height: 7px;
            background: #fff;
            border-radius: 50%;
            &:hover {
              background: #c40c0c;
              cursor: pointer;
            }
          }
        }
      }
      .carousel_right {
        float: left;
        position: relative;
        width: 250px;
        height: 285px;
        background: url("./images/download.png") no-repeat;
        .download {
          position: absolute;
          left: 20px;
          top: 186px;
          width: 214px;
          height: 55px;
          background: url("./images/download.png") 0 -291px no-repeat;
          &:hover {
            cursor: pointer;
          }
        }
        span {
          position: absolute;
          top: 253px;
          left: 20px;
        }
      }

      .dotColor {
        background: #c40c0c !important;
      }
    }
  }
}
</style>

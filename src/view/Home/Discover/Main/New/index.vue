<template>
  <div class="new">
    <MainHeader>
      <a slot="name1">新碟上架</a>
    </MainHeader>
    <div class="body">
      <div class="inner">
        <div class="roll">
          <!-- <ul class="roller_flag" ref="roller_flag">
            <li v-for="list in NewAlbumList" :key="list.id">
              <img :src="list.blurPicUrl" alt="" />
              <a class="roll_border"></a>
              <p>{{ list.name }}</p>
              <p>{{ list.artist.name }}</p>
            </li>
          </ul> -->
          <!-- Swiper -->
          <div class="swiper mySwiper">
            <div class="swiper-wrapper roller_flag">
              <div
                class="swiper-slide"
                v-for="list in NewAlbumList"
                :key="list.id"
              >
                <li>
                  <img :src="list.blurPicUrl" alt="" />
                  <a class="roll_border"></a>
                  <p>{{ list.name }}</p>
                  <p>{{ list.artist.name }}</p>
                </li>
              </div>
            </div>
            <div class="right"></div>
            <div class="left"></div>
            <!-- <div class="swiper-pagination"></div> -->
          </div>
        </div>
        <!-- <a class="left" ></a>
        <a class="right"></a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from "swiper";
export default {
  name: "New", //新碟上架组件
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAlbum");
  },
  computed: {
    ...mapGetters(["NewAlbumList"]),
  },
  updated() {
    var swiper = new Swiper(".mySwiper", {
      //设置slider容器能够同时显示的slides数量(carousel模式)
      //可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。
      slidesPerView: "auto",
      // 盒子之间的间距
      spaceBetween: 10,
      //在carousel mode下定义slides的数量多少为一组。
      slidesPerGroup: 4,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: ".right",
        prevEl: ".left",
      },
      // 自动轮播
      autoplay: { delay: 4000, disableOnInteraction: false },
    });
  },
  methods: {
    // pagination: ".swiper-pagination",
    //   slidesPerView: 3,
    //   paginationClickable: true,
    //   spaceBetween: 30,
    // // //向左的箭头回调
    // left() {
    //   let roll = this.$refs.roller_flag;
    //   roll.style.left = roll.offsetLeft - 145 + "px";
    // },
    // // 向右的箭头回调
    // right() {
    //   this.$forceUpdate();
    // },
  },
};
</script>

<style lang="less" scoped>
.new {
  width: 689px;
  margin-bottom: 50px;
  .body {
    width: 100%;
    height: 188px;
    border: 1px solid #d3d3d3;
    .inner {
      position: relative;
      height: 186px;
      background: #f5f5f5;
      padding-left: 16px;
      .left {
        position: absolute;
        top: 75px;
        left: 10px;
        width: 9px;
        height: 12px;
        background: url("./images/index.png")-285px -78px no-repeat;
        &:hover {
          cursor: pointer;
        }
      }
      .right {
        position: absolute;
        top: 75px;
        right: 10px;
        width: 9px;
        height: 12px;
        background: url("./images/index.png")-325px -78px no-repeat;
        &:hover {
          cursor: pointer;
        }
      }
      .roll {
        float: left;
        width: 645px;
        height: 186px;
        overflow: hidden;
        .roller_flag {
          position: relative;
          left: 0;
          width: 1550px;
          height: 150px;
          margin-top: 28px;
          transition: 0.5s;
          li {
            position: relative;
            float: left;
            width: 118px;
            height: 150px;
            margin-left: 11px;
            img {
              width: 100px;
              height: 100px;
            }
            .roll_border {
              width: 118px;
              height: 100px;
              position: absolute;
              top: 0;
              left: 0;
              background: url("./images/coverall.png") 0 -570px no-repeat;
            }
          }
        }
      }
    }
  }
}

.swiper-slide {
  width: 118px !important;
}
</style>

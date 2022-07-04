<template>
  <div class="catrgory">
    <div class="category-boxes">
      <ul class="boxes-ul1" v-if="isShow == true">
        <li
          v-for="(catelist, index) in categoryList.slice(0, 18)"
          :key="index"
          @click="changeIcon(catelist, index)"
          :class="{ active: isIndex == index }"
        >
          <a>
            <div
              class="icon"
              :style="`background:url(${catelist.picWebUrl})`"
            ></div>
            <em>{{ catelist.name }}</em>
          </a>
        </li>
      </ul>
      <ul class="boxes-ul2" v-else>
        <li
          v-for="(catelist2, index) in categoryList.slice(18, 19)"
          :key="index"
        >
          <a>
            <div
              class="icon"
              :style="`background:url(${catelist2.picWebUrl})`"
            ></div>
            <em>{{ catelist2.name }}</em>
          </a>
        </li>
      </ul>
      <span
        class="prev"
        @click="isShow = true"
        :class="{ opacity025: isShow == false }"
      ></span>
      <span
        class="next"
        @click="isShow = false"
        :class="{ opacity008: isShow != true }"
      ></span>
      <div class="dot">
        <span
          class="dot-left"
          :class="{ gray: isShow != true }"
          @click="isShow = true"
        ></span>
        <span
          class="dot-right"
          :class="{ red: isShow == false }"
          @click="isShow = false"
        ></span>
      </div>
    </div>
    <!-- 推荐节目/节目排行榜 -->
    <div class="recommend clearfix">
      <div class="program">
        <div class="title">
          <h3>推荐节目</h3>
          <a>更多 ></a>
        </div>
        <ul class="toplist">
          <li v-for="recommend in programs" :key="recommend.id">
            <a>
              <img :src="recommend.coverUrl" />
              <i></i>
            </a>
            <div class="cnt">
              <h3>{{ recommend.name }}</h3>
              <p>{{ recommend.radio.name }}</p>
            </div>
            <a class="tag">{{ recommend.radio.category }}</a>
          </li>
        </ul>
      </div>
      <!-- 节目排行榜 -->
      <div class="program2">
        <div class="title">
          <h3>节目排行榜</h3>
          <a>更多 ></a>
        </div>
        <ul class="toplist">
          <li v-for="toplist in programToplist" :key="toplist.id">
            <a>
              <img :src="toplist.program.coverUrl" alt="" />
              <i></i>
            </a>
            <div class="cnt over">
              <h3>{{ toplist.program.name }}</h3>
              <p>{{ toplist.program.description }}</p>
            </div>
            <a class="tag">明星专区</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 音乐推荐·电台 -->
    <div class="rdimore" v-for="(toplist, index) in hotlist" :key="index">
      <div class="rm-title">
        <h3 name="title">{{ toplist.name }} · 电台</h3>
        <a>更多 ></a>
      </div>
      <ul class="rm-ul clearfix">
        <li v-for="(item, index) in toplist.data" :key="index">
          <a>
            <img :src="item.picUrl" alt="" />
          </a>
          <div class="cnt">
            <h3 class="hhh3">{{ item.name }}</h3>
            <p>{{ item.rcmdtext }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Category", //分类组件
  data() {
    return {
      // 控制顶部分类显示隐藏
      isShow: true,
      categoryList: [],
      isIndex: -1,
      radioId: [3001, 2, 2001, 3, 10002], // 分类电台的id
    };
  },
  mounted() {
    this.getCateList();
    this.$store.dispatch("getProgram");
    this.$store.dispatch("getProgramToplist");
    this.$store.dispatch("getDjprogram");
    this.getHotRadio();
  },
  methods: {
    // 获取电台分类的图标  then方法
    getCateList() {
      this.$API
        .reqCateList()
        .then((res) => {
          this.categoryList = res.categories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeIcon(list, index) {
      this.isIndex = index;
    },
    // 获取五次类别热门电台
    getHotRadio() {
      for (let i = 0; i < 5; i++) {
        this.$store.dispatch("getHotDjRadio", this.radioId[i]);
      }
    },
    //     // 获取五次类别热门电台
    //     async getHotRadio() {
    //       for (let i = 0; i < 5; i++) {
    //         let result = await this.$API.reqHotDjRadio(this.radioId[i]);
    //         console.log(result);
    //         let x = {};
    //         x.id = this.radioId[i];
    //         x.name = result.djRadios[1].category;
    //         x.data = result.djRadios.slice(0, 4);
    //         this.djList.push(x);
    //       }
    //     },
  },
  computed: {
    ...mapGetters(["programs", "programToplist", "djprogram"]),
    ...mapState({
      hotlist: (state) => state.home.hotlist,
    }),
  },
};
</script>

<style lang="less" scoped>
.catrgory {
  width: 980px;
  padding: 40px;
  .category-boxes {
    position: relative;
    width: 900px;
    height: 194px;
    .boxes-ul1,
    .boxes-ul2 {
      display: block;
      margin-left: -33px;
      li {
        float: left;
        margin: 0 0 25px 33px;
        &:hover {
          background-color: #f6f7f7;
        }
        a {
          display: block;
          width: 70px;
          height: 70px;
          color: #666;
          text-align: center;
          .icon {
            width: 48px;
            height: 48px;
            margin: 2px auto 0;
          }
        }
      }
    }

    .prev {
      position: absolute;
      top: 50%;
      margin-top: -26px;
      left: -20px;
      width: 20px;
      height: 30px;
      background: url("../images/radio_slide.png") -4px -35px no-repeat;
      opacity: 0.08;
      cursor: pointer;
    }
    .next {
      position: absolute;
      top: 50%;
      margin-top: -26px;
      right: -28px;
      width: 20px;
      height: 30px;
      background: url("../images/radio_slide.png")-35px -35px no-repeat;
      opacity: 0.25;
      cursor: pointer;
    }
    .dot {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      text-align: center;
      .dot-left,
      .dot-right {
        width: 20px;
        height: 20px;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 0;
        background: url("../images/radio_slide.png")-30px 0 no-repeat;
      }
      .dot-right {
        background-position: 0 0;
      }
    }
  }
  .recommend {
    width: 100%;
    margin-top: 10px;
    .program,
    .program2 {
      width: 426px;
      float: left;
      .title {
        width: 100%;
        height: 40px;
        border-bottom: 2px solid #c20c0c;
        h3 {
          float: left;
          font-size: 24px;
          cursor: pointer;
          font-weight: 400;
        }
        a {
          float: right;
          color: #666;
          margin-top: 14px;
        }
      }
      .toplist {
        width: 100%;
        height: 600px;
        border: 1px solid #e2e2e2;
        border-top: none;
        & li:nth-child(even) {
          background-color: #f7f7f7;
        }
        li {
          width: 424px;
          height: 60px;
          padding: 10px 0;
          line-height: 40px;
          &:hover {
            background-color: #eeeeee;
          }
          a {
            display: block;
            float: left;
            position: relative;
            width: 40px;
            height: 40px;
            margin-left: 20px;
            &:hover i {
              display: block;
            }
            img {
              width: 100%;
              height: 100%;
            }
            i {
              display: none;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -11px;
              margin-left: -11px;
              width: 22px;
              height: 22px;
              background: url("../images/iconall.png") 0 -85px no-repeat;
            }
          }
          .cnt {
            float: left;
            width: 254px;
            margin: 1px 0 0 10px;
            line-height: 20px;

            h3 {
              color: #333;
              cursor: pointer;
              font-size: 100%;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
            }
            p {
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
            }
          }
          .tag {
            display: inline-block;
            position: relative;
            top: -1px;
            font-size: 12px;
            width: auto;
            height: 16px;
            margin: 12px 0 0 10px;
            color: #999;
            border: 1px solid #999;
            line-height: 16px;
            padding: 0 6px;
            overflow: hidden;
            vertical-align: center;
            &:hover {
              color: #333;
              border-color: #333;
            }
          }
        }
      }
    }
    .program2 {
      float: right;
    }
  }
  .rdimore {
    width: 900px;
    margin-top: 35px;
    .rm-title {
      width: 100%;
      height: 40px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        font-size: 24px;
        font-weight: 400;
        color: #333;
      }
      a {
        display: block;
        float: right;
        margin-top: 14px;
        color: #666;
      }
    }
    .rm-ul {
      width: 100%;
      overflow: hidden;
      li {
        float: left;
        width: 435px;
        height: 160px;
        padding: 20px 0;
        border-bottom: 1px solid #e7e7e7;
        a {
          display: block;
          width: 120px;
          height: 120px;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cnt {
          float: left;
          width: 295px;
          margin-left: 10px;
          h3 {
            margin: 16px 0 20px 10px;
            font-size: 18px;
          }
          P {
            color: #666;
            margin-left: 10px;
          }
        }
      }
    }
  }
}

.opacity008 {
  opacity: 0.08 !important;
}
.opacity025 {
  opacity: 0.25 !important;
}
.red {
  background-position: -30px 0 !important;
}
.gray {
  background-position: 0 0 !important;
}
// 选中某一个小分类时
.active {
  background: url("../images/radio_bg.png") -70px 0 no-repeat;
  .icon {
    background-position: 48px 0 !important;
  }
}
</style>

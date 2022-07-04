<template>
  <div class="list">
    <MainHeader>
      <a slot="name1">榜单</a>
    </MainHeader>
    <div class="body">
      <dl class="whole">
        <dt class="top">
          <div class="cover">
            <img
              src="http://p4.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg?param=100y100"
              title="飙升榜"
            />
            <a class="msk"></a>
          </div>
          <div class="tit">
            <a title="飙升榜">
              <h3>飙升榜</h3>
            </a>
            <div class="btn">
              <a class="play"></a>
              <a class="collection"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol v-if="this.topListDetail[0]">
            <li
              v-for="(soar, index) in soarList"
              :key="index"
              :class="{ e8e8e8: index % 2 == 0 }"
            >
              <span class="number" :class="{ c10d0C: index < 3 }">{{
                index + 1
              }}</span>
              <a class="music">
                <span class="music_text">{{ soar.first }}</span>
              </a>
              <div class="play_btn">
                <a class="btn1"></a>
                <a class="btn2"></a>
                <a class="btn3"></a>
              </div>
            </li>
          </ol>
          <div class="more"><span>查看全部></span></div>
        </dd>
      </dl>
      <!-- 新歌榜 -->
      <dl class="whole">
        <dt class="top">
          <div class="cover">
            <img
              src="http://p4.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg?param=100y100"
              title="新歌榜"
            />
            <a class="msk"></a>
          </div>
          <div class="tit">
            <a title="新歌榜">
              <h3>新歌榜</h3>
            </a>
            <div class="btn">
              <a class="play"></a>
              <a class="collection"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol v-if="this.topListDetail[1]">
            <li
              v-for="(news, index) in newList"
              :key="index"
              :class="{ e8e8e8: index % 2 == 0 }"
            >
              <span class="number" :class="{ c10d0C: index < 3 }">{{
                index + 1
              }}</span>
              <a class="music">
                <span class="music_text">{{ news.first }}</span>
              </a>
              <div class="play_btn">
                <a class="btn1"></a>
                <a class="btn2"></a>
                <a class="btn3"></a>
              </div>
            </li>
          </ol>
          <div class="more"><span>查看全部></span></div>
        </dd>
      </dl>
      <!-- 原创榜 -->
      <dl class="whole" style="border-right: none">
        <dt class="top">
          <div class="cover">
            <img
              src="http://p3.music.126.net/iFZ_nw2V86IFk90dc50kdQ==/109951166961388699.jpg?param=100y100"
              title="原创榜"
            />
            <a class="msk"></a>
          </div>
          <div class="tit">
            <a title="原创榜">
              <h3>原创榜</h3>
            </a>
            <div class="btn">
              <a class="play"></a>
              <a class="collection"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol v-if="this.topListDetail[2]">
            <li
              v-for="(original, index) in originalList"
              :key="index"
              :class="{ e8e8e8: index % 2 == 0 }"
            >
              <span class="number" :class="{ c10d0C: index < 3 }">{{
                index + 1
              }}</span>
              <a class="music">
                <span class="music_text">{{ original.first }}</span>
              </a>
              <div class="play_btn">
                <a class="btn1"></a>
                <a class="btn2"></a>
                <a class="btn3"></a>
              </div>
            </li>
          </ol>
          <div class="more"><span>查看全部></span></div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RankingList", // 首页榜单组件
  data() {
    return {
      // idx: 3, //云音乐飙升榜参数
    };
  },
  mounted() {
    this.$store.dispatch("getTopList"); // 获取全部榜单，分类获取的接口暂时500挂掉了
    this.$store.dispatch("getTopListDetail"); // 获取全部榜单摘要
  },
  computed: {
    ...mapGetters(["topListDetail"]), // 全部榜单摘要的数据
    // 飙升
    soarList() {
      return this.topListDetail[0].tracks;
    },
    // 新歌
    newList() {
      return this.topListDetail[1].tracks;
    },
    // 原创
    originalList() {
      return this.topListDetail[2].tracks;
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  width: 689px;
  .body {
    width: 686px;
    height: 472px;
    background: #f4f4f4;
    border: 1px solid #ccc;
    .whole {
      margin-left: -2px;
      float: left;
      width: 230px;
      height: 472px;
      border-right: 1px solid #ccc;
      .top {
        position: relative;
        width: 100%;
        height: 100px;

        padding: 20px 0 0 20px;
        .cover {
          position: relative;
          width: 80px;
          height: 80px;
          img {
            width: 80px;
            height: 80px;
          }
          .msk {
            position: absolute;
            top: 0;
            left: 0;
            width: 80px;
            height: 80px;
            background: url("./images/coverall.png") -145px -57px no-repeat;
          }
        }
        .tit {
          position: absolute;
          top: 20px;
          left: 100px;
          width: 116px;
          height: 51px;
          margin: 6px 0 0 10px;
          h3 {
            width: 45px;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: normal;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
          .play,
          .collection {
            display: block;
            float: left;
            margin-top: 5px;
            width: 22px;
            height: 22px;
            background: url("./images/index.png") -267px -205px no-repeat;
            margin-right: 10px;
            &:hover {
              background-position: -267px -235px;
              cursor: pointer;
            }
          }
          .collection {
            margin-top: 6px;
            background-position: -300px -207px;
            vertical-align: middle;
            &:hover {
              background-position: -300px -237px;
              cursor: pointer;
            }
          }
        }
      }
      dd {
        margin-top: 10px;
        width: 100%;
        height: 352px;

        li {
          position: relative;
          width: 227px;
          margin-left: 2px;
          height: 32px;
          &:hover .play_btn .btn1 {
            display: block;
            cursor: pointer;
          }
          &:hover .play_btn .btn2 {
            display: block;
            cursor: pointer;
          }
          &:hover .play_btn .btn3 {
            display: block;
            cursor: pointer;
          }
          .number {
            display: block;
            float: left;
            width: 35px;
            height: 32px;
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            margin-left: 10px;
          }
          .music {
            float: left;
            width: 170px;
            height: 32px;
            line-height: 32px;
            .music_text {
              display: inline-block;
              width: 100px;
              height: 32px;
              text-overflow: ellipsis;
              white-space: normal;
              overflow: hidden;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
          .play_btn {
            position: absolute;
            top: 0;
            left: 140px;
            width: 82px;
            height: 32px;

            .btn1,
            .btn2,
            .btn3 {
              float: left;
              display: none;
              width: 20px;
              height: 20px;
              background-size: cover;
            }
            .btn1 {
              background: url("./images/index.png") -267px -268px no-repeat;
              margin-right: 8px;
              margin-top: 6px;
            }
            .btn2 {
              background: url("./images/icon.png") -20px -700px no-repeat;
              margin-top: 8px;
              margin-right: 8px;
              height: 18px;
            }
            .btn3 {
              background: url("./images/index.png") -300px -237px no-repeat;
              margin-top: 5px;
            }
          }
        }
        .more {
          color: #000;
          width: 100%;
          height: 32px;
          padding-left: 152px;
          span {
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}

.c10d0C {
  color: #c10d0c;
}

.e8e8e8 {
  background-color: #e8e8e8;
}
</style>

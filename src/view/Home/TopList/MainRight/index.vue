<template>
  <div class="main_right clearfix">
    <div class="main clearfix">
      <div class="header">
        <div class="header_img">
          <img :src="playList.coverImgUrl" alt="" />
          <span class="msk"></span>
        </div>
        <div class="header_cnt">
          <div class="info">
            <div class="hd">
              <h2>{{ playList.name }}</h2>
            </div>
            <div class="user">
              <i class="user_icon"></i>
              <span class="sep"
                >最近更新: &nbsp;<CurrentTime></CurrentTime
              ></span>
              <span style="color: #999">{{ playList.updateFrequency }}</span>
            </div>
            <div class="btns">
              <a class="btns-1">
                <em class="ply"></em>
                播放
              </a>
              <a class="btns-mini"></a>
              <a class="btns-2"
                ><i>({{ playList.subscribedCount }})</i></a
              >
              <a class="btns-3"
                ><i>({{ playList.shareCount }})</i></a
              >
              <a class="btns-4"><i>(下载)</i></a>
              <a class="btns-5"
                ><i>({{ playList.commentCount }})</i></a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="music_list"></div>
    </div>
    <div class="form">
      <div class="form-header">
        <h3>歌曲列表</h3>
        <span>{{ tracks.length }}首歌</span>
        <em
          >播放:<i style="color: #c20c0c">{{ playList.playCount }}</i
          >次</em
        >
      </div>
      <div class="table-list">
        <table>
          <thead>
            <tr>
              <th class="number"></th>
              <th class="title">标题</th>
              <th class="duration">时长</th>
              <th class="songer">歌手</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list1, index) in tracks" :key="index">
              <td class="tbody-number">
                <span>{{ index + 1 }}</span>
                <i></i>
              </td>
              <td class="tbody-title">
                <div class="tt-box">
                  <div class="tt-pic">
                    <a>
                      <img
                        :src="list1.al.picUrl"
                        v-show="index < 3"
                        :class="{ rank: index < 3 }"
                      />
                    </a>
                  </div>
                  <div class="tt-song over1" :class="{ rank20: index < 3 }">
                    <i :class="{ rank: index < 3 }" @click="play(list1.id)"></i>
                    <span :class="{ rank: index < 3 }">{{ list1.name }}</span>
                  </div>
                </div>
              </td>
              <td class="tbody-duration">
                <!-- 歌曲时长 -->
                <span>{{ min(list1) }}:{{ sec(list1) }}</span>
              </td>
              <td class="tbody-songer">
                <span>{{ list1.ar[0].name }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainRight",
  data() {
    return {
      index: "",
    };
  },
  mounted() {
    // this.$store.dispatch("getTopListIdx");
    this.$store.dispatch("getTopListDetail");
    // 获取歌曲详情，需要传入id
    this.$store.dispatch("getSongDetail");
    // // 全局事件传索引号过来
    this.$bus.$on("getSongList", this.getSongList);
    // 组件一挂载就发一次请求显示飙升榜的数据,原本想用header组件全局事件总线点击触发
    this.$store.dispatch("getPlayList", 19723756);
  },
  computed: {
    ...mapGetters(["topListDetail", "playList", "tracks"]),
    cloudMusicTopList() {
      return this.topListDetail.slice(0, 4);
    },
    id() {
      return this.$route.query.id;
    },
  },
  methods: {
    getSongList() {
      // 获取歌曲详情,需传入id
      // this.index = this.$route.query.id;
      this.$store.dispatch("getPlayList", this.id);
    },
    // 歌曲时长
    min(song) {
      if (parseInt(song.dt / 60000) < 10) {
        return "0" + parseInt(song.dt / 60000);
      } else {
        return parseInt(song.dt / 60000);
      }
    },
    sec(song) {
      let x = parseInt(song.dt / 60000);
      let y = parseInt(song.dt / 1000 - x * 60);
      if (y < 10) return "0" + y;
      else return y;
    },
    play(id) {
      try {
        this.$store.dispatch("getSongUrl", id);
        this.$bus.$emit("songId", id);
        this.$bus.$emit("songDetail");
        this.$bus.$emit("playSong");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main_right {
  float: left;
  width: 740px;
  background: #fff;
  .main {
    width: 740px;
    padding: 40px;
    border-left: 1px solid #d3d3d3;
    .header {
      width: 660px;
      height: 158px;
      display: flex;
      .header_img {
        position: relative;
        width: 158px;
        height: 158px;
        padding-left: 3px;
        padding-top: 3px;
        border: 1px solid #ccc;
        img {
          width: 150px;
          height: 150px;
        }
        .msk {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 150px;
          height: 150px;
          background: url("../images/coverall.png") -230px -380px no-repeat;
        }
      }
      .header_cnt {
        width: 500px;
        height: 158px;
        padding-top: 10px;
        padding-left: 30px;
        .info {
          width: 473px;
          height: 114px;
          .hd {
            width: 473px;
            height: 35px;
            h2 {
              font-weight: 400;
              color: #333;
            }
          }
          .user {
            width: 473px;
            height: 35px;
            overflow: hidden;
            .user_icon {
              vertical-align: middle;
              display: inline-block;
              margin-right: 5px;
              width: 13px;
              height: 13px;
              background: url("../images/icon.png")-18px -682px no-repeat;
            }
            .sep {
              margin-right: 10px;
            }
          }
          .btns {
            width: 483px;
            height: 31px;
            .btns-1 {
              float: left;
              vertical-align: middle;
              width: 61px;
              height: 31px;
              padding-left: 10px;
              background: url("../images/button2.png") 0 -633px no-repeat;
              color: #fff;
              &:hover {
                background-position: 0 -719px;
              }
              .ply {
                display: inline-block;
                width: 20px;
                height: 18px;
              }
            }
            .btns-mini {
              float: left;
              width: 31px;
              height: 31px;
              background: url("../images/button2.png") 0 -1588px no-repeat;
              margin-right: 5px;
              &:hover {
                background-position: -40px -1588px;
              }
            }
          }
          .btns-2,
          .btns-3,
          .btns-4,
          .btns-5 {
            float: left;
            width: auto;
            height: 31px;
            background: url("../images/button2.png") 0 -977px no-repeat;
            line-height: 31px;
            padding-left: 5px;
            font-size: 10px;
            font-family: simsun, \5b8b\4f53;
            color: #333;
            margin-right: 5px;
            &::after {
              content: "";
              float: right;
              width: 6px;
              height: 31px;
              background: url("../images/button2.png") -244px -1020px no-repeat;
            }
            i {
              width: auto;
              height: 31px;
              margin-left: 20px;
            }
          }
          .btns-3 {
            width: 82px;
            background-position: 0 -1225px;
          }
          .btns-4 {
            background-position: 0 -2761px;
          }
          .btns-5 {
            background-position: 0 -1465px;
          }
        }
      }
    }
  }
  .form {
    width: 670px;
    padding: 0 30px 40px 40px;
    border-left: 1px solid #d3d3d3;
    .form-header {
      width: 670px;
      height: 33px;
      border-bottom: 2px solid #c20c0c;
      h3 {
        float: left;
        width: 80px;
        height: 29px;
        line-height: 29px;
        color: #333;
        font-weight: 400;
        font-size: 20px;
      }
      span {
        float: left;
        font-family: Arial, Helvetica, sans-serif;
        color: #666;
        margin: 9px 0 0 20px;
        height: 16px;
      }
      em {
        float: right;
        height: 16px;
        margin-top: 7px;
        line-height: 16px;
      }
    }
    .table-list {
      width: 670px;
      table {
        width: 100%;
        thead {
          width: 650px;
          height: 38.5px;
          border-bottom: 1px solid #d9d9d9;
          tr {
            width: 650px;
            height: 38px;
            text-align: left;
            .number {
              width: 77px;
              height: 100%;
              font-weight: 400;
              border-right: 1px solid #d9d9d9;
              background: -webkit-linear-gradient(#ffffff, #f0f0f0);
              box-shadow: 0 1px 1px 1px rgb(0 0 0 /10%);
            }
            .title {
              width: 326px;
              padding: 8px 10px;
              font-weight: 400;
              color: #666;
              border-right: 1px solid #d9d9d9;
              background: -webkit-linear-gradient(#ffffff, #f0f0f0);
              box-shadow: 0 1px 1px 1px rgb(0 0 0 /10%);
            }
            .duration {
              width: 91px;
              padding: 8px 10px;
              font-weight: 400;
              border-right: 1px solid #d9d9d9;
              background: -webkit-linear-gradient(#ffffff, #f0f0f0);
              box-shadow: 0 1px 1px 1px rgb(0 0 0 /10%);
            }
            .songer {
              width: auto;
              padding: 8px 10px;
              font-weight: 400;
              border-right: 1px solid #d9d9d9;
              background: -webkit-linear-gradient(#ffffff, #f0f0f0);
              box-shadow: 0 1px 1px 1px rgb(0 0 0 /10%);
            }
          }
        }
        tbody {
          width: 670px;
          border: 1px solid #d9d9d9;
          border-top: none;
          & tr:nth-child(even) {
            background: rgb(251, 231, 235);
          }
          tr {
            width: 100%;
            background: #f7f7f7;
            .tbody-number {
              width: 77px;
              padding: 6px 10px 6px 10px;
              span {
                display: inline-block;
                width: 25px;
                height: 18px;
                text-align: center;
              }
              i {
                display: inline-block;
                width: 16px;
                height: 17px;
                background: url("../images/icon.png")-67px -283px no-repeat;
                vertical-align: middle;
                margin-left: 5px;
              }
            }
            .tbody-title {
              width: 326px;

              .tt-box {
                .tt-pic {
                  float: left;
                  width: 50px;
                  margin-right: 14px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .tt-song {
                  float: left;

                  i {
                    display: block;
                    float: left;
                    width: 17px;
                    height: 17px;
                    background: url("../images/table.png") 0 -103px no-repeat;
                    margin: 6px 8px 0 0;
                    &:hover {
                      background-position: 0 -128px;
                      cursor: pointer;
                    }
                  }
                  span {
                    display: block;
                    float: left;
                    margin-top: 7px;
                    &:hover {
                      cursor: pointer;
                      text-decoration: underline;
                    }
                  }
                }
              }
            }
            .tbody-duration {
              width: 91px;
              span {
                display: block;
                width: auto;
                height: auto;
                padding-left: 10px;
              }
            }
            .tbody-songer {
              width: auto;
              padding-left: 10px;
            }
          }
        }
      }
    }
  }
}

.rank {
  // 前三个盒子加外边距
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
.rank20 {
  padding-top: 18px !important;
}
/* 超出部分省略号表示 */
.over1 {
  text-overflow: ellipsis;
}
</style>

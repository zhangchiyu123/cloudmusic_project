<template>
  <div>
    <Homeheader></Homeheader>
    <div class="sbd">
      <div class="main">
        <div class="search">
          <input
            type="text"
            v-model="keyword"
            @keyup.enter="searchDetail"
            spellcheck="false"
          />
          <a class="search-bt" @click="searchDetail"></a>
        </div>
        <!-- 内容主体区域 -->
        <article>
          <div class="user">
            搜索"{{ keyword }}"，找到
            <em style="color: #c20c0c">{{ songsList.length }}</em>
            {{ option }} {{ option2 }}
          </div>
          <ul class="user-ul">
            <li
              v-for="(tabList, index) in searchOptions"
              :key="index"
              @click="tabSwitch(index, tabList.type)"
              :class="{ active: showClass == index }"
            >
              <!-- @click="tabSwitch(tabList, searchOptions)" -->
              <!-- :class="{ active: tabList.isShow == index }" -->
              <a>
                <em>{{ tabList.name }}</em>
              </a>
            </li>
          </ul>
          <!-- 需要切换的主体部分 -->
          <div class="object">
            <div class="b-object">
              <!-- 单曲部分 -->
              <div class="object-song" v-show="showClass == 0">
                <div class="item" v-for="songs in songsList" :key="songs.id">
                  <div class="td" @click="play(songs.id)"></div>
                  <div class="text">
                    <a>{{ songs.name }}</a>
                    <span v-if="songs.album.alia">
                      <em>- ({{ songs.album.alia[0] }})</em>
                    </span>
                  </div>
                  <div class="singer over">
                    <a
                      v-for="singer in songs.artists"
                      :key="singer.id"
                      :title="singer.name"
                      >{{ singer.name }}</a
                    >
                  </div>
                  <div class="Album over">
                    <a>《{{ songs.album.name }}》</a>
                  </div>
                  <div class="time">{{ min(songs) }}:{{ sec(songs) }}</div>
                </div>
              </div>
              <!-- 歌手部分 -->
              <div class="object-Singer" v-show="showClass == 1">
                <ul class="Singer-ul">
                  <li v-for="singer in singerList" :key="singer.id">
                    <div class="picture">
                      <a>
                        <img :src="singer.img1v1Url" alt="" />
                        <span class="msk"></span>
                      </a>
                    </div>
                    <p>{{ singer.name }}</p>
                  </li>
                </ul>
              </div>
              <!-- 专辑部分 -->
              <div class="object-Album" v-show="showClass == 2">
                <ul>
                  <li v-for="albums in albumsList" :key="albums.id">
                    <div class="cover">
                      <a class="cover-img">
                        <img :src="albums.blurPicUrl" alt="" />
                        <span class="msk"></span>
                      </a>
                      <a class="play"></a>
                    </div>
                    <p class="over Oc73c2">{{ albums.name }}</p>
                    <h5>{{ albums.artists[0].name }}</h5>
                  </li>
                </ul>
              </div>
              <!-- 歌单部分 -->
              <div class="object-songsheet" v-show="showClass == 3">
                <table>
                  <tbody>
                    <tr
                      v-for="(playLists, index) in playlistsList"
                      :key="index"
                    >
                      <td class="td1">
                        <span></span>
                      </td>
                      <td class="td2">
                        <div class="two-box">
                          <a>
                            <img :src="playLists.coverImgUrl" alt="" />
                            <span></span>
                          </a>
                        </div>
                      </td>
                      <td class="td3">
                        <span class="song Oc73c2">{{ playLists.name }}</span>
                      </td>
                      <td class="td4">{{ playLists.trackCount }}首</td>
                      <td class="td5">
                        <div class="text">
                          <span style="color: #666">by</span>&nbsp;&nbsp;
                          <a style="color: #666">{{
                            playLists.creator.nickname
                          }}</a>
                        </div>
                      </td>
                      <td class="td6">
                        收藏:
                        <span>{{ Collection[index].number }}</span>
                      </td>
                      <td class="td7">
                        收听:&nbsp;
                        <span>{{ playCount[index].number }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 用户部分 -->
              <div class="object-user" v-show="showClass == 4">
                <table>
                  <tbody>
                    <tr v-for="user in userList" :key="user.id">
                      <td class="td1">
                        <div class="td1-box">
                          <a>
                            <img :src="user.avatarUrl" alt="" />
                            <span class="msk1"></span>
                          </a>
                        </div>
                      </td>
                      <td class="td2">
                        <div class="name">
                          <a class="over">
                            <span class="name1">{{ user.nickname }}</span>
                            <span class="icon1" v-if="user.avatarDetail">
                              <img
                                :src="user.avatarDetail.identityIconUrl"
                                alt=""
                              />
                            </span>
                            <i class="icon2"></i>
                          </a>
                        </div>
                        <p class="detail over">{{ user.signature }}</p>
                      </td>
                      <td class="td3">
                        <a>关注</a>
                      </td>
                      <td class="td4">歌单: {{ user.gender }}</td>
                      <td class="td5">
                        粉丝:
                        <span>262153</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Homeheader from "@/components/Homeheader";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      // tab栏选项
      searchOptions: [
        {
          name: "单曲",
          type: 1,
          isShow: 0,
        },
        {
          name: "歌手",
          type: 100,
          isShow: 0,
        },
        {
          name: "专辑",
          type: 10,
          isShow: 0,
        },
        {
          name: "歌单",
          type: 1000,
          isShow: 0,
        },
        {
          name: "用户",
          type: 1002,
          isShow: 0,
        },
      ],
      showClass: 0,
      // 关键字
      keyword: this.$route.params.searchText,
      option: "",
      option2: "",
    };
  },
  components: {
    Homeheader,
  },
  methods: {
    // 切换选项卡换背景 forEach方法
    // tabSwitch(tabList, searchOptions) {
    //   searchOptions.forEach((item) => {
    //     item.isShow = 0;
    //   });
    //   tabList.isShow = 1;
    // },
    // 切换选项卡换背景  索引号方法
    tabSwitch(index, type) {
      this.showClass = index;
      // console.log(type);
      this.$store.dispatch("getSearchResult", {
        keyword: this.keyword,
        limit: 20,
        type: type,
      });
      let path = this.showClass;
      switch (path) {
        case 0:
          this.option = "首";
          this.option2 = "单曲";
          break;
        case 1:
          this.option = "位";
          this.option2 = "歌手";
          break;
        case 2:
          this.option = "首";
          this.option2 = "专辑";
          break;
        case 3:
          this.option = "个";
          this.option2 = "歌单";
          break;
        case 4:
          this.option = "位";
          this.option2 = "用户";
          break;
      }
    },
    // 搜索
    getSongs() {
      // 封装搜索的请求
      this.$store.dispatch("getSearchResult", {
        keyword: this.keyword,
        limit: 20,
        type: 1,
      });
    },
    //歌曲时长
    min(songs) {
      if (parseInt(songs.duration / 60000) < 10) {
        return "0" + parseInt(parseInt(songs.duration / 60000));
      } else {
        return parseInt(songs.duration / 60000);
      }
    },
    sec(songs) {
      let x = parseInt(songs.duration / 60000);
      let y = parseInt(songs.duration / 1000 - x * 60);
      if (y < 10) return "0" + y;
      else return y;
    },
    // 动态得到 个 首等切换的值....
    getOption() {
      let path = this.showClass;
      switch (path) {
        case 0:
          this.option = "首";
          this.option2 = "单曲";
          break;
        case 1:
          this.option = "位";
          this.option2 = "歌手";
          break;
        case 2:
          this.option = "首";
          this.option2 = "专辑";
          break;
        case 3:
          this.option = "个";
          this.option2 = "歌单";
          break;
        case 4:
          this.option = "位";
          this.option2 = "用户";
          break;
      }
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
    searchDetail() {
      // 封装搜索的请求
      this.$store.dispatch("getSearchResult", {
        keyword: this.keyword,
        limit: 20,
        type: 1,
      });
    },
  },
  mounted() {
    this.getSongs();
    this.getOption();
    this.$bus.$emit("changeHeader", 100);
  },
  computed: {
    ...mapGetters([
      "songsList",
      "singerList",
      "albumsList",
      "playlistsList",
      "userList",
    ]),
    // 收藏量,绕来绕去..笨办法
    Collection() {
      return this.playlistsList.map((item) => {
        let x = {};
        x.number =
          item.bookCount > 100000
            ? parseInt(item.bookCount / 10000) + "万"
            : item.bookCount;
        return x;
      });
    },
    // 收听量
    playCount() {
      return this.playlistsList.map((item) => {
        let x = {};
        x.number =
          item.playCount > 100000
            ? parseInt(item.playCount / 10000) + "万"
            : item.playCount;
        return x;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sbd {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .main {
    padding: 40px;
    .search {
      width: 420px;
      height: 40px;
      margin: 0 auto;
      background: url("./images/sprite.png") 0 0 no-repeat;
      input {
        float: left;
        width: 320px;
        height: 17px;
        margin: 12px 0 0 20px;
        padding: 0;
        background: #fff;
        font-size: 12px;
      }
      .search-bt {
        float: right;
        width: 50px;
        height: 40px;
        background: url("./images/sprite.png") 0 9999px no-repeat;
        &:hover {
          background-position: -430px 0;
        }
      }
    }
    article {
      .user {
        color: #999;
        margin: 28px 0 17px 0;
      }
      .user-ul {
        width: 100%;
        height: 39px;
        border: 1px solid #ccc;
        border-top: 0;
        border-bottom: 0;
        background: url("./images/tab.png") 0 0 repeat-x;
        li {
          float: left;
          width: 20%;
          height: 37px;
          font-size: 14px;
          text-align: center;
          border-top: 2px solid #ccc;
          &:hover {
            border-top: 2px solid #d13030;
          }
          a {
            float: left;
            width: 100%;
            height: 37px;
            line-height: 37px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
      .object {
        .b-object {
          margin-top: 20px;
          .object-song {
            .item {
              padding: 10px 10px 8px 18px;
              &:nth-child(even) {
                background-color: #f7f7f7;
              }
              height: 43px;
              .td {
                float: left;
                width: 17px;
                height: 17px;
                margin-right: 5px;
                cursor: pointer;
                background: url("./images/table.png") 0 -103px no-repeat;
              }
              .text {
                float: left;
                width: 450px;
                a {
                  color: #0c73c2;
                  &:hover {
                    text-decoration: underline;
                  }
                }
                em {
                  color: #aeaeae;
                }
              }
              .singer {
                float: left;
                width: 15%;
                margin-right: 30px;
                a {
                  &::after {
                    content: "/";
                  }
                  &:last-child {
                    &::after {
                      content: "";
                    }
                  }
                }
              }
              .Album {
                float: left;
                width: 18%;
                margin-right: 12px;
              }
            }
          }
          .object-Singer {
            .Singer-ul {
              margin-left: -24px;
              height: 700px;
              width: 980px;
              padding-left: 24px;
              li {
                float: left;
                width: 154px;
                height: 154px;
                margin-right: -1px;
                margin-bottom: 30px;
                overflow: hidden;
                .picture {
                  position: relative;
                  width: 130px;
                  height: 130px;
                  a {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                    .msk {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      background: url("./images/coverall.png") 0 -680px no-repeat;
                    }
                  }
                }
                p {
                  margin-top: 8px;
                  color: #0c73c2;
                }
              }
            }
          }
          .object-Album {
            margin-top: 20px;
            ul {
              margin-left: -33px;
              height: 800px;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              li {
                width: 153px;
                height: 178px;
                margin-right: 33px;
                padding-left: 33px;
                padding-bottom: 30px;
                .cover {
                  position: relative;
                  width: 130px;
                  height: 130px;
                  &:hover .play {
                    display: block;
                  }
                  .cover-img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                    .msk {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 153px;
                      height: 130px;
                      background: url("./images/coverall.png") 0 -845px no-repeat;
                    }
                  }
                  .play {
                    display: none;
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    left: 94px;
                    right: 10px;
                    bottom: 5px;
                    background: url("./images/iconall.png") 0 -140px no-repeat;
                  }
                }
                p {
                  margin: 8px 0 3px;
                  font-size: 14px;
                  color: #000;
                  cursor: pointer;
                  &:hover {
                    text-decoration: underline;
                  }
                }
                h5 {
                  color: #666;
                  font-weight: 400;
                }
              }
            }
          }
          .object-songsheet {
            margin-top: 20px;
            table {
              vertical-align: middle;
              tbody {
                tr {
                  display: block;
                  width: 900px;
                  height: 62px;
                  border: 1px solid #fff;
                  &:nth-child(even) {
                    background-color: #f7f7f7;
                  }
                  &:hover {
                    border: 1px solid #e1e1e1;
                  }
                  .td1 {
                    width: 25px;
                    height: 50px;
                    padding: 10px 10px 5px 10px;
                    span {
                      display: block;
                      width: 17px;
                      height: 17px;
                      background: url("./images/table.png") 0 -103px no-repeat;
                      cursor: pointer;
                    }
                  }
                  .td2 {
                    width: 70px;
                    height: 62px;
                    padding: 5px 10px;
                    .two-box {
                      width: 50px;
                      height: 50px;
                      position: relative;
                      img {
                        width: 100%;
                        height: 100%;
                      }
                    }
                  }
                  .td3 {
                    width: 307px;
                    padding: 5px 10px;
                  }
                  .td4 {
                    padding: 5px 0 5px 25px;
                    color: #999;
                  }
                  .td5 {
                    width: 20%;
                    padding: 5px 10px;
                  }
                  .td6 {
                    width: 108px;
                    color: #999;
                    padding: 5px 10px;
                  }
                  .td7 {
                    width: 108px;
                    padding: 5px 10px;
                    color: #999;
                  }
                }
              }
            }
          }
          .object-user {
            margin-top: 20px;
            table {
              width: 100%;
              tbody {
                width: 100%;
                tr {
                  display: block;
                  width: 100%;
                  height: 62px;
                  .td1 {
                    width: 72px;
                    height: 60px;
                    padding: 5px 10px;
                    .td1-box {
                      width: 50px;
                      height: 50px;
                      a {
                        display: block;
                        position: relative;
                        width: 100%;
                        height: 100%;
                        img {
                          width: 100%;
                          height: 100%;
                        }
                      }
                    }
                  }
                  .td2 {
                    width: 480px;
                    height: 62px;
                    padding: 5px 10px;
                    vertical-align: middle;
                    .name {
                      height: 20px;
                      margin-right: 20px;
                      a {
                        position: relative;
                        height: 20px;
                        padding-right: 25px;
                        margin-right: -25px;
                        .name1 {
                          color: #0c73c2;
                          line-height: 18px;
                        }
                        .icon1 {
                          display: inline-block;
                          width: 15px;
                          height: 15px;
                          margin: 0 0 0 2px;
                          img {
                            width: 100%;
                            height: 100%;
                          }
                        }
                        .icon2 {
                          position: absolute;
                          top: 1px;
                          right: auto;
                          margin-left: 5px;
                          width: 14px;
                          height: 15px;
                          background: url("./images/icon.png") -70px 0 no-repeat;
                        }
                      }
                    }
                    .detail {
                      width: 480px;
                      margin-top: 5px;
                      color: #999;
                    }
                  }
                  .td3 {
                    width: 96px;
                    padding: 5px 10px;
                    a {
                      display: inline-block;
                      width: 64px;
                      height: 27px;
                      background: url("./images/button.png") 0 -990px no-repeat;
                      line-height: 27px;
                      padding-left: 26px;
                      &:hover {
                        background-position: 0 -1020px;
                      }
                    }
                  }
                  .td4 {
                    width: 96px;
                    padding: 5px 10px;
                    color: #999;
                  }
                  .td5 {
                    width: 96px;
                    color: #999;
                    padding: 5px 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.active {
  background-color: #fbfbfb !important;
  border-top-color: #d13030 !important;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
/* 超出部分省略号表示 */
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
// 单独拎出来的遮罩层
.msk1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("./images/coverall.png") 0 -680px no-repeat;
}
.Oc73c2 {
  color: #0c73c2 !important;
}
</style>

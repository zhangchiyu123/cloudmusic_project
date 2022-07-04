<template>
  <div class="singer">
    <h3>
      <span class="in_singer">入驻歌手</span>
      <a class="see_all">查看全部></a>
    </h3>
    <ul class="singer_list">
      <li v-for="singer in artistList" :key="singer.id">
        <a>
          <div class="photo">
            <img :src="singer.img1v1Url" alt="" />
          </div>
          <div class="info">
            <h4>{{ singer.name }}</h4>
            <p class="singer_name">{{ singer.alias[0] }}</p>
          </div>
        </a>
      </li>
    </ul>
    <a class="join_wangyi">申请成为网易音乐人</a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Singer",
  data() {
    return {
      cat: 5001, //入驻歌手 传参 5001
    };
  },
  mounted() {
    this.$store.dispatch("getartistList", this.cat);
  },
  computed: {
    ...mapGetters(["artistList"]),
  },
};
</script>

<style lang="less" scoped>
.singer {
  width: 250px;
  border-right: 1px solid #ccc;
  padding-top: 10px;
  h3 {
    width: 210px;
    height: 23px;
    font-size: 12px;
    border-bottom: 1px solid #ccc;
    margin: 0 auto;
    .in_singer {
      color: #333;
      float: left;
    }
    .see_all {
      float: right;
      color: #666;
      font-weight: 400;
    }
  }
  .singer_list {
    display: block;
    width: 230px;
    height: 380px;
    margin: 6px 0 14px 20px;
    overflow: hidden;
    li {
      width: 210px;
      height: 62px;
      margin-top: 14px;
      .photo {
        float: left;
        width: 62px;
        height: 62px;
        background: #666;
        img {
          width: 62px;
          height: 62px;
        }
      }
      .info {
        float: left;
        width: 132px;
        height: 100%;
        background: #fafafa;
        border: 1px solid #e9e9e9;
        border-left: 0;
        padding-left: 14px;
        h4 {
          width: 132px;
          height: 21px;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .singer_name {
          width: 132px;
          height: 18px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .join_wangyi {
    display: block;
    width: 195px;
    height: 29px;
    text-align: center;
    line-height: 27px;
    background: #ebebeb;
    margin-left: 20px;
    border-radius: 7px;
    border: 1px solid #ccc;
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>

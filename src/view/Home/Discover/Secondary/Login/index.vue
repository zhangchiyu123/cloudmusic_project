<template>
  <div class="login">
    <div class="userLogin" v-show="!profile.nickname">
      <p>登录网易云音乐,可以享受无限收藏的乐趣,并且无限同步到手机</p>
      <a @click="Login">用户登录</a>
    </div>
    <div class="userDetail" v-show="profile.nickname">
      <div class="detail">
        <article>
          <a>
            <img :src="profile.avatarUrl" alt="" />
          </a>
          <p class="over">{{ profile.nickname }}</p>
        </article>
        <ul>
          <li>
            <p>{{ profile.sCount }}</p>
            <span>动态</span>
          </li>
          <li class="line"></li>
          <li>
            <p>{{ profile.follows }}</p>
            <span>关注</span>
          </li>
          <li class="line"></li>
          <li>
            <p>{{ profile.djStatus }}</p>
            <span>粉丝</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  methods: {
    // 通知Header组件调用登录方法
    Login() {
      this.$bus.$emit("callLogin");
    },
  },
  computed: {
    ...mapGetters(["profile"]),
  },
  mounted() {
    // 隐藏个人信息框
    this.$bus.$on("hideUserDetail", () => {
      this.profile.nickname = null;
    });
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 251px;
  background: #e8e8e8;
  border: 1px solid #ccc;
  margin-left: -1px;
  .userLogin {
    height: 126px;
    p {
      width: 205px;
      height: 44px;
      line-height: 22px;
      padding: 16px 0;
      margin: 0 auto;
    }
    a {
      display: block;
      width: 100px;
      height: 31px;
      margin: 0 auto;
      line-height: 31px;
      color: #fff;
      text-align: center;
      margin-top: 30px;
      text-shadow: 0 1px 0 #8a060b;
      background: url("./images/index.png") 0 -195px;
      &:hover {
        background-position: -110px -195px;
      }
    }
  }
  .userDetail {
    .detail {
      height: 185px;
      padding-top: 20px;
      article {
        display: flex;
        justify-content: space-between;
        a {
          width: 80px;
          height: 80px;
          margin-left: 20px;
          padding: 2px;
          background-color: #fff;
          border: 1px solid #dadada;
          img {
            width: 80px;
            height: 80px;
          }
        }
        p {
          font-size: 18px;
          margin-right: 44px;
        }
      }
      ul {
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-top: 22px;
        padding: 0 25px;
        li {
          height: 40px;
          p {
            font-size: 20px;
            height: 23px;
          }
        }
      }
    }
  }
}
/* 超出部分省略号表示 */
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
// 竖线
.line {
  height: 40px;
  background-color: #ccc;
  width: 1px;
}
</style>

<template>
  <!-- 最顶部 -->
  <div class="header">
    <div class="nav">
      <h1 @click="goHome"></h1>
      <ul>
        <li @click="isActive = 1" :class="{ active: isActive == 1 }">
          发现音乐
          <div class="cor1" v-show="isActive == 1"></div>
        </li>
        <li @click="isActive = 2" :class="{ active: isActive == 2 }">
          我的音乐
          <div class="cor2" v-show="isActive == 2"></div>
        </li>
        <li @click="isActive = 3" :class="{ active: isActive == 3 }">
          关注
          <div class="cor3" v-show="isActive == 3"></div>
        </li>
        <li @click="isActive = 4" :class="{ active: isActive == 4 }">
          商城
          <div class="cor4" v-show="isActive == 4"></div>
        </li>
        <li @click="isActive = 5" :class="{ active: isActive == 5 }">
          音乐人
          <div class="cor5" v-show="isActive == 5"></div>
        </li>
        <li @click="isActive = 6" :class="{ active: isActive == 6 }">
          下载客户端
          <div class="cor6" v-show="isActive == 6"></div>
          <em class="em-1"></em>
        </li>
      </ul>
      <div style="position: relative">
        <input
          type="text"
          placeholder="音乐/视频/电台/用户"
          v-model="searchText"
          @focus="showInput"
          @blur="noneInput"
          @keyup.enter="toSearch"
        />
        <i class="icon-1"></i>
        <span>创作者中心</span>
        <a class="login_em" @click="loginShow" ref="logonButton">登录</a>
        <div class="header-box">
          <!-- 头像 -->
          <a class="head" ref="head" @mouseenter="userShow">
            <img :src="profile.avatarUrl" alt="" />
          </a>
          <!-- 个人信息弹出框 -->
          <div
            class="user-detail"
            ref="userDetail"
            @mouseleave="userHide"
            @mouseenter="userShow"
          >
            <ul class="user-detail-ul">
              <li>
                <a>
                  <em class="user-detail-em">我的主页</em>
                </a>
              </li>
              <li>
                <a>
                  <em class="user-detail-em">我的消息</em>
                </a>
              </li>
              <li>
                <a>
                  <em class="user-detail-em">我的等级</em>
                </a>
              </li>
              <li>
                <a>
                  <em @click="logOut" class="user-detail-em">退出登录</em>
                </a>
              </li>
            </ul>
            <!-- 小三角 -->
            <i class="triangle"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出搜索框 -->
    <div class="search-box" v-show="searchText != ''" ref="search">
      <div class="search-list">
        <p class="users">
          <router-link
            class="users-search"
            :to="`/search/${searchText}`"
            @click.native="goSearch"
            >搜索"{{ searchText }}"相关用户 ></router-link
          >
        </p>
        <div class="search-ul">
          <div class="item">
            <ul>
              <div class="hd">
                <i class="icon"></i>
                <span>单曲</span>
              </div>
              <div class="bd">
                <li>
                  <i>
                    50 Feet-
                    <em>SoMo</em>
                  </i>
                </li>
                <li>
                  <i>
                    50 Feet-
                    <em>SoMo</em>
                  </i>
                </li>
                <li>
                  <i>
                    50 Feet-
                    <em>SoMo</em>
                  </i>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask" @mousewheel.prevent></div>
    <!-- 登录弹出框 -->
    <div class="login-box" ref="login" @mousewheel.prevent>
      <header>
        {{ login1 }}
        <i @click="maskHide"></i>
      </header>
      <div class="main" ref="main">
        <div class="login">
          <div class="QRcode">
            <img src="./images/login_qr.png" alt="" />
          </div>
          <div class="other">
            <h3>扫码登录</h3>
            <div class="img">
              <img
                src="https://pic1.zhimg.com/80/v2-a2c61c9d72df0ccb7c4d7dc13d4c9e44_720w.jpg"
              />
            </div>
            <p>使用<span class="Oc73c2"> 网易云音乐APP </span>扫码登录</p>
          </div>
        </div>
        <a class="other1" @click="main2Show">选择其他登录方式</a>
      </div>
      <div class="main2" ref="main2">
        <div class="login2">
          <div class="login2-left">
            <img src="./images/login_phone.png" alt="" />
            <a class="phone" @click="goMain3">手机号登录</a>
            <a class="register">注册</a>
          </div>
        </div>
        <img src="./images/qr_login_icon.png" class="QR" @click="goMain" />
      </div>
      <div class="main3" ref="main3">
        <div class="login3" ref="main3">
          <div class="phone">
            <a>+86</a>
            <input
              type="text"
              placeholder="请输入手机号"
              v-model.number="phone"
              maxlength="11"
              autofocus
              @input="handlePhone"
              @focus="phoneNumberNone"
            />
          </div>
          <!-- 验证码 -->
          <div class="code" ref="code">
            <input type="text" v-model="code" placeholder="请输入验证码" />
            <a @click="handleLogin">获取验证码</a>
          </div>
          <div class="password" ref="passWord">
            <input
              type="password"
              placeholder="请输入密码"
              id="password"
              v-model="password"
            />
          </div>
          <span class="phoneNumber" ref="phoneNumber"
            >请输入正确的手机号!!</span
          >
          <span class="pass">手机号或者密码错误!!!!!</span>
          <div class="other-login">
            <a class="pass-login" ref="passLogin" @click="passwordShow"
              >密码登录</a
            >
            <a class="short-login" ref="shortLogin" @click="shortShow"
              >短信登录</a
            >
            <div>
              <label for="login"
                ><input
                  type="checkbox"
                  name=""
                  id="login"
                  checked
                />自动登录</label
              >
            </div>
          </div>
          <button @click="mobileNumberLogin" ref="LoginButton">登陆</button>
        </div>
        <footer>
          <a class="other2 Oc73c2" @click="main2Show">← 其他登录方式</a>
          <a class="register">没有账号? 免费注册</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      // 控制顶部三角是否显示
      isActive: 1,
      // 搜索框的内容
      searchText: "",
      login1: "登录",
      phone: "",
      password: "",
      code: "",
      User: "",
    };
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/home/discover" });
      this.$bus.$emit("changeIsActive");
    },
    goSearch() {
      this.$refs.search.style.display = "none";
      this.$bus.$emit("changeSearch", 100);
      this.isActive = 100;
    },
    // 键盘事件路由跳转携带搜索内容 到 搜索组件
    toSearch() {
      this.$refs.search.style.display = "none";
      this.$bus.$emit("changeSearch", 100);
      this.isActive = 100;
      this.$router.push({
        name: "search",
        params: {
          searchText: this.searchText,
        },
      });
    },
    showInput() {
      if (this.searchText !== "") {
        this.$refs.search.style.display = "block";
      }
    },
    noneInput() {
      setTimeout(() => {
        this.$refs.search.style.display = "none";
      }, 100);
    },
    // 遮罩层和登录弹框显示
    loginShow() {
      this.$refs.login.style.display = "block";
      this.$refs.mask.style.display = "block";
      //禁止滚动
      // let mo = function (e) {
      //   e.preventDefault();
      // };
      // document.body.style.overflow = "hidden";
      // document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    // 遮罩层和登录弹框隐藏
    maskHide() {
      this.$refs.login.style.display = "none";
      this.$refs.mask.style.display = "none";
      // let mo = function (e) {
      //   e.preventDefault();
      // };
      // document.body.style.overflow = ""; //出现滚动条
      // document.removeEventListener("touchmove", mo, false);
    },
    // 点击其他登录模式显示盒子2
    main2Show() {
      this.login1 = "登录";
      this.$refs.main.style.display = "none";
      this.$refs.main2.style.display = "block";
      this.$refs.main3.style.display = "none";
    },
    // 回到盒子1
    goMain() {
      this.login1 = "登录";
      this.$refs.main2.style.display = "none";
      this.$refs.main.style.display = "block";
      this.$refs.main3.style.display = "none";
    },
    // 显示盒子3
    goMain3() {
      this.login1 = "手机号登录";
      this.$refs.main3.style.display = "block";
      this.$refs.main2.style.display = "none";
    },
    // 手机号表单验证，只能输入数字型
    handlePhone(e) {
      this.$refs.phoneNumber.style.display = "none";
      this.phone = e.target.value.replace(/[^\d]/g, "");
    },
    handleLogin() {
      if (this.phone.length === 11 && !isNaN(this.phone)) {
        alert("获取验证码成功");
      } else {
        this.$refs.phoneNumber.style.display = "block";
      }
    },
    // 获取焦点隐藏错误提示框
    phoneNumberNone() {
      this.$refs.phoneNumber.style.display = "none";
    },
    // 显示短信登陆
    shortShow() {
      this.$refs.shortLogin.style.display = "none";
      this.$refs.passWord.style.display = "none";
      this.$refs.passLogin.style.display = "block";
      this.$refs.code.style.display = "block";
    },
    // 显示密码登录
    passwordShow() {
      this.$refs.shortLogin.style.display = "block";
      this.$refs.passWord.style.display = "block";
      this.$refs.passLogin.style.display = "none";
      this.$refs.code.style.display = "none";
    },
    // 手机号+密码登录
    async mobileNumberLogin() {
      const { phone, password } = this;
      if ((phone, password)) {
        this.$refs.LoginButton.innerHTML = "登陆中...";
        await this.$store.dispatch("loginPhone", {
          phone: phone,
          password: password,
        });

        if (this.userId) {
          // 用用户id发请求获取用户的信息
          await this.$store.dispatch("getUserDetail", this.userId);
          this.$refs.login.style.display = "none";
          this.$refs.mask.style.display = "none";
          this.$refs.logonButton.style.display = "none";
          this.$refs.head.style.display = "block";
        } else {
          // 置空账号密码，解决输错密码再成功登录不隐藏弹出框的bug
          this.phone = "";
          this.password = "";
        }
      }
    },
    // 获取本地存储的用户ID并自动登录获取用户信息
    async getUserDetail() {
      let { User } = this;
      User = localStorage.getItem("USERID");
      if (User) {
        await this.$store.dispatch("getUserDetail", User);
        this.$refs.logonButton.style.display = "none";
        this.$refs.head.style.display = "block";
      } else {
        return;
      }
      // await this.$store.dispatch("getUserDetail", this.userId);
      // this.$refs.logonButton.style.display = "none";
      // this.$refs.head.style.display = "block";
    },
    // 个人信息框显示
    userShow() {
      setTimeout(() => {
        this.$refs.userDetail.style.display = "block";
      }, 200);
    },
    //个人信息框隐藏
    userHide() {
      this.$refs.userDetail.style.display = "none";
    },
    // 退出登录
    async logOut() {
      try {
        await this.$store.dispatch("logout");
        this.$bus.$emit("hideUserDetail");
        this.$refs.LoginButton.innerHTML = "登陆";
        this.phone = "";
        this.password = "";
        this.$refs.head.style.display = "none";
        this.$refs.userDetail.style.display = "none";
        this.$refs.logonButton.style.display = "block";
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["userId", "profile"]),
  },
  mounted() {
    this.$bus.$on("changeTop", (data) => {
      this.isActive = data;
    });
    this.$bus.$on("changeHeader", (data) => {
      this.isActive = data;
    });
    //组件挂载让用户自动登录
    this.getUserDetail();
    // 回调，调用显示登录框和遮罩层的方法
    this.$bus.$on("callLogin", this.loginShow);
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 70px;
  background: #333;
  .nav {
    position: relative;
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    background: #333;
    h1 {
      width: 157px;
      height: 100%;
      float: left;
      background: url("./images/topbar.png") no-repeat;
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
    li {
      position: relative;
      float: left;
      width: auto;
      height: 100%;
      line-height: 70px;
      padding: 0 20px;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background: #000;
      }
    }
    .em-1 {
      position: absolute;
      top: 20px;
      right: -15px;
      width: 26px;
      height: 13px;
      background: url("./images/topbar.png")-192px 0 no-repeat;
    }
    input {
      float: left;
      width: 160px;
      height: 32px;
      margin-left: 60px;
      margin-top: 19px;
      padding-left: 28px;
      border-radius: 16px;
      line-height: 32px;
    }
    .icon-1 {
      position: absolute;
      top: 27.5px;
      right: 320px;
      display: inline-block;
      width: 13px;
      height: 14px;
      background: url("./images/topbar.png") -10px -108px no-repeat;
    }
    span {
      float: left;
      display: block;
      width: 90px;
      height: 30px;
      color: #ccc;
      line-height: 28px;
      margin: 19px 12px 0 12px;
      border: 1px solid #4f4f4f;
      text-align: center;
      border-radius: 15px;
      &:hover {
        color: #fff;
        border-color: #fff;
        cursor: pointer;
      }
    }
    .login_em {
      float: left;
      display: block;
      margin-top: 19px;
      margin-left: 10px;
      width: 30px;
      height: 100%;
      color: rgb(102, 102, 102);
      text-align: center;
      line-height: 30px;
      &:hover {
        border-bottom: 1px solid red;
      }
    }
    .header-box {
      position: relative;
      float: left;
      width: 50px;
      .head {
        display: none;
        float: left;
        width: 30px;
        height: 30px;
        margin-top: 19px;
        margin-left: 10px;
        &:hover img {
          width: 50px;
          height: 50px;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 30px;
          transition: 0.5s;
        }
      }
      // 个人信息框
      .user-detail {
        display: none;
        position: absolute;
        top: 80px;
        left: -39px;
        width: 153px;
        background: #2b2b2b;
        border: 1px solid #202020;
        box-shadow: 0 8px 24px 0 rgba(0, 0, 0/50%);
        border-radius: 4px;
        z-index: 50;
        .user-detail-ul {
          li {
            float: left;
            width: 100%;
            &:hover {
              background-color: #353535;
            }
            a {
              float: left;
              width: 100%;
              height: 34px;
              line-height: 34px;
              color: #ccc;
              display: flex;
              justify-content: center;
            }
          }
        }
        .triangle {
          position: absolute;
          top: -21px;
          left: 50%;
          margin-left: -7px;
          width: 0;
          height: 0;
          line-height: 0;
          font-size: 0;
          border: 10px solid transparent;
          border-bottom-color: #2b2b2b;
        }
      }
    }
  }
  .active {
    background-color: #000;
    color: #fff;
  }
  .search-box {
    position: absolute;
    top: 60px;
    right: 313px;
    width: 240px;
    height: 303px;
    z-index: 100;
    border: 1px solid #bebebe;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 4px 7px #555;
    .search-list {
      width: 100%;
      .users {
        width: 100%;
        height: 39px;
        padding: 11px 10px;
        border-bottom: 1px solid #e2e2e2;
        .users-search {
          width: auto;
          height: auto;
          &:hover {
            background-color: #e3e5e7;
          }
        }
      }
      .search-ul {
        width: 100%;
        .item {
          width: 100%;
          ul {
            width: 100%;
            .hd {
              width: 63px;
              float: left;
              padding: 10px 0 0 10px;
              .icon {
                float: left;
                width: 14px;
                height: 15px;
                margin: 2px 4px 0 0;
                background: url("../images/icon.png")-35px -300px no-repeat;
              }
            }
            .bd {
              float: left;
              width: 173px;
              background: #f9f8f8;
              padding: 6px 0 5px 0;
              border-top: 1px solid #e2e2e2;
              border-left: 1px solid #e2e2e2;
              li {
                width: 100%;
                cursor: pointer;
                &:hover {
                  background-color: #e3e5e7;
                }
                i {
                  display: block;
                  width: 100%;
                  height: 24px;
                  color: #000;
                  padding-left: 10px;
                  line-height: 24px;
                }
              }
            }
          }
        }
      }
    }
  }

  .cor1,
  .cor2,
  .cor3,
  .cor4,
  .cor5,
  .cor6 {
    width: 12px;
    height: 7px;
    background: url("./images/topbar.png") no-repeat -216px -140px;
    position: absolute;
    top: 63px;
  }
  .cor1 {
    left: 43px;
  }
  .cor2 {
    left: 43px;
  }
  .cor3 {
    left: 29px;
  }
  .cor4 {
    left: 28px;
  }
  .cor5 {
    left: 32px;
  }
  .cor6 {
    left: 50px;
  }
  // 遮罩层
  .mask {
    display: none;
    opacity: 1;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1000;
  }
  // 登录弹出框
  .login-box {
    display: none;
    position: fixed;
    top: 100px;
    left: 50%;
    margin-left: -265px;
    width: 530px;
    height: 366px;
    background: salmon;
    z-index: 1200;
    header {
      position: relative;
      margin: 0;
      padding: 0 45px 0 18px;
      height: 38px;
      line-height: 38px;
      z-index: 10;
      border-bottom: 1px solid #191919;
      background: #2d2d2d;
      border-radius: 4px 4px 0 0;
      font-weight: bold;
      font-size: 14px;
      color: #fff;
      i {
        position: absolute;
        z-index: 20;
        top: 16px;
        right: 20px;
        width: 10px;
        height: 10px;
        overflow: hidden;
        cursor: pointer;
        background: url("./images/x.png") no-repeat 0 -95px;
      }
    }
    .main {
      display: block;
      padding-top: 30px;
      .login {
        display: flex;
        height: 220px;
        justify-content: center;
        .QRcode {
          img {
            width: 125px;
            height: 220px;
          }
        }
        .other {
          width: 200px;
          margin-left: 25px;
          text-align: center;
          h3 {
            font-size: 18px;
            font-weight: 500;
          }
          .img {
            width: 130px;
            height: 130px;
            padding: 4px;
            margin: 13px auto;
            img {
              width: 128px;
              height: 128px;
            }
          }
          p {
            margin-top: 25px;
            width: 200px;
            font-size: 12px;
          }
        }
      }
      .other1 {
        display: block;
        width: 120px;
        height: 28px;
        line-height: 27px;
        margin: 20px auto;
        font-size: 12px;
        background: #fff;
        border-radius: 28px;
        text-align: center;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .main2 {
      display: none;
      position: relative;
      width: 100%;
      height: 326px;
      .login2 {
        margin: 0 auto;
        width: 265px;
        height: 220px;
        text-align: center;
        margin-top: 50px;
        .login2-left {
          width: 260px;
          img {
            width: 224px;
            height: 120px;
          }
          .phone,
          .register {
            display: block;
            width: 230px;
            padding: 0 15px 0 20px;
            line-height: 31px;
            text-align: center;
            margin-top: 10px;
            margin-left: 15px;
          }
          .phone {
            position: relative;
            color: #fff;
            background: url("./images/background.png") 0 -386px no-repeat;
            &::after {
              content: "";
              position: absolute;
              right: 0;
              width: 7px;
              height: 20px;
              background: url("./images/background.png") -243px -427px no-repeat;
            }
          }
          .register {
            background: #fff;
            border-radius: 4px;
          }
        }
      }
      .QR {
        position: absolute;
        bottom: 48px;
        right: 0;
        width: 52px;
        height: 52px;
        cursor: pointer;
      }
    }
    .main3 {
      display: none;
      position: relative;
      width: 100%;
      .login3 {
        width: 220px;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 37px;
        padding: 30px 0 43px;
        .phone {
          height: 30px;
          line-height: 30px;
          border: 1px solid #cdcdcd;
          border-radius: 2px;
          z-index: 11;
          a {
            display: block;
            float: left;
            height: 100%;
            line-height: 30px;
            padding: 0 14px 0 10px;
            border-right: 1px solid #cdcdcd;
            color: #333;
            background: #fff;
          }
          input {
            display: block;
            padding-left: 8px;
            width: 79%;
            height: 100%;
            border: none;
            outline: none;
            color: #333;
            font-size: 12px;
          }
        }
        .code {
          margin-top: 10px;
          input {
            width: 136px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #cdcdcd;
            border-radius: 2px;
            z-index: 10;
            font-size: 12px;
            padding-left: 10px;
            font-size: 12px;
          }
          a {
            display: inline-block;
            width: 70px;
            background: #ccc;
            text-align: center;
            line-height: 30px;
            margin-left: 13px;
          }
        }
        .password {
          display: none;
          margin-top: 10px;
          height: 30px;
          line-height: 30px;
          #password {
            width: 100%;
            height: 30px;
            color: #333;
            border: 1px solid #cdcdcd;
            font-size: 12px;
            padding-left: 10px;
          }
        }
        .phoneNumber,
        .pass {
          display: none;
          margin-top: 5px;
          width: 135px;
          height: 16px;
          color: red;
          font-weight: 700;
        }
        .other-login {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          color: #000;
          .short-login {
            display: none;
          }
        }
        button {
          position: relative;
          width: 100%;
          height: 31px;
          margin-top: 20px;
          color: #fff;
          background: url("./images/background.png") 0 -386px no-repeat;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 7px;
            height: 100%;
            background: url("./images/background.png") right -427px no-repeat;
          }
        }
      }
      footer {
        display: flex;
        justify-content: space-between;
        height: 48px;
        padding: 0 19px;
        border-top: 1px solid #c6c6c6;
        line-height: 48px;
        border-radius: 0 0 4px 4px;
        background-color: #f7f7f7;
      }
    }
  }
}
.Oc73c2 {
  color: #0c73c2;
}
</style>

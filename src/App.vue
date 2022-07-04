<template>
  <div id="app">
    <Header></Header>
    <GoTop></GoTop>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer></Footer>
    <Music></Music>
  </div>
</template>

<script>
import Header from "@/components/Header";
import GoTop from "@/components/GoTop";
import Footer from "@/components/Footer";
import Music from "@/components/Music";
export default {
  name: "App",
  components: {
    Header,
    GoTop,
    Footer,
    Music,
  },
};
</script>

<style>
#app {
  width: 100%;
  background: #f5f5f5;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
  font-size: 12px;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0px;
  clear: both;
  visibility: hidden;
}

.clearfix {
  *zoom: 1;
  /* IE6、IE7专有 */
}
/* 超出部分省略号表示 */
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
/* 鼠标移入显示下划线 */
.underline:hover {
  text-decoration: underline;
  cursor: pointer;
}
/* 鼠标移入变为手指 */
.pointer:hover {
  cursor: pointer;
}
/* 文字无法被选中 */
.notChoose {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

dl,
dt,
dd,
a {
  color: #333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

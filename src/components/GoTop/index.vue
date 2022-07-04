<template>
  <div>
    <a class="gotop" ref="top" @click="toTop" :style="{ display: display }"></a>
  </div>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {
      display: "none",
      // yincang: "none",
    };
  },
  methods: {
    // 页面滚动隐藏TOP按钮的方法
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 页面被卷去的头部
      // 滚动监听事件中使⽤this.$refs.xxx.style.color=‘xxxx'这种⽅式会报错
      // Uncaught TypeError: Cannot read property 'style' of undefined
      // 需要动态绑定
      if (scrollTop >= 100) {
        this.display = "block";
      } else {
        this.display = "none";
      }
    },
    // 返回顶部的回调
    toTop() {
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    this.$nextTick(
      // 窗口加载事件
      window.addEventListener("scroll", this.handleScroll)
    );
  },
};
</script>
<style lang="less" scoped>
.gotop {
  display: none;
  position: fixed;
  text-indent: -9999px;
  left: 50%;
  bottom: 160px;
  margin-left: 500px;
  z-index: 1000;
  width: 49px;
  height: 44px;
  background: url("../images/sprite.png") -265px -47px no-repeat;
  &:hover {
    cursor: pointer;
    background-position: -325px -47px;
  }
}
</style>

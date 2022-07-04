<template>
  <div>
    <header>
      <div class="hot"><slot name="name1"></slot></div>
      <i class="more_right"></i>
      <a href="#" class="more">更多</a>
    </header>
  </div>
</template>

<script>
export default {
  // main组件共用的头部组件
  name: "MainHeader",
};
</script>

<style lang="less" scoped>
header {
  width: 689px;
  height: 35px;
  padding: 0 10px 0 34px;
  background: url("./images/index.png") -225px -156px no-repeat;
  border-bottom: 2px solid #c10d0c;
  margin-bottom: 20px;
  .hot {
    float: left;
    font-size: 20px;
    color: #000;
    line-height: 28px;
  }
  .more {
    margin-top: 11px;
    float: right;
    margin-right: 10px;
  }
  .more_right {
    float: right;
    margin-top: 13px;
    width: 12px;
    height: 12px;
    background: url("./images/index.png") 0 -240px no-repeat;
  }
}
a:hover {
  border-bottom: none !important;
}
</style>

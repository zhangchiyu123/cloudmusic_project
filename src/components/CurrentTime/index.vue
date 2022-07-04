<template>
  <!-- 当前时间 -->
  <span>{{ nowTime }}</span>
</template>

<script>
export default {
  name: "CurrentTime",
  data() {
    return {
      nowTime: "",
    };
  },
  mounted() {
    this.nowTimes();
  },
  methods: {
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      var d = new Date(timeStamp).getDay();
      let day;
      if (d == 0) {
        day = "⽇";
      } else if (d == 1) {
        day = "⼀";
      } else if (d == 2) {
        day = "⼆";
      } else if (d == 3) {
        day = "三";
      } else if (d == 4) {
        day = "四";
      } else if (d == 5) {
        day = "五";
      } else if (d == 6) {
        day = "六";
      }
      //   this.nowTime =
      //     hh +
      //     ":" +
      //     mm +
      //     ":" +
      //     ss +
      //     "   " +
      //     year +
      //     "/" +
      //     month +
      //     "/" +
      //     date +
      //     "   " +
      //     "星期" +
      //     day;
      this.nowTime = month + "月" + date + "日" + "星期" + day;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
  },
};
</script>
<style lang="less" scoped></style>

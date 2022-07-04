<template>
  <div class="pagination">
    <!-- 上 -->
    <!-- 当前页为1，禁用上一页按钮 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 起始数字大于1的时候，显示1 -->
    <button
      v-if="startNum_endNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <!-- 起始数字大于2的时候，显示左侧...省略部分 -->
    <button v-if="startNum_endNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNum_endNum.end"
      :key="index"
      v-show="page >= startNum_endNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <!-- 结束数字小于总数-1隐藏 ... -->
    <button v-if="startNum_endNum.end < totalPage - 1">···</button>
    <!-- 结束数字小于总数隐藏 最大页数 -->
    <button
      v-if="startNum_endNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  // 父组件传递给字符串的数据:当前页、每一页展示多少条数据、数据总个数、连续页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 计算出总共有多少页(向上取整)
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字与结束数字[连续页码的数字，至少是5]，如果出现不正常的现象[不够五页]
    startNum_endNum() {
      // const { continues, pageNo, totalPage } = this; //结构之后可以不加this
      let start = 0;
      let end = 0;
      // 不正常的现象，【总页数大于连续页码个数】
      if (this.continues > this.totalPage) {
        //总页数：少于连续页码数
        start = 1;
        end = this.totalPage;
      } else {
        // 正常现象【连续页码5，总页数totalPage一定得大于5】
        // 起始数字
        start = this.pageNo - Math.floor(this.continues / 2);
        // 例如当前是第8页，连续页码为5
        // 6 7 8 9 10
        // 比如当前页是第8页，连续页码是7
        // 5 6 7 8 9 10 11
        // 结束数字
        end = this.pageNo + Math.floor(this.continues / 2);
        // 把出现不正常的现象，【start数字出现现0|负数】纠正
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 把出现不正常的现象，【end数字大于总页码数】纠正
        if (end > this.totalPage) {
          end = this.totalPage;
          //总页码数减去连续页码数再+1
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
  // mounted() {
  //   this.$bus.$on("changeClass", this.changeclass);
  // },
  // methods:{
  //   changeclass(){
  //   }
  // }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      color: #fff;
    }
  }
}
.active {
  background-color: #e1251b !important;
}
</style>

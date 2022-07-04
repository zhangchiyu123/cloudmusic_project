<template>
  <div>
    <Homeheader></Homeheader>
    <router-view></router-view>
  </div>
</template>

<script>
import Homeheader from "@/components/Homeheader";
export default {
  name: "Home",
  components: {
    Homeheader,
  },
};
</script>

<style lang="less" scoped></style>

<template>
  <div class="main">
    <Login></Login>
    <Singer></Singer>
    <DJ></DJ>
  </div>
</template>

<script>
import Login from "./Login";
import Singer from "./Singer";
import DJ from "./DJ";
export default {
  name: "Secondary",
  components: { Login, Singer, DJ },
};
</script>

<style lang="less" scoped>
.main {
  float: left;
  width: 250px;
  height: 1363px;
  background: #fff;
}
</style>

//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// import { removeToken } from '@/utils/token'

// 使用插件
Vue.use(VueRouter);

//引入路由组件  迁移到了routes.js**************************

// 解决：NavigationDuplicated: Avoided redundant navigation to current location  报错(网上搜索的解决代码)
// 获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push
//     // 修改原型对象中的push方法
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// 先把VueRouter原型对象的push和replace方法，保存一份  (老师的方法)
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

//重写push replace，解决报错问题
// 第一个参数，告诉原来push方法，你往哪里跳转(传递哪些参数)
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 始终滚动到顶部，返回的y：0，代表滚动条在最上方
    // 现在的文档是vue3的用的{top:0},vue2的要用{y:0}
    return { y: 0 };
  },
});

//全局守卫，前置守卫(在路由跳转之间进行判断)

export default router;

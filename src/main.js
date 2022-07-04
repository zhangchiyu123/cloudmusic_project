import Vue from "vue";
import App from "./App.vue";
// 引入仓库
import store from "./store";

// 引入路由
import router from "@/router/index";

// 关闭语法检查
Vue.config.productionTip = false;

// 引入api文件夹里面全部的请求函数
import * as API from "@/api/index";

//引入element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import "aplayer/dist/APlayer.min.css";

//main组件头部全局组件
import MainHeader from "@/components/MainHeader";
Vue.component("MainHeader", MainHeader);
// 当前日期全局组件
import CurrentTime from "@/components/CurrentTime";
Vue.component("CurrentTime", CurrentTime);
// 分页器全局组件
import Pagination from "@/components/Pagination";
Vue.component("Pagination", Pagination);

import "swiper/css/swiper.css";

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API;
  },
  store,
  router,
}).$mount("#app");

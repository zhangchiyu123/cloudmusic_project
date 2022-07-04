import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 引入小仓库
import home from "./home/home";
import search from "./search";

//对外暴露Store类的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块化
  modules: {
    home,
    search,
  },
});

// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
//start:进度条开始  done:进度条结束
// 引入进度条的样式
import "nprogress/nprogress.css";

// 1: 利用axios对象的方法create，去创建一个axios实例
// 2: request就是axios
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径当中会出现api
  baseURL: "http://localhost:3000",
  //代表请求超时的事件，5s
  timeout: 5000,
});

// 请求拦截器: 在发请求之前，请求拦截器可以监测到，可以在请求发出去之前，做一些事情
requests.interceptors.request.use((config) => {
  // config:配置对象，有一个属性很重要，headers请求头
  // 发请求的时候会被拦截到 这个config 就是你请求的信息你可以在里面做一些操作 比如添加token
  // 进度条开始动
  nprogress.start();
  return config;
});

// 响应拦截器：
requests.interceptors.response.use(
  (response) => {
    // 成功的回调函数:服务器相应数据回来以后，响应拦截器可以监测到，可以做一些事情
    // 进度条结束
    nprogress.done();
    return response.data;
  },
  (error) => {
    // 服务器响应失败的回调信息
    return Promise.reject(new Error("fail"));
  }
);

// 对外暴露
export default requests;

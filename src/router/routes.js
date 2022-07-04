export default [
  {
    path: "/home",
    name: "home",
    // component: foo,  完整写法
    component: () => import("@/view/Home"), // 简写
    children: [
      {
        path: "discover",
        component: () => import("@/view/Home/Discover"),
      },
      {
        path: "toplist",
        component: () => import("@/view/Home/TopList"),
      },
      {
        path: "playlist",
        component: () => import("@/view/Home/PlayList"),
      },
      {
        path: "djradio",
        component: () => import("@/view/Home/DjRadio"),
      },
    ],
  },
  {
    path: "/search/:searchText?",
    name: "search",
    component: () => import("@/view/Search"),
  },
  {
    // 重定向,在项目跑起来的时候，访问/指定的组件
    path: "*",
    redirect: "/home/discover",
  },
];

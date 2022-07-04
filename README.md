# 网易云音乐WEB项目

## 下载依赖包
```
npm install
```

### 运行项目
```
npm run serve
```

### 打包项目
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 项目简介
1.项目基于Vue2进行开发，使用了网易云音乐官方API：https://binaryify.github.io/NeteaseCloudMusicApi/#/

2.播放歌曲的功能暂时只能在歌单组件和搜索组件进行，项目使用了vuex，vue-router等技术，需要此项目源码的小伙伴，启动项目前需要:npm i 下载所有依赖包，要使用前后端交互功能，可能需要手动下载一下网易云官方的node.js文件，使用node app.js命令启动，否则可能很多地方会报错。

安装教程在👆网易云音乐API官网，

安装：
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git

$ npm install

运行：
node app.js


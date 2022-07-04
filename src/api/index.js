//当前这个模块：API进行统一管理
import request from "@/api/request";
import store from "@/store/search";

// 获取最新专辑的接口  /album/newest
export const reqAlbumNewest = () =>
  request({ url: "/album/newest", method: "GET" });

// 获取轮播图的接口 **调用例子 :** `/banner`, `/banner?type=0`   0代表PC
export const reqBanner = () =>
  request({ url: "/banner?type=0", methodL: "GET" });

// 推荐歌单的接口 ### 推荐歌单 说明 : 调用此接口 , 可获取推荐歌单 **可选参数 : `limit`: 取出数量 , 默认为 30 (不支持 offset)
// **接口地址 :** `/personalized`   **调用例子 :** `/personalized?limit=1`
export const reqPersonalized = (limit) =>
  request({ url: `/personalized?limit=${limit}`, method: "GET" });

// 新碟上架的接口  调用此接口 ，获取云音乐首页新碟上架数据
// `/album/newest`
export const reqAlbum = () => request({ url: `/album/newest`, method: "GET" });

// 云音乐飙升榜参数  **接口地址 :** `/top/list`  **调用例子 :** `/top/list?idx=6`
// 此接口暂时500异常，后续观察
// export const reqTopListIdx = () =>
//   request({ url: `/top/list?idx=${6}`, method: "GET" });

// 获取全部榜单的接口    **接口地址 :** `/toplist`
export const reqTopList = () => request({ url: `/toplist`, method: "GET" });

// 获取全部榜单摘要的接口  **接口地址 :** `/toplist/detail`
export const reqTopListDetail = () =>
  request({ url: `/toplist/detail`, method: "GET" });

// 获取首页入驻歌手的接口  调用例子 : /artist/list?cat=1001
// 必选参数 : cat : 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
export const reqartistList = (cat) =>
  request({ url: `/artist/list?cat=${cat} `, method: "GET" });

// 获取首页最热主播接口 **调用例子 :** `/dj/toplist/popular?limit=30`
export const reqDjTopList = (limit) =>
  request({ url: `/dj/toplist/popular?limit=${limit}`, method: "GET" });

// 获取歌曲详情的接口
// 调用此接口 , 传入音乐 id(支持多个 id, 用 `,` 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
// ** `/song/detail?ids=347230`,`/song/detail?ids=347230,347231`
export const reqSongDetail = (id) =>
  request({ url: `/song/detail?ids=${id}`, method: "GET" });

// 获取歌单详情接口
//  调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐，但是返回的trackIds是完整的，tracks 则是不完整的
// /playlist/detail?id=24381616   id必传
export const reqPlayList = (id) =>
  request({ url: `/playlist/detail?id=${id}`, method: "GET" });

// home下歌单组件获取分类的接口  调用例子 : /top/playlist?limit=10&order=new
// 可选参数
// order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit:取出歌曲的数量，默认为50
// offset：偏移数量，用于分页，如:(评论页数-1)*50 其中50为limit的值
export const reqPlayListHot = (order, cat, limit, offset) =>
  request({
    url: `/top/playlist?order=${order}&cat=${cat}&limit=${limit}&offset=${offset} `,
    method: "GET",
  });

// 获取歌单全部分类的接口  /playlist/catlist
export const reqCatList = () =>
  request({ url: `/playlist/catlist`, method: "GET" });

// 获取电台分类的接口  **调用例子 :** `/dj/catelist`
export const reqCateList = () =>
  request({ url: `/dj/catelist`, method: "GET" });

// 获取推荐节目的接口 **调用例子 :** `/program/recommend`
export const reqProgram = () =>
  request({ url: `/program/recommend`, method: "GET" });

// 获取节目排行榜的接口  说明 : 调用此接口,可获取24小时节目榜
// **调用例子 :** `/dj/program/toplist/hours?limit=1`
export const reqProgramToplist = () =>
  request({ url: `/dj/program/toplist/hours?limit=${10}` });

// 获取推荐电台的ID与名称接口 **调用例子 :** `/dj/category/recommend`
export const reqDjprogram = () =>
  request({ url: `/dj/category/recommend`, method: "GET" });

// 获取类别热门电台的详情`limit` : 返回数量 , 默认为 30
// `offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
// `cateId`: 类别 id,可通过 `/dj/category/recommend` 接口获取
// **接口地址 :** `/dj/radio/hot`
// **调用例子 :** `/dj/radio/hot?cateId=2001`(创作|翻唱) `/dj/radio/hot?cateId=10002` (3D|电子)
export const reqHotDjRadio = (cateId) =>
  request({ url: `/dj/radio/hot?cateId=${cateId}&limit=${4}`, method: "GET" });

// 搜索接口
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个
// 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// 必选参数 : keywords : 关键词
// 选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
// 调用例子 : /search?keywords= 海阔天空
export const reqSearchResults = (keywords, limit, type) =>
  request({
    url: `/search?keywords=${keywords}&limit=${limit}&type=${type}`,
    method: "GET",
  });

// 手机号+密码登录  必选参数 : phone: 手机号码 password: 密码
// 调用例子 : /login/cellphone?phone=xxx&password=yyy
export const reqLoginPhone = (phone, password) =>
  request({
    url: `/login/cellphone?phone=${phone}&password=${password}`,
    method: "GET",
  });

// 通过id获取用户详   情调用例子 : /user/detail?uid=32953014
export const reqUserDetail = (id) =>
  request({ url: `/user/detail?uid=${id}`, method: "GET" });

// 退出登录
export const reqLogout = () => request({ url: `/logout`, method: "GET" });

// 获取音乐 url
// 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
// 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的 解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
// 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
export const reqGetSongUrl = (id) =>
  request({ url: `/song/url?id=${id}`, method: "GET" });

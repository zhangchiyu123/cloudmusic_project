import {
  reqAlbumNewest,
  reqBanner,
  reqPersonalized,
  reqAlbum,
  reqTopList,
  reqTopListDetail,
  reqartistList,
  reqDjTopList,
  // reqTopListIdx,
  reqSongDetail,
  reqPlayList,
  reqPlayListHot,
  reqCatList,
  reqProgram,
  reqProgramToplist,
  reqDjprogram,
  reqHotDjRadio,
  reqGetSongUrl,
} from "@/api";
const state = {
  // 轮播图的数据
  bannerList: [],
  // 热门推荐的数据
  result: [],
  // 存放首页新碟推荐的数据
  songs: [],
  // 存放全部榜单摘要的数据
  topListDetail: [],
  // 存放首页入驻歌手的信息
  artistList: [],
  // 存放首页最热主播榜单的信息
  DjTopList: [],
  // 存放所有榜单的数据(非榜单详情)
  topList: [],
  // 歌单的信息
  playList: {},
  // 歌单里的歌曲详情
  tracks: [],
  // 歌单组件 歌单( 网友精选碟 )的数据
  playlists: [],
  // 歌单组件的最大条数
  total: "",
  // 歌单分类的五个名字对象
  categories: {},
  // 歌单分类的全部子分类
  sub: [],
  // 推荐节目
  programs: [],
  // 24小时电台节目榜
  programToplist: [],
  // 推荐电台的ID与名称
  Djprogram: [],
  hotlist: [],
  url: "",
};
// 获取最新专辑的接口  (测试用 暂未使用)
const actions = {
  async getAlbumNewest({ commit }) {
    let result = await reqAlbumNewest();
  },
  // 获取banner图的接口
  async getBannerList({ commit }) {
    let result = await reqBanner();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.banners);
    }
  },
  // 获取推荐歌单的接口，需要传参limit代表取出数量
  async getPersonalized({ commit }, limit) {
    let result = await reqPersonalized(limit);
    if (result.code == 200) {
      commit("GETPERSONALIZED", result.result);
    }
  },
  // 获取新碟的接口 需要传参limit代表取出数量
  async getAlbum({ commit }) {
    let result = await reqAlbum();
    if (result.code == 200) {
      commit("GETALBUM", result.albums);
    }
  },
  // 获取首页全部榜单的接口，分类获取的接口暂时500异常
  async getTopList({ commit }) {
    let result = await reqTopList();
    if (result.code == 200) {
      commit("GETTOPLIST", result.list);
    }
  },
  //获取榜单摘要的接口
  async getTopListDetail({ commit }) {
    let result = await reqTopListDetail();
    commit("GETTOPLISTDETAIL", result.list);
  },
  // 获取首页入驻歌手列表的接口
  async getartistList({ commit }, cat) {
    let result = await reqartistList(cat);
    if (result.code == 200) {
      commit("GETARTISTLIST", result.artists);
    }
  },
  // 获取首页最热主播数据的接口  5位
  async getDjTopList({ commit }, limit) {
    let result = await reqDjTopList(limit);
    if (result.code == 200) {
      commit("GETDJTOPLIST", result.data.list);
    }
  },
  // 获取排行榜页面榜单详情的接口  (异常)
  // async getTopListIdx({ commit }) {
  //   let result = await reqTopListIdx();
  //   console.log(result);
  // },
  // 获取歌曲详情的接口
  async getSongDetail() {
    let result = await reqSongDetail();
  },
  // 获取歌单详细信息的接口
  async getPlayList({ commit }, id) {
    let result = await reqPlayList(id);
    if (result.code == 200) {
      let playlist = result.playlist;
      let tracks = result.playlist.tracks;
      commit("GETPLAYLIST", { playlist, tracks });
    }
  },
  // 获取歌单组件 歌单 ( 网友精选碟 )
  async getHotPlayList({ commit }, { order, cat, limit, offset }) {
    let result = await reqPlayListHot(order, cat, limit, offset);
    if (result.code == 200) {
      let playlists = result.playlists;
      let total = result.total;
      commit("GETHOTPLAYLIST", { playlists, total });
    }
  },
  // 获取歌单分类的列表名字
  async getCatList({ commit }) {
    let result = await reqCatList();
    if (result.code == 200) {
      let categories = result.categories;
      let sub = result.sub;
      commit("GETCATLIST", { categories, sub });
    }
  },
  // 获取推荐电台
  async getProgram({ commit }) {
    let result = await reqProgram();
    if (result.code == 200) {
      commit("GETPROGRAM", result.programs);
    }
  },
  // 获取24小时电台节目榜
  async getProgramToplist({ commit }) {
    let result = await reqProgramToplist();
    if (result.code == 200) {
      commit("GETPROGRAMTOPLIST", result.data.list);
    }
  },
  // 获取推荐电台
  async getDjprogram({ commit }) {
    let result = await reqDjprogram();
    if (result.code == 200) {
      commit("GETDJPROGRAM", result.data);
    }
  },
  // 热门电台
  async getHotDjRadio({ commit }, cateId) {
    let result = await reqHotDjRadio(cateId);
    let x = {};
    x.name = result.djRadios[1].category;
    x.data = result.djRadios.slice(0, 4);
    commit("GETHOTDJRADIO", x);
  },
  // 获取歌曲的url
  async getSongUrl({ commit }, id) {
    let result = await reqGetSongUrl(id);
    console.log(result);
    if (result.code == 200) {
      commit("GETSONGURL", result.data[0].url);
    }
  },
};
const mutations = {
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETPERSONALIZED(state, result) {
    state.result = result;
  },
  GETALBUM(state, songs) {
    state.songs = songs;
  },
  GETTOPLISTDETAIL(state, topListDetail) {
    state.topListDetail = topListDetail;
  },
  GETARTISTLIST(state, artistList) {
    state.artistList = artistList;
  },
  GETDJTOPLIST(state, DjTopList) {
    state.DjTopList = DjTopList;
  },
  GETTOPLIST(state, topList) {
    state.topList = topList;
  },
  GETPLAYLIST(state, data) {
    state.playList = data.playlist;
    state.tracks = data.tracks;
  },
  GETHOTPLAYLIST(state, data) {
    state.playlists = data.playlists;
    state.total = data.total;
  },
  GETCATLIST(state, data) {
    state.categories = data.categories;
    state.sub = data.sub;
  },
  GETPROGRAM(state, programs) {
    state.programs = programs;
  },
  GETPROGRAMTOPLIST(state, programToplist) {
    state.programToplist = programToplist;
  },
  GETDJPROGRAM(state, djprogram) {
    state.Djprogram = djprogram;
  },
  GETHOTDJRADIO(state, x) {
    state.hotlist.push(x);
  },
  GETSONGURL(state, url) {
    state.url = url;
  },
};
const getters = {
  bannerList(state) {
    return state.bannerList || [];
  },
  recommendList(state) {
    return state.result;
  },
  NewAlbumList(state) {
    return state.songs;
  },
  topListDetail(state) {
    return state.topListDetail;
  },
  artistList(state) {
    return state.artistList.slice(0, 5);
  },
  djTopList() {
    return state.DjTopList;
  },
  // 云音乐特色榜
  musicFeatures_topList() {
    return state.topList.slice(0, 4);
  },
  // 榜单第一位的值
  topList_first() {
    return state.topList[0].id;
  },
  // 全球媒体榜
  globalMedia_topList() {
    return state.topList.slice(4, state.topList.length);
  },
  // 歌单信息
  playList() {
    return state.playList;
  },
  // 歌单里的所有歌曲
  tracks() {
    return state.tracks;
  },
  // 歌单组件 网友精选碟
  playlists() {
    return state.playlists;
  },
  // 歌单组件 最大条数
  total() {
    return state.total;
  },
  // 分类的名字
  class() {
    return state.categories;
  },
  // 分类的子类
  catList() {
    return state.sub;
  },
  // 推荐节目
  programs() {
    return state.programs;
  },
  // 24小时节目排行榜
  programToplist() {
    return state.programToplist;
  },
  // 推荐电台的ID与名称
  djprogram() {
    return state.Djprogram;
  },
  // 歌曲的url链接
  songUrl() {
    return state.url;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};

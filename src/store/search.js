import {
  reqSearchResults,
  reqLoginPhone,
  reqUserDetail,
  reqLogout,
} from "@/api";
// 引入本地存储的三个函数
import { setUserId, getUserId, removeToken } from "@/utils/userID";
const state = {
  // 搜索(单曲)
  songs: [],
  // 搜索(歌手)
  singer: [],
  // 搜索(专辑)
  albums: [],
  // 搜索(歌单)
  playlists: [],
  // 搜索(用户)
  user: [],
  //用户的id
  userId: getUserId(),
  // token
  token: "",
  // 用户详情
  profile: [],
};
const actions = {
  // 搜索的接口
  async getSearchResult({ commit }, { keyword, limit, type }) {
    let result = await reqSearchResults(keyword, limit, type);
    if (result.code == 200) {
      let songs = result.result.songs;
      let singer = result.result.artists;
      let albums = result.result.albums;
      let playlists = result.result.playlists;
      let user = result.result.userprofiles;
      if (songs) {
        commit("GETSEARCHRESULT", songs);
      } else if (singer) {
        commit("GETSINGERLIST", singer);
      } else if (albums) {
        commit("GETALBUMSLIST", albums);
      } else if (playlists) {
        commit("GETPLAYLISTS", playlists);
      } else if (user) {
        commit("GETUSERLIST", user);
      }
    }
  },
  // 用户手机号+密码登录
  async loginPhone({ commit }, { phone, password }) {
    let result = await reqLoginPhone(phone, password);
    if (result.code == 200) {
      console.log(result);
      let id = result.account.id;
      let token = result.token;
      commit("LOGINPHONE", { id, token });
      // 调用本地存储id的箭头函数
      setUserId(id);
      alert("登录成功");
    } else {
      alert(result.message);
    }
  },
  // 获取用户详情
  async getUserDetail({ commit }, id) {
    let result = await reqUserDetail(id);
    if (result.code == 200) {
      commit("GETUSERDETAIL", result.profile);
    }
  },
  // 退出登录
  async logout({ commit }) {
    let result = await reqLogout();
    if (result.code == 200) {
      removeToken();
      alert("退出登录成功");
    }
  },
};
const mutations = {
  GETSEARCHRESULT(state, songs) {
    state.songs = songs;
  },
  GETSINGERLIST(state, singer) {
    state.singer = singer;
  },
  GETALBUMSLIST(state, albums) {
    state.albums = albums;
  },
  GETPLAYLISTS(state, playlists) {
    state.playlists = playlists;
  },
  GETUSERLIST(state, user) {
    state.user = user;
  },
  LOGINPHONE(state, data) {
    state.userId = data.id;
    state.token = data.token;
  },
  GETUSERDETAIL(state, profile) {
    state.profile = profile;
  },
};
const getters = {
  songsList() {
    return state.songs;
  },
  singerList() {
    return state.singer;
  },
  albumsList() {
    return state.albums;
  },
  playlistsList() {
    return state.playlists;
  },
  userList() {
    return state.user;
  },
  userId() {
    return state.userId;
  },
  profile() {
    return state.profile;
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};

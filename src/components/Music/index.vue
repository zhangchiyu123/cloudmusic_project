<template>
  <div id="music">
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="aplayer"></div>
  </div>
</template>

<script>
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
import { mapGetters } from "vuex";
export default {
  name: "Music",
  data() {
    return {
      audio: [
        // 歌曲列表
        {
          name: "暂无歌曲", // 歌曲名字
          artist: "", // 歌曲演唱者
          // 歌曲地址（这里用外链地址）
          url: "",
          cover: "", // 歌曲头像
          lrc: "", // 歌词
          theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
          volume: 0.7,
        },
      ],
      songId: "",
    };
  },
  mounted() {
    // 初始化播放器
    this.initAudio();
    this.$bus.$on("songId", (id) => {
      this.songId = id;
    });
    this.$bus.$on("songDetail", this.songDetail);
    this.$bus.$on("playSong", this.playMusic);
  },
  methods: {
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      const ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
    },
    playMusic() {
      // 加定时器是为了解决第一次播放出错+点击两次才能播放歌曲的bug
      setTimeout(() => {
        const ap = new APlayer({
          container: document.getElementById("aplayer"),
          audio: this.audio, // 音乐信息
          ...this.info, // 其他配置信息
        });
        ap.play();
      }, 300);
    },
    // 获取歌曲详情
    async songDetail() {
      let result = await this.$API.reqSongDetail(this.songId);
      console.log(result);
      if (result.code == 200) {
        this.audio[0].name = result.songs[0].name;
        this.audio[0].cover = result.songs[0].al.picUrl;
        this.audio[0].artist = result.songs[0].ar[0].name;
      }
    },
  },
  computed: {
    ...mapGetters(["songUrl"]),
  },
  watch: {
    songUrl: {
      handler(newValue, oldValue) {
        this.audio[0].url = this.songUrl;
      },
    },
  },
};
</script>
<style lang="less" scoped>
#music {
  width: 100%;
  height: 73px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  transition: 0.5s all;
  //   &:hover {
  //     height: 73px;
  //   }
  #aplayer {
    margin: 0 auto;
    width: 100%;
    height: 73px;
  }
}
</style>

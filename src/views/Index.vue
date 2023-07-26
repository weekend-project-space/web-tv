<template>
  <video-player
    style="width: 100%; height: 100vh"
    :languages="languages"
    language="zh-CN"
    poster="/bg.png"
    autoplay
    :src="value"
    :tracks="tracks"
    :volume="0.6"
    controls
  >
  </video-player>
</template>

<script setup>
import zhCN from "video.js/dist/lang/zh-CN.json";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { translatePlugin, refreshTranslateBtn } from "../utils/videojsPlugins";
import videojs from "video.js";
const props = defineProps(["value", "track"]);
const tracks = computed(() => {
  return (
    (props.track && [
      {
        src: props.track,
        srclang: "en",
        label: "default",
        mode: "showing",
      },
    ]) ||
    undefined
  );
});
const languages = ref({
  "zh-CN": zhCN,
});

(() => {
  onMounted(() => {
    const player = videojs.getAllPlayers()[0];
    videojs.registerPlugin("translatePlugin", translatePlugin);
    player.translatePlugin();
    watch(tracks, () => {
      refreshTranslateBtn(player);
    });
  });
})();
</script>

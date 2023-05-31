<template>
  <Nav :tvs="tvs" :active="url"></Nav>
  <component :is="currentView" :value="url" />
</template>

<script setup>
import { listTv } from "./api";
import { parse, suffix } from "./utils/tvlistsupport";
import { ref, computed, onMounted } from "vue";
import Home from "./views/Index.vue";
import NotFound from "./views/NotFound.vue";
import Nav from "./components/Nav.vue";
const routes = {
  "/": Home,
};
const currentPath = ref(window.location.hash);
const url = ref("");
const tvs = ref([]);
window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});
const currentView = computed(() => {
  if (currentPath.value.slice(1).includes("?")) {
    url.value = new URLSearchParams(
      currentPath.value.slice(currentPath.value.indexOf("?"))
    ).get("url");
  }
  return routes[currentPath.value.slice(1).split("?")[0] || "/"] || NotFound;
});

onMounted(() => {
  async function initTvList() {
    let url0 = new URLSearchParams(window.location.search).get("url");
    if (!url0) {
      url0 = new URLSearchParams(window.location.hash.replace("#/", "")).get(
        "url"
      );
    }
    // tvurl
    let tvlistUrl = undefined;
    let suffixName = url0 && suffix(url0);
    if (
      url0 &&
      (suffixName == "json" || suffixName == "txt" || suffixName == "m3u")
    ) {
      tvlistUrl = url0;
      localStorage.setItem("tvlistUrl", tvlistUrl);
    } else if (localStorage.getItem("tvlistUrl")) {
      tvlistUrl = localStorage.getItem("tvlistUrl");
      url.value = url0;
    } else {
      tvlistUrl = "/tvlist.txt";
      url.value = url0;
    }
    // tvurl
    let d = await listTv(tvlistUrl);
    tvs.value = parse(d.data, tvlistUrl);
    if (!url.value) {
      url.value = tvs.value[1].url;
    }
  }
  initTvList();
});
</script>

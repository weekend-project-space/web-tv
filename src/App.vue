<template>
  <Nav :tvs="tvs" :active="url"></Nav>
  <component :is="currentView" :value="url" />
</template>

<script setup>
import { listTv } from "./api";
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
    url.value = new URLSearchParams(window.location.search).get("url");
    if (!url.value) {
      url.value = new URLSearchParams(
        window.location.hash.replace("#/", "")
      ).get("url");
    }
    // tvurl
    let tvUrl = undefined;
    if (
      url.value &&
      (url.value.lastIndexOf(".json") > 0 || url.value.lastIndexOf(".txt") > 0)
    ) {
      tvUrl = url.value;
      localStorage.setItem("tvUrl", tvUrl);
      url.value = undefined;
    } else if (localStorage.getItem("tvUrl")) {
      tvUrl = localStorage.getItem("tvUrl");
    } else {
      tvUrl = "/tvlist.txt";
    }
    // tvurl
    let d = await listTv(tvUrl);
    if (tvUrl.lastIndexOf(".txt")) {
      tvs.value = d.data.split("\n").map((line) => {
        if (line) {
          let args = line.split(",");
          return {
            name: args[0],
            url: args[1],
            isTv: args[1].includes("http"),
          };
        }
      });
    } else {
      tvs.value = d.data;
    }
    if (!url.value) {
      url.value = tvs.value[1].url;
    }
  }
  initTvList();
});
</script>

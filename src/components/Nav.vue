<template>
  <div class="nav">
    <div class="nav-menu">
      <img class="logo" src="../assets/logo.svg" alt="" />
    </div>
    <div class="nav-list-warp">
      <ul class="nav-list">
        <li v-for="i in tvs" :key="i.name">
          <span v-if="i.isTv">
            <a :href="'/#/?url=' + i.url"
              >&nbsp;&nbsp;&nbsp;{{ i.name }}</a
            ></span
          >
          <span v-else>{{ i.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps(["tvs"]);
</script>

<style lang="less" scoped>
.nav {
  position: absolute;
  top: 1rem;
  left: 1rem;

  z-index: 100;
  color: #fff;
  .nav-menu {
    width: 2rem;
    height: 2rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    .logo {
      width: 2rem;
    }
  }
  .nav-list-warp {
    display: none;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem 0 1rem 1rem;
    border-radius: 1rem;
  }
  &:hover {
    .nav-list-warp {
      display: block;
    }
    .nav-menu {
      display: none;
    }
  }
  .nav-list {
    margin: 0;
    padding: 0;
    list-style: none;

    max-height: calc(100vh - 4rem);
    overflow: auto;
  }
}
</style>

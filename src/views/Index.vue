<template>
  <video-player
    style="width: 100%; height: 100vh"
    poster="/bg.png"
    autoplay
    :src="value"
    controls
    :volume="0.6"
  />
</template>

<script setup>
defineProps(["value"]);
</script>

<template>
  <video-player
    style="width: 100%; height: 100vh"
    :src="value"
    controls
    :volume="0.6"
  />
</template>

<script setup>
defineProps(["value"]);
</script>

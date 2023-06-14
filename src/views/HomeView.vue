<template>
  <div class="bg-color">
    <RotatingGallery></RotatingGallery>
  </div>
</template>

<script setup>
import RotatingGallery from "../components/home-view/RotatingGallery.vue";
import TetrisGame from "../components/tetris/TetrisGame.vue";
</script>

<style scoped>
.bg-color {
  background-color: var(--primary-dark);
}
</style>

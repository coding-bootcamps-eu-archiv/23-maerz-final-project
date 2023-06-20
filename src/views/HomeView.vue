<template>
  <div class="bg-color">
    <RotatingGallery></RotatingGallery>
  </div>
</template>

<script setup>
import RotatingGallery from "../components/home-view/RotatingGallery.vue";
</script>

<style scoped>
.bg-color {
  /* background-color: var(--primary-dark); */
  background-image: url(src/assets/img/background/background-2.png);
  margin: 1.5rem;
}
</style>

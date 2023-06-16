<template>
  <div class="bg-color">
    <RotatingGallery></RotatingGallery>
    <!-- <HiddenGallery></HiddenGallery> -->
  </div>
</template>

<script setup>
import RotatingGallery from "../components/home-view/RotatingGallery.vue";
import HiddenGallery from "../components/all-games-view/HiddenGallery.vue";
</script>

<style scoped>
.bg-color {
  background-color: var(--primary-dark);
}
</style>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import HeaderArea from "@/components/home-view/HeaderArea.vue";
import FooterArea from "@/components/home-view/FooterArea.vue";
</script>

<template>
  <HeaderArea></HeaderArea>
  <main class="router-view">
    <RouterView />
  </main>
  <FooterArea></FooterArea>
</template>

<style scoped>
.router-view {
  background-color: var(--primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

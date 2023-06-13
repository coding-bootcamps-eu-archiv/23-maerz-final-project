<script setup>
import { RouterLink, RouterView } from "vue-router";
import HeaderArea from "@/components/home-view/HeaderArea.vue";
import FooterArea from "@/components/home-view/FooterArea.vue";
</script>

<template>
  <HeaderArea></HeaderArea>

  <RouterView />
  <FooterArea></FooterArea>
</template>

<style scoped></style>

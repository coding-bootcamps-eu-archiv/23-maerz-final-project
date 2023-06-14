<template>
  <div class="all-cards-wrapper">
    <GameCard v-for="game in games" :name="game.name"></GameCard>
  </div>
</template>

<script setup>
import GameCard from "@/components/all-games-view/GameCard.vue";
import { ref } from "vue";

// data
const games = ref([
  {
    id: 1,
    name: "memory",
    img: "dsdjkfdsf",
    link: "",
  },
  {
    id: 2,
    name: "rock paper scissors",
    img: "jfhjgh",
    link: "",
  },
]);
</script>

<style scoped>
.all-cards-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 2rem;
  background-color: var(--primary-dark);
}
</style>

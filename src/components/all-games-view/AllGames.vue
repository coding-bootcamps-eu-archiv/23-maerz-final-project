<template>
  <div class="all-cards-wrapper">
    <GameCard
      v-for="game in games"
      :name="game.name"
      :route="game.route"
      :img="game.img"
    ></GameCard>
  </div>
</template>

<script setup>
import GameCard from "@/components/all-games-view/GameCard.vue";
import { ref } from "vue";

// data
const games = ref([
  {
    id: 1,
    name: "Memory",
    img: "src/assets/img/preview/memory-preview.png",
    route: "/games/memory",
  },
  {
    id: 2,
    name: "R-P-S",
    img: "src/assets/img/preview/rps-preview.png",
    route: "/games/rock-paper-scissors",
  },
  {
    id: 3,
    name: "Hangman",
    img: "src/assets/img/preview/hangman-preview.png",
    route: "/games/hangman",
  },
  {
    id: 4,
    name: "Tetris",
    img: "src/assets/img/preview/tetris-preview.png",
    route: "/games/tetris",
  },
]);
</script>

<style scoped>
.all-cards-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 2rem;
  height: 100%;
}
</style>

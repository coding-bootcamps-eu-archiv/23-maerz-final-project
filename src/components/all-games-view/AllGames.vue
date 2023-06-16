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

import tetrisImg from "/src/assets/img/preview/tetris-preview.png";
import hangmanImg from "/src/assets/img/preview/hangman-preview.png";
import rpsImg from "/src/assets/img/preview/rps-preview.png";
import memoryImg from "/src/assets/img/preview/memory-preview.png";

// data
const games = ref([
  {
    id: 1,
    name: "Memory",
    img: memoryImg,
    route: "/games/memory",
  },
  {
    id: 2,
    name: "R-P-S",
    img: rpsImg,
    route: "/games/rock-paper-scissors",
  },
  {
    id: 3,
    name: "Hangman",
    img: hangmanImg,
    route: "/games/hangman",
  },
  {
    id: 4,
    name: "Tetris",
    img: tetrisImg,
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

<template>
  <div class="all-cards-wrapper">
    <GameCard
      v-for="game in games"
      :name="game.name"
      :route="game.route"
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
    img: "",
    route: "/games/memory",
  },
  {
    id: 2,
    name: "Rock Paper Scissors",
    img: "",
    route: "/games/rock-paper-scissors",
  },
  {
    id: 3,
    name: "Hangman",
    img: "",
    route: "/games/hangman",
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

<template>
  <header class="header">
    <h1>Rock Paper Scissors</h1>
    <section class="game-state">
      <p>games won: {{ allGamesWon }}</p>
      <p>games lost: {{ allGamesLost }}</p>
    </section>
  </header>
  <div class="game-wrapper">
    <section class="score-wrapper">
      <h2>current game:</h2>
      <div>you won {{ userPoints }}x</div>
      <div>your opponent won {{ opponentPoints }}x</div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// game state/score in one round
const userPoints = ref(0);
const opponentPoints = ref(0);

// all games overall game state
const allGamesWon = ref(0);
const allGamesLost = ref(0);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sigmar+One&family=VT323&display=swap");

h1 {
  font-family: "Sigmar One", cursive;
  font-size: 4rem;
}
.header {
  font-family: "VT323", monospace;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: max-content;
  height: 15rem;
  margin: 0 auto;
}

.game-wrapper {
  font-family: "VT323", monospace;
  font-size: 1.5rem;
  margin: 0 auto;
  border: 0.25rem solid black;
  border-radius: 1rem;
  width: 100ch;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgb(242, 238, 230);
  color: black;
  margin-bottom: 2rem;
}

.score-wrapper {
  gap: 1rem;

  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 0;
}
</style>

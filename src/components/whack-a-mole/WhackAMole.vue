<template>
  <div id="game">
    <header>
      <h1>Whack A Mole</h1>
      <p v-if="gameInProgess === true">Time left: {{ time }} seconds</p>
    </header>
    <main ref="grid">
      <button
        v-if="gameInProgess === true"
        class="mole"
        @click="whack()"
        :style="{ gridColumnStart: column, gridRowStart: row }"
      ></button>
      <div class="menu" v-if="gameInProgess === false">
        <button class="new-game" @click="newGame()">Start Game</button>
        <p class="game-stats" v-if="showAfterGameStats">
          Your Score is {{ score }}
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { saveHighscore } from "../../stores/saveHighscore.js";

const score = ref(0);
const column = ref(0);
const row = ref(0);
const timeoutId = ref(null);
const time = ref(0);
const showAfterGameStats = ref(false);

const grid = ref(null);

function newGame() {
  score.value = 0;
  showAfterGameStats.value = false;
  time.value = 10;

  moveMole();
  randomPosition(1000);

  const interval = setInterval(() => {
    time.value--;
    if (time.value === 0) {
      showAfterGameStats.value = true;
      clearInterval(interval);
      clearTimeout(timeoutId.value);
      saveHighscore("wam", score.value);
    }
  }, 1000);
}

function whack() {
  if (time.value === 0) {
    return;
  }

  score.value++;

  window.clearTimeout(timeoutId.value);
  timeoutId.value = null;
  moveMole();
  randomPosition(1000);
}

function randomPosition(timeout) {
  timeoutId.value = window.setTimeout(() => {
    moveMole();
    randomPosition(1000);
  }, timeout);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function moveMole() {
  column.value = getRandomNumber(1, columns.value);
  row.value = getRandomNumber(1, rows.value);
}

const gameInProgess = computed(() => {
  return time.value !== 0;
});

const columns = computed(() => {
  if (grid.value) {
    const styles = window.getComputedStyle(grid.value);
    return styles.gridTemplateColumns.split(" ").length;
  }
  return 0;
});

const rows = computed(() => {
  if (grid.value) {
    const styles = window.getComputedStyle(grid.value);
    return styles.gridTemplateRows.split(" ").length;
  }
  return 0;
});
</script>

<style scoped>
#game {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

header {
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  font-size: 2rem;
}

header > * {
  padding: 0;
  margin: 0;
}

main {
  position: relative;
  background-color: #f2a65a;
  _background-image: linear-gradient(0deg, #772f1a 0%, #f2a65a 74%);
  display: grid;
  grid-template-columns: repeat(auto-fill, 5rem);
  grid-template-rows: repeat(auto-fill, 5rem);
  justify-content: center;
  align-content: center;
}

.mole {
  all: unset;
  cursor: pointer;
  display: inline-block;
  width: 5rem;
  aspect-ratio: 1 / 1;

  background-image: url("../../assets/img/icons/mole.png");
  background-size: cover;
}

.mole:hover {
  /* outline: 0.2rem dotted #772f1a; */
  background-color: var(--accent-color-two);
  border-radius: 50%;
}

.menu {
  position: absolute;
  justify-self: center;
  align-self: center;
  font-size: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-game {
  all: unset;
  font-size: 2rem;
  display: inline-block;
  border: 0.2rem solid black;
  border-radius: 0.2rem;
  padding: 1rem 1.5rem;
  background-color: white;
  cursor: pointer;
}
</style>

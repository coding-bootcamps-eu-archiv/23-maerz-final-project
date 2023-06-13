<template>
  <section class="grid-wrapper">
    <div :class="cell.class" v-for="cell in grid"></div>
  </section>
  <button @click="undrawTetromino()">undraw</button>
  <button @click="move()">start</button>
</template>

<script setup>
import { ref } from "vue";

// this creates the game grid
const grid = ref([]);

function createGrid() {
  for (let i = 0; i < 200; i++) {
    grid.value.push({ id: i, class: "grid-cell" });
  }
}
createGrid();

// tetrominos
const width = ref(10);

const lTetromino = ref([
  [1, width.value + 1, width.value * 2 + 1, 2],
  [width.value, width.value + 1, width.value + 2, width.value * 2 + 2],
  [1, width.value + 1, width.value * 2 + 1, width.value * 2],
  [width.value, width.value * 2, width.value * 2 + 1, width.value * 2 + 2],
]);

const theTetrominos = ref([lTetromino.value]);

// position and tetromino selection
const currentPosition = ref(4);
const currentRotation = ref(0);

const currentTetromino = ref(theTetrominos.value[0][currentRotation.value]);

function drawTetromino() {
  currentTetromino.value.forEach((index) => {
    grid.value[currentPosition.value + index].class = "tetromino";
  });
}

function undrawTetromino() {
  currentTetromino.value.forEach((index) => {
    grid.value[currentPosition.value + index].class = "grid-cell";
  });
}

// drawTetromino();
// moving tetrominos

function move() {
  drawTetromino();
  timerId = setInterval(moveDown, 80);
  function moveDown() {
    undrawTetromino();
    currentPosition.value += width.value;
    drawTetromino();
  }
}
</script>

<style scoped>
.grid-wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 200px;
  background-color: yellow;
}

.grid-cell {
  _background-color: red;
  height: 20px;
  width: 20px;
  font-size: 0.8rem;
}

.tetromino {
  background-color: aqua;
  height: 20px;
  width: 20px;
}
</style>

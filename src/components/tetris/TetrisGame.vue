<template>
  <section class="grid-wrapper">
    <div class="grid-cell" v-for="cell in grid"></div>
  </section>
  <button></button>
</template>

<script setup>
import { ref } from "vue";

// this creates the game grid
const grid = ref([]);

function createGrid() {
  for (let i = 0; i < 200; i++) {
    grid.value.push(i);
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

const theTetrominos = ref([lTetromino]);

// position and tetromino selection
const currentPosition = ref(4);
const currentTetromino = ref(theTetrominos.value[0][0]);
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
  background-color: red;
  height: 20px;
  width: 20px;
  font-size: 0.8rem;
}
</style>

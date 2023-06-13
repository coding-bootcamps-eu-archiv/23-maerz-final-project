<template>
  <section class="game-wrapper">
    <div class="grid-cell" v-for="cell in grid">{{ cell }}</div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const grid = ref([]);

function createGrid() {
  for (let i = 0; i < 200; i++) {
    grid.value.push(i);
  }
}

createGrid();
console.log(grid);
</script>

<style scoped>
.game-wrapper {
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

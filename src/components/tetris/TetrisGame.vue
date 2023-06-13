<template>
  <section class="grid-wrapper" @click="moveLeft()">
    <div :class="cell.class" v-for="cell in grid">{{ cell.id }}</div>
  </section>
  <button @click="undrawTetromino()">undraw</button>
  <button @click="startGame()">start</button>
</template>

<script setup>
import { ref } from "vue";

// this creates the game grid
const grid = ref([]);

function createGrid() {
  for (let i = 0; i < 200; i++) {
    grid.value.push({ id: i, class: "grid-cell", isTaken: false });
  }
  for (let i = 0; i < 10; i++) {
    grid.value.push({ id: i + 199, class: "end", isTaken: true });
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
    // grid.value[currentPosition.value + index].isTaken = true;
  });
}

function undrawTetromino() {
  currentTetromino.value.forEach((index) => {
    grid.value[currentPosition.value + index].class = "grid-cell";
    // grid.value[currentPosition.value + index].isTaken = false;
  });
}

// moving tetrominos down every intervall
function moveDown() {
  undrawTetromino();
  currentPosition.value += width.value;
  drawTetromino();
  freeze();
}

// function to start the game and reset timer
let timerId;

function startGame() {
  // if (timerId) {
  //   clearInterval(timerId);
  //   timerId = null;
  // } else {
  //   drawTetromino();
  //   timerId = setInterval(moveDown, 200);
  // }
  timerId = setInterval(moveDown, 200);
}

// freezes the tetrominos if they touch a grid cell that is taken
function freeze() {
  if (
    currentTetromino.value.some(
      (index) =>
        grid.value[currentPosition.value + index + width.value].isTaken === true
    )
  ) {
    currentTetromino.value.forEach((index) => {
      //changes the grid cells of the tetromino to taken
      grid.value[currentPosition.value + index].isTaken = true;
      //selects a new tetromino and puts it at the start

      // clearInterval(timerId);
      console.log(index);
      console.log("is blocked");
    });
    currentTetromino.value = theTetrominos.value[0][currentRotation.value];
    currentPosition.value = 2;
    clearInterval(timerId);
    startGame();
  }
}

// moving tetrominos left

function moveLeft() {
  undrawTetromino();
  let isAtLeftEdge = currentTetromino.value.some((index) => {
    (currentPosition.value + index) % width.value === 0;
  });

  if (!isAtLeftEdge) {
    console.log(isAtLeftEdge);
    currentPosition.value -= 1;
  }

  if (
    currentTetromino.value.forEach(
      (index) => grid.value[currentPosition.value + index].isTaken === true
    )
  ) {
    currentPosition.value += 1;
  }
  drawTetromino();
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
.taken {
}
</style>

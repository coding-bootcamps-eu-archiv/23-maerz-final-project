<template>
  <section class="grid-wrapper">
    <div :class="cell.class" v-for="cell in grid"></div>
  </section>
  <button @click="undrawTetromino()">undraw</button>
  <button @click="startGame()">start</button>
  <button @click="moveLeft()">Left</button>
  <button @click="moveRight()">Right</button>
  <button @click="rotate()">rotate</button>
  <div>Score: {{ score }}</div>
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

// keeps score
const score = ref(0);

// tetrominos
const width = ref(10);

const lTetromino = ref([
  [1, width.value + 1, width.value * 2 + 1, 2],
  [width.value, width.value + 1, width.value + 2, width.value * 2 + 2],
  [1, width.value + 1, width.value * 2 + 1, width.value * 2],
  [width.value, width.value * 2, width.value * 2 + 1, width.value * 2 + 2],
]);

const zTetromino = ref([
  [0, width.value, width.value + 1, width.value * 2 + 1],
  [width.value + 1, width.value + 2, width.value * 2, width.value * 2 + 1],
  [0, width.value, width.value + 1, width.value * 2 + 1],
  [width.value + 1, width.value + 2, width.value * 2, width.value * 2 + 1],
]);

const tTetromino = ref([
  [1, width.value, width.value + 1, width.value + 2],
  [1, width.value + 1, width.value + 2, width.value * 2 + 1],
  [width.value, width.value + 1, width.value + 2, width.value * 2 + 1],
  [1, width.value, width.value + 1, width.value * 2 + 1],
]);

const oTetromino = ref([
  [0, 1, width.value, width.value + 1],
  [0, 1, width.value, width.value + 1],
  [0, 1, width.value, width.value + 1],
  [0, 1, width.value, width.value + 1],
]);

const iTetromino = ref([
  [1, width.value + 1, width.value * 2 + 1, width.value * 3 + 1],
  [width.value, width.value + 1, width.value + 2, width.value + 3],
  [1, width.value + 1, width.value * 2 + 1, width.value * 3 + 1],
  [width.value, width.value + 1, width.value + 2, width.value + 3],
]);

const theTetrominos = ref([
  lTetromino.value,
  zTetromino.value,
  tTetromino.value,
  oTetromino.value,
  iTetromino.value,
]);

// position and tetromino selection
const currentPosition = ref(4);
const currentRotation = ref(0);

let random = Math.floor(Math.random() * theTetrominos.value.length);
const currentTetromino = ref(
  theTetrominos.value[random][currentRotation.value]
);

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
    });
    // puts out another tetromino
    let nextRandom = Math.floor(Math.random() * theTetrominos.value.length);
    random = nextRandom;
    currentTetromino.value = theTetrominos.value[random][currentRotation.value];
    currentPosition.value = 4;
    clearInterval(timerId);
    addScore();
    startGame();
  }
}

// moving tetrominos left and right

function moveLeft() {
  undrawTetromino();

  // checks if tetromino hit the left border
  const isAtLeftEdge = currentTetromino.value.some(
    (index) => (currentPosition.value + index) % width.value === 0
  );

  if (!isAtLeftEdge) {
    currentPosition.value -= 1;
  }

  // checks if space is already taken by a tetromino
  if (
    currentTetromino.value.some(
      (index) => grid.value[currentPosition.value + index].isTaken === true
    )
  ) {
    currentPosition.value += 1;
  }
  drawTetromino();
}

function moveRight() {
  undrawTetromino();

  // checks if tetromino hit the right border
  const isAtRightEdge = currentTetromino.value.some(
    (index) => (currentPosition.value + index) % width.value === width.value - 1
  );

  if (!isAtRightEdge) {
    currentPosition.value += 1;
  }

  // checks if space is already taken by a tetromino
  if (
    currentTetromino.value.some(
      (index) => grid.value[currentPosition.value + index].isTaken === true
    )
  ) {
    currentPosition.value -= 1;
  }
  drawTetromino();
}

// rotate tetromino

function rotate() {
  undrawTetromino();
  currentRotation.value++;
  // reset rotation to position one
  if (currentRotation.value === 4) {
    currentRotation.value = 0;
  }
  currentTetromino.value = theTetrominos.value[random][currentRotation.value];
  drawTetromino();
}

// event listener for key controls

function keyControl(input) {
  if (input.keyCode === 37) {
    moveLeft();
  } else if (input.keyCode === 38) {
    rotate();
  } else if (input.keyCode === 39) {
    moveRight();
  }
}
document.addEventListener("keydown", keyControl);

// removes filled lines and adds score

function addScore() {
  for (let i = 0; i < 199; i += width.value) {
    // checking a whole row
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];

    function checkRows() {
      let isFilled = true;
      row.forEach((element) => {
        if (grid.value[element].class === "grid-cell") {
          isFilled = false;
        }
      });
      return isFilled;
    }

    checkRows();

    if (checkRows()) {
      score.value += 100;

      //changes the row back to default
      row.forEach((index) => {
        grid.value[index].class = "grid-cell";
        grid.value[index].isTaken = false;
      });

      const removeRow = grid.value.splice(i, width.value);
      grid.value = removeRow.concat(grid.value);
    }
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
.taken {
}
</style>

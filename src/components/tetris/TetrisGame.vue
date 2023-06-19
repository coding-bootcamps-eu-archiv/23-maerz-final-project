<template>
  <div class="main-wrapper">
    <h1 class="game-headline">TETRIS</h1>
    <div class="game-wrapper">
      <div class="game-border-wrapper">
        <section class="grid-wrapper">
          <template v-if="gameActive">
            <div :class="cell.class" v-for="cell in grid"></div>
          </template>
          <template v-else>
            <div class="final-screen">
              <div id="game-over">GAME OVER</div>
              <div id="final-score">Score: {{ score }}</div>
            </div>
          </template>
        </section>
      </div>
      <nav class="menu-wrapper">
        <div class="menu-item">Score: {{ score }}</div>
        <div class="menu-item">Level: {{ level }}</div>
        <div class="menu-item" id="manual">
          <button :class="upArrow" @click="rotate()">&#9651; Rotate</button>
          <button :class="rightArrow" @click="moveRight()">
            &#9655; Move Right
          </button>
          <button :class="leftArrow" @click="moveLeft()">
            &#9665; Move Left
          </button>
          <button :class="downArrow" @click="moveDown()">
            &#9661; Move Down
          </button>
        </div>
        <button
          v-if="gameActive"
          @click="autoMove()"
          class="menu-item"
          id="start-button"
        >
          Start
        </button>
        <button
          v-else
          @click="autoMove(), startGame()"
          class="menu-item"
          id="start-button"
        >
          Restart
        </button>

        <button
          v-if="audioOn"
          @click="toggleMusic()"
          class="menu-item"
          id="start-button"
        >
          Music: On
        </button>
        <button
          v-else
          @click="toggleMusic()"
          class="menu-item"
          id="start-button"
        >
          Music: Off
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import themeMusic from "/src/assets/audio/tetris-soundtrack.mp3";
import { saveHighscore } from "../../stores/saveHighscore";

// saveHighscore("Tetris", 400);

// handles the music loading and toggle

const audioOn = ref(false);

function toggleMusic() {
  audioOn.value = !audioOn.value;

  if (audioOn.value) {
    playMusic();
  } else {
    stopMusic();
  }
}

const audio = new Audio(themeMusic);

function playMusic() {
  audio.muted = false;
  audio.volume = 0.05;
  audio.loop = true;
  audio.play();
}

function stopMusic() {
  audio.muted = true;
}

// this creates the game grid
const grid = ref([]);

function startGame() {
  grid.value = [];
  gameActive.value = true;
  function createGrid() {
    for (let i = 0; i < 200; i++) {
      grid.value.push({ id: i, class: "grid-cell", isTaken: false });
    }
    for (let i = 0; i < 10; i++) {
      grid.value.push({ id: i + 199, class: "end", isTaken: true });
    }
  }

  createGrid();
}

onMounted(() => {
  startGame();
});

// keeps score
const score = ref(0);

// keeps level
const level = computed(() => {
  if (score.value < 500) {
    return 1;
  } else if (score.value < 1000) {
    return 2;
  } else if (score.value < 1500) {
    return 3;
  } else {
    return 3;
  }
});

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
let nextRandom = 0;

function autoMove() {
  if (level.value === 1) {
    timerId = setInterval(moveDown, 400);
  } else if (level.value === 2) {
    timerId = setInterval(moveDown, 300);
  } else if (level.value === 3) {
    timerId = setInterval(moveDown, 200);
  }
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
    nextRandom = Math.floor(Math.random() * theTetrominos.value.length);
    random = nextRandom;
    currentTetromino.value = theTetrominos.value[random][currentRotation.value];
    currentPosition.value = 4;
    clearInterval(timerId);
    addScore();
    gameOver();
    if (gameActive.value) {
      autoMove();
    }
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

// left and right checks for the rotation
function isAtRight() {
  return currentTetromino.value.some(
    (index) => (currentPosition.value + index + 1) % width.value === 0
  );
}

function isAtLeft() {
  return currentTetromino.value.some(
    (index) => (currentPosition.value + index) % width.value === 0
  );
}

// checks the rotated position

function checkRotation(position) {
  position = position || currentPosition.value;
  if ((position + 1) % width < 4) {
    if (isAtRight()) {
      currentPosition.value += 1;
      checkRotation(position);
    }
  } else if (position % width > 5) {
    if (isAtLeft()) {
      currentPosition.value -= 1;
      checkRotation(position);
    }
  }
}

// rotate tetromino
function rotate() {
  undrawTetromino();
  // checks if the position is taken by another tetromino
  const isTaken = currentTetromino.value.some(
    (index) => grid.value[currentPosition.value + 1 + index].isTaken === true
  );

  if (!isTaken) {
    currentRotation.value++;
  }

  // reset rotation to position one
  if (currentRotation.value === 4) {
    currentRotation.value = 0;
  }
  currentTetromino.value = theTetrominos.value[random][currentRotation.value];
  checkRotation();
  drawTetromino();
}

// event listener for key controls
function keyPress(input) {
  if (input.keyCode === 37) {
    leftArrow.value = "move-button-highlight";
    moveLeft();
  } else if (input.keyCode === 38) {
    upArrow.value = "move-button-highlight";
    rotate();
  } else if (input.keyCode === 39) {
    rightArrow.value = "move-button-highlight";
    moveRight();
  } else if (input.keyCode === 40) {
    downArrow.value = "move-button-highlight";
    moveDown();
  }
}

function keyRelease(input) {
  if (input.keyCode === 37) {
    setTimeout(() => {
      leftArrow.value = "move-button";
    }, 200);
  } else if (input.keyCode === 38) {
    setTimeout(() => {
      upArrow.value = "move-button";
    }, 200);
  } else if (input.keyCode === 39) {
    setTimeout(() => {
      rightArrow.value = "move-button";
    }, 200);
  } else if (input.keyCode === 40) {
    setTimeout(() => {
      downArrow.value = "move-button";
    }, 200);
  }
}

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

//highlight class for the manual area

const upArrow = ref("move-button");
const leftArrow = ref("move-button");
const rightArrow = ref("move-button");
const downArrow = ref("move-button");

function toggleHighlight() {
  isHighlighted.value = !isHighlighted.value;
}

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

// keeps track of gameover
const gameActive = ref(true);

// checks if the game is over
function gameOver() {
  if (
    currentTetromino.value.some(
      (index) => grid.value[currentPosition.value + index].class === "tetromino"
    )
  ) {
    gameActive.value = false;
    saveHighscore("Tetris", score.value);
  }
}
</script>

<style scoped>
.grid-wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 200px;
}

.grid-cell {
  background-color: #8d86c93b;
  height: 20px;
  width: 20px;
  font-size: 0.8rem;
  border: solid #a098e41a 1px;
}

.tetromino {
  background-color: #c73e1d;
  height: 20px;
  width: 20px;
  opacity: 0.8;
  border: outset #f74c21 2px;
}

.game-wrapper {
  display: flex;
  align-items: start;
  justify-content: start;
  margin: 1rem;
  gap: 1rem;
}

.game-border-wrapper {
  border: solid #8d86c9 2px;
}

.game-headline {
  color: white;
  font-size: 3rem;
  padding: 1rem;
}

.menu-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.final-screen {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  padding-top: 2.5rem;
  color: white;
  background-color: #8d86c93b;
}

.move-button {
  all: unset;
  color: white;
}

.move-button-highlight {
  all: unset;
  color: var(--accent-color-three);
  transition: color 0.1s ease-in;
}

.move-button:hover {
  color: var(--accent-color-three);
}

button {
  all: unset;
  border-radius: 5px;
  width: 80%;
}

#start-button:hover {
  background-color: #8d86c9;
  color: #242038;
}

#start-button {
  text-align: center;
  width: 50%;
}
.menu-item {
  background-color: #8d86c93b;
  color: white;
  padding: 0.5rem;
  border: solid #8d86c9 2px;
  width: 100%;
}

#manual {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

@keyframes slideInFromTop {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateX(0);
  }
}

#game-over {
  animation: 1s ease-out 0s 1 slideInFromTop;
  font-size: 3rem;
}

#final-score {
  animation: 1s ease-out 0s 1 slideInFromBottom;
  font-size: 2rem;
}
</style>

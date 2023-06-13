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

    <div v-if="choiceIsNotSet" class="start-game">
      <h3>choose your tool:</h3>
      <section class="choices-wrapper">
        <label class="choice-wrapper rock-btn">
          <input
            class="radio-btn"
            type="radio"
            name="choosing"
            id="rock"
            value="rock"
            v-model="userChoice"
          />
          rock
        </label>
        <label class="choice-wrapper paper-btn">
          <input
            class="radio-btn"
            type="radio"
            name="choosing"
            id="paper"
            value="paper"
            v-model="userChoice"
          />
          paper
        </label>
        <label class="choice-wrapper scissors-btn">
          <input
            class="radio-btn"
            type="radio"
            name="choosing"
            id="scissors"
            value="scissors"
            v-model="userChoice"
          />
          scissors
        </label>
      </section>
    </div>

    <section v-else class="choices-display-wrapper">
      <div class="user-choice-wrapper choice-display">{{ userChoice }}</div>
      <div>vs.</div>
      <div class="choice-display opponent-choice-wrapper">
        {{ opponentChoice }}
      </div>
    </section>
    <section class="bottom-wrap" v-if="!choiceIsNotSet">
      <button class="btn" :disabled="!isCompared" @click="compareChoices">
        Compare
      </button>

      <button class="btn" @click="playAgain" :disabled="isCompared">
        New Round
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// user choice of r, p or s
const userChoice = ref("");

// game state/score in one round
const message = ref("");
const userPoints = ref(0);
const opponentPoints = ref(0);

// all games overall game state
const allGamesWon = ref(0);
const allGamesLost = ref(0);

// displaying only 3 possible choices
const choiceIsNotSet = computed(() => {
  if (userChoice.value === "") {
    return true;
  } else {
    return false;
  }
});

// getting random choice for opponent
const possibleChoices = ref(["rock", "paper", "scissors"]);
let randomNum = ref();

const opponentChoice = ref("");

const randomChoice = computed(() => {
  if (userChoice.value !== "") {
    return possibleChoices.value[randomNum];
  }
});

// comparing user choice and opponent choice
const compareChoices = () => {
  randomNum = Math.floor(Math.random() * 3);
  opponentChoice.value = randomChoice.value;
  if (userChoice.value === opponentChoice.value) {
    message.value = "It's a draw!";
  } else if (
    (userChoice.value === "paper" && opponentChoice.value === "rock") ||
    (userChoice.value === "scissors" && opponentChoice.value === "paper") ||
    (userChoice.value === "rock" && opponentChoice.value === "scissors")
  ) {
    message.value = "One point to you!";
    userPoints.value++;
  } else if (
    (userChoice.value === "rock" && opponentChoice.value === "paper") ||
    (userChoice.value === "paper" && opponentChoice.value === "scissors") ||
    (userChoice.value === "scissors" && opponentChoice.value === "rock")
  ) {
    message.value = "One point to the opponent!";
    opponentPoints.value++;
  }
};

// disabling comparing button after clicking and enabling new game button
// when comparison is done
const isCompared = computed(() => {
  if (message.value === "") {
    return true;
  } else {
    return false;
  }
});

// new round
const playAgain = () => {
  userChoice.value = "";
  opponentChoice.value = "";
  message.value = "";
};
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

.start-game {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.choices-display-wrapper {
  display: flex;
  width: 80ch;
  justify-content: center;
  align-items: center;
  position: relative;
}

.choice-display {
  font-size: 1.5rem;
  margin: 1rem;
  padding: 3rem;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.25rem solid black;
  border-radius: 100%;
  cursor: pointer;

  color: black;
}

.user-choice-wrapper {
  position: absolute;
  left: 0;
  margin: 3rem;
}

.opponent-choice-wrapper {
  position: absolute;
  right: 0;
  margin: 3rem;
}

.radio-btn {
  all: unset;
}

.choices-wrapper {
  display: flex;
  margin: 3rem;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
}
.choice-wrapper {
  margin: 1rem;
  padding: 3rem;
  width: 5rem;
  height: 5rem;
  border: 0.25rem solid black;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
}

.rock-btn {
  background-color: rgb(40, 40, 132);
}

.paper-btn {
  background-color: #36827fff;
}

.scissors-btn {
  background-color: #f9db6dff;
  color: black;
}

.choice-wrapper:hover {
  border: 0.25rem solid white;
}
.bottom-wrap {
  display: flex;
  margin: 3rem;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.btn {
  all: unset;
  margin: 1rem;
  padding: 0.5rem;
  outline: 0.1rem solid black;
  color: white;
  background-color: rgb(107, 31, 31);
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:hover {
  box-shadow: -0.25rem 0.25rem black;
  transform: translate(0.25rem, -0.25rem);
}

.game-msg {
  text-align: center;
  margin: 2rem;
}
</style>

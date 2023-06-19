<template>
  <div id="wrapper">
    <div id="body">
      <header>
        <h1>Hangman</h1>
        <section id="top">
          <div id="status" :class="{ winner: isWinner }">{{ setStatus }}</div>

          <button id="newGameBtn" @click="startingNewGame">NEW GAME</button>
        </section>
      </header>

      <main>
        <div id="fails">Fails {{ fails }}/10</div>
        <div id="points">Points: {{ points }}</div>
        <div id="pointsRules">(-10 Points for every Fail)</div>
        <button
          id="safeScoreBtn"
          v-if="showSafeHighscoreButton"
          @click="safeScore"
        >
          {{ highscoreBtnText }}
        </button>
        <RouterLink v-if="highscoreSaved" :to="{ name: 'Highscores' }">
          <button id="safeScoreBtn">Go to Highscores!</button></RouterLink
        >
        <section id="outputArea">
          <div id="output" :class="{ winner: isWinner }">{{ hiddenWord }}</div>
        </section>
        <section id="keyboardArea">
          <button
            id="keyboardBtns"
            v-for="char in alphabet"
            :key="char"
            @click="pickingLetter(char)"
            :disabled="toBeDisabled[char]"
          >
            {{ char }}
          </button>
        </section>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { safeHighscore } from "../../stores/safeHighscore.js";
import { RouterLink } from "vue-router";

//Data Attributes
const fails = ref(0);
const points = ref(100);

const searchWords = ref([
  "Regex",
  "Boolean",
  "hotpink",
  "dodgerblue",
  "shallowcopy",
  "header",
  "padding",
  "papayawhip",
  "watcher",
  "flexbox",
]);
const newWord = ref([]);
const toBeDisabled = ref({});

const alphabet = ref("abcdefghijklmnopqrstuvwxyz".split(""));
const initialStatus = ref("");
//Hooks
onMounted(() => {
  initialStatus.value = "START NEW GAME";
});

//Methods
const setInitialStatusActive = () => {
  initialStatus.value = "ACTIVE";
};

const startingNewGame = () => {
  highscoreSaved.value = false;
  fails.value = 0;
  points.value = 100;
  toBeDisabled.value = {};
  newWord.value = searchWords.value[
    Math.floor(Math.random() * searchWords.value.length)
  ]
    .toLowerCase()
    .split("");
  replaceWithUnderscore();
  setInitialStatusActive();
};

const hiddenWord = ref("");
const replaceWithUnderscore = () => {
  hiddenWord.value = new Array(newWord.value.length).fill("_").join("");
};

const selectedLetter = ref(null);
const pickingLetter = (char) => {
  selectedLetter.value = char;
  searchAndReplaceLetter();
  toBeDisabled.value[char] = true;
};
const searchAndReplaceLetter = () => {
  let found = false;

  let hiddenWordArray = hiddenWord.value.split("");
  for (let i = 0; i < newWord.value.length; i++) {
    if (newWord.value[i] === selectedLetter.value) {
      hiddenWordArray[i] = selectedLetter.value;
      found = true;
    }
  }
  hiddenWord.value = hiddenWordArray.join("");

  if (found === false) {
    fails.value++;
    points.value -= 10;
    disableAllAt10Fails();
  }
};
const disableAllAt10Fails = (alphabet) => {
  if (fails.value === 10) {
    alphabet.forEach((char) => {
      toBeDisabled.value[char] = true;
    });
  }
};

// Computed Properties//

const isWinner = ref(false);
const showSafeHighscoreButton = ref(false);

const winner = computed(() => {
  if (hiddenWord.value.length > 0) {
    const isWordMatched = newWord.value.join("") === hiddenWord.value;
    isWinner.value = isWordMatched;
    showSafeHighscoreButton.value = isWordMatched;
    return isWordMatched;
  }
  return false;
});
const setStatus = computed(() => {
  if (fails.value === 10) {
    return "You Lose!";
  } else if (winner.value === true) {
    return "WINNER";
  } else {
    return initialStatus.value;
  }
});

// safe highscore
const displayedPoints = computed(() => `${points.value} Points`);
const highscoreSaved = ref(false);
const highscoreBtnText = computed(() => {
  return highscoreSaved.value ? "Highscore saved!" : "Safe Highscore";
});

const safeScore = () => {
  highscoreSaved.value = true;
  const game = "Hangman";
  const score = displayedPoints.value;
  safeHighscore.getHighscore(game, score);
};
</script>
<style scoped>
#body {
  max-width: 1300px;
  height: 750px;
  background-image: url("https://cdn.pixabay.com/photo/2020/10/24/21/21/sun-5682667_1280.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

h1 {
  font-family: "lobster";
  background: -webkit-linear-gradient(
    var(--accent-color-two) 40%,
    rgb(245, 3, 124) 65%,
    var(--accent-color-two) 75%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 5.5rem;
  font-weight: 1000;
  letter-spacing: 0.7rem;
  text-align: left;
  padding-bottom: 1rem;
  padding-top: 0rem;
}
header {
  margin: 3rem 2rem 0rem 2rem;
}

#top {
  display: flex;
  justify-content: space-between;
}
#status {
  -webkit-text-stroke: 1px var(--primary-light);
  -webkit-text-fill-color: transparent;
  font-size: 4rem;
  font-weight: 800;
  animation: blink 1s infinite;
}
#status.winner {
  animation: wiggle 0.5s ease-in-out 10;
}
@keyframes wiggle {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

#fails {
  font-size: 2.5rem;
  font-weight: 800;
  padding: 0.5rem 1rem;
  color: rgba(7, 1, 70);
  text-shadow: 2px 2px var(--accent-color-two);
  text-align: center;
  font-family: "Pacifico";
}

#points {
  position: absolute;
  top: -9rem;
  right: 2rem;
  color: var(--accent-color-three);
  font-size: 2rem;
}
#pointsRules {
  position: absolute;
  top: -7rem;
  right: 2rem;
  color: var(--accent-color-three);
  font-size: 1.3rem;
}
#safeScoreBtn {
  all: unset;
  position: absolute;
  top: 1rem;
  right: 2rem;
  border: 0.1rem solid var(--primary-dark);
  background-color: var(--primary-light);
  color: var(--primary-dark);
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  box-shadow: -0.25rem 0.25rem var(--accent-color-three);
}
#safeScoreBtn:active {
  color: var(--accent-color-three);
  background-color: var(--primary-dark);
}

#safeScoreBtn:hover {
  box-shadow: 0px 0px 5px 3px var(--accent-color-three);
  transform: scale(1.1);
}

#newGameBtn {
  all: unset;
  border: 0.1rem solid var(--primary-dark);
  background-color: var(--primary-light);
  color: var(--primary-dark);
  font-size: 2rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  box-shadow: -0.25rem 0.25rem var(--accent-color-three);
}

#newGameBtn:active {
  color: var(--accent-color-three);
  background-color: var(--primary-dark);
}

#newGameBtn:hover {
  box-shadow: 0px 0px 5px 3px var(--accent-color-three);
  transform: scale(1.1);
}

#outputArea {
  font-size: 4rem;
  font-family: "vt323", monospace;
  letter-spacing: 1rem;
  color: black;
  height: 310px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
}
#output {
  margin-top: 6.5rem;
  backdrop-filter: blur(8px);
  color: var(--primary-light);
  padding: 1rem;
  border-radius: 10px;
  font-size: 5rem;
}
#output.winner {
  animation: zoom 1s ease-in-out 1;
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

#keyboardArea {
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 68rem;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding: 2rem 9rem;
}
#keyboardBtns {
  background: var(--primary-light);
  font-family: "vt323", monospace;
  border: 3px solid black;
  font-size: 2.2rem;
  padding: 0.6rem 0.6rem;
  width: 3rem;
  box-shadow: 3px 4px 5px #ee00ff;
  cursor: pointer;
}

#keyboardBtns:hover {
  transform: scale(1.1);
}
</style>

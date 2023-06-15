<template>
  <body>
    <header>
      <h1>Hangman</h1>
      <section id="top">
        <div id="status">{{ setStatus }}</div>
        <div id="fails">Fails {{ fails }}/10</div>
        <button id="newGameBtn" @click="startingNewGame">NEW GAME</button>
      </section>
    </header>
    <main>
      <section id="outputArea">
        <div id="output">{{ hiddenWord }}</div>
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
  </body>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

//Data Attributes
const fails = ref(0);
const searchWords = ref([
  "Regex",
  "Boolean",
  "hotpink",
  "dodgerblue",
  "shallowcopy",
  "createTextNode",
  "localStorage",
  "papayawhip",
  "watcher",
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
  fails.value = 0;
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
const winner = computed(() => {
  if (hiddenWord.value.length > 0) {
    return newWord.value.join("") === hiddenWord.value;
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
</script>
<style scoped>
* {
  box-sizing: border-box;
}

html {
  font-family: "Pacifico", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}

html,
body {
  height: 100%;
}

body {
  width: 1200px;
  height: 750px;
  margin: 0;
  background-image: url("https://cdn.pixabay.com/photo/2020/10/24/21/21/sun-5682667_1280.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#app {
  margin: 0;
}

h1 {
  font-family: "Monoton";
  background: -webkit-linear-gradient(
    rgb(15, 1, 170) 20%,
    rgb(245, 3, 124) 45%,
    rgb(15, 1, 170) 60%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* text-shadow: 5px 5px yellow, 10px 10px blue; */
  font-size: 4.5rem;
  letter-spacing: 1rem;
  font-weight: lighter;
  text-align: center;
  margin: 0;
  padding-bottom: 2rem;
}
header {
  margin: 3rem 2rem 4rem 2rem;
  /* background: linear-gradient(#0f0012 20%, #c300ff 90%); */
}

main {
  height: 100%;
  font-family: "Bungee";
  display: flex;
  flex-direction: column;
}

#top {
  display: flex;
  justify-content: space-between;
}
#status {
  -webkit-text-stroke: 1px var(--primary-light);
  -webkit-text-fill-color: transparent;
  font-size: 3rem;
  font-weight: 800;
}

#fails {
  font-size: 2.5rem;
  font-weight: 800;
  padding: 0.5rem 1rem;
  color: rgba(7, 1, 70);
  text-shadow: 2px 2px rgb(0, 187, 143);
  text-align: center;
  font-family: "Pacifico";
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
/* #newGameBtn:active {
  box-shadow: 3px 4px 5px darkblue;
} */
#newGameBtn:active {
  color: var(--accent-color-three);
  background-color: var(--primary-dark);
}

#newGameBtn:hover {
  box-shadow: 0px 0px 5px 3px var(--accent-color-three);
  transform: scale(1.1);
}

#outputArea {
  font-size: 2rem;
  letter-spacing: 1rem;
  color: black;
  /* text-shadow: 2px 2px 2px papayawhip; */
  height: 310px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
}
#output {
  margin-top: 6.5rem;
  background-color: rgba(238, 0, 255, 0.8);
  color: antiquewhite;
  padding: 1.5rem;
  border-radius: 10px;
}

#keyboardArea {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding: 2rem 9rem;
}
#keyboardBtns {
  background: papayawhip;
  font-weight: bold;
  border: 3px solid black;
  font-size: 1.5rem;
  padding: 0.6rem 0.6rem;
  width: 3rem;
  box-shadow: 3px 4px 5px #ee00ff;
}
</style>

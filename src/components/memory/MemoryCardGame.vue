<template>
  <div id="wrapper">
    <section id="memory">
      <header id="header">
        <h1 id="h1">Memory</h1>
        <div id="subHeader">
          <div id="gameInfoBox" :class="{ winner: showSafeHighscoreButton }">
            <p id="gameStatus">
              {{ gameStatus }}
            </p>
            <p id="stopwatch">{{ stopwatch }}</p>
          </div>

          <button id="newGame" @click="startNewGame">New Game</button>
        </div>
      </header>

      <main id="gameContainer">
        <div
          v-if="gameStatus === 'ACTIVE'"
          class="memory_card"
          v-for="card in shuffledCards"
          :key="card.index"
          @click="showImage(card)"
        >
          <img
            v-if="card.status === 'hidden'"
            class="card-image"
            :src="card.defaultImg"
          />
          <img v-else class="card-image" :src="card.img" />
        </div>
        <div v-else id="startCover">
          <button
            id="safeScoreBtn"
            v-if="showSafeHighscoreButton"
            @click="safeScore"
          >
            {{ highscoreBtnText }}
          </button>
          <button v-else id="popupStartBtn" @click="startNewGame">
            Start Game!
          </button>

          <RouterLink v-if="highscoreSaved" :to="{ name: 'Highscores' }">
            <button id="safeScoreBtn">Go to Highscores!</button></RouterLink
          >
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import { safeHighscore } from "../../stores/safeHighscore.js";
import { RouterLink } from "vue-router";

const memoryCards = ref([
  {
    id: "cat1",
    img: "https://images.unsplash.com/photo-1546459094-0b7758695a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
  {
    id: "cat2",
    img: "https://cdn.pixabay.com/photo/2018/08/13/08/59/cat-3602554_1280.jpg",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
  {
    id: "cat3",
    img: "https://cdn.pixabay.com/photo/2017/02/24/01/30/cat-2093639_1280.jpg",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
  {
    id: "cat4",
    img: "https://cdn.pixabay.com/photo/2018/05/09/21/47/cat-3386220_1280.jpg",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
  {
    id: "cat5",
    img: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
  {
    id: "cat6",
    img: "https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
  {
    id: "cat7",
    img: "https://images.pexels.com/photos/162104/cat-british-shorthair-mieze-blue-eye-162104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
  {
    id: "cat8",
    img: "https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    clicked: false,
    shownCardSite: "back",
    defaultImg:
      "https://cdn.pixabay.com/photo/2018/05/21/19/54/wallpaper-3419273_1280.jpg",
    status: "hidden",
  },
]);

//Game-Setup

const showPopup = ref(false);

onBeforeMount(() => {
  setGameStatus();
});

onMounted(() => {
  setTimeout(() => {
    showPopup.value = true;
  }, 500);
});

const isGameStarted = ref(false);

const duplicatedCards = ref(
  memoryCards.value.flatMap((card) => [card, { ...card }])
);
const shuffledCards = ref([...duplicatedCards.value]);

const nowShuffleCards = () => {
  shuffledCards.value.sort(() => Math.random() - 0.5);
};

// Setup Stopwatch
const elapsedTime = ref(0);

let stopwatchId = null;

const stopwatch = computed(() => {
  const date = new Date(elapsedTime.value);
  return date.toLocaleString("en-US", {
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });
});

const startStopwatch = () => {
  elapsedTime.value = 0;
  const startTime = Date.now();
  stopwatchId = setInterval(() => {
    elapsedTime.value = Date.now() - startTime;
  }, 10);
};

const stopStopwatch = () => {
  clearInterval(stopwatchId);
};

// Start Game

const startNewGame = () => {
  isGameStarted.value = true;
  highscoreSaved.value = false;
  showSafeHighscoreButton.value = false;

  clickedCards.value = [];
  stopStopwatch();
  startStopwatch();
  shuffledCards.value.forEach((card) => {
    card.clicked = false;
    card.shownCardSite = "back";
    card.status = "hidden";
  });
  nowShuffleCards();
  setGameStatus();
};

// play Game

const clickedCards = computed(() => {
  return shuffledCards.value.filter((card) => card.clicked);
});

const showImage = (card) => {
  clickedCards.value = [];
  if (card.status === "hidden" && clickedCards.value.length < 2) {
    card.clicked = true;
    card.shownCardSite = card.img;
    card.status = "shown";
  }
  if (clickedCards.value.length === 2) {
    comparePairs();
  }
};

const comparePairs = () => {
  const clicked = clickedCards.value;

  if (clicked[0].id === clicked[1].id) {
    clicked[0].clicked = false;
    clicked[1].clicked = false;
    setGameStatus();
  } else {
    setTimeout(() => {
      clicked[0].clicked = false;
      clicked[0].shownCardSite = "back";
      clicked[0].status = "hidden";
      clicked[1].clicked = false;
      clicked[1].shownCardSite = "back";
      clicked[1].status = "hidden";
    }, 1000);
  }
};

//  Game Status
const gameStatus = ref("");
let showSafeHighscoreButton = ref(false);

const setGameStatus = () => {
  const foundAll = shuffledCards.value.filter(
    (card) => card.status === "hidden"
  );
  if (foundAll.length === 0) {
    gameStatus.value = "WINNER";
    showSafeHighscoreButton.value = true;
    stopStopwatch();
    return;
  }
  if (!isGameStarted.value) {
    gameStatus.value = "Start Game";
  } else {
    gameStatus.value = "ACTIVE";
  }
};

// Safe Highscore
const highscoreSaved = ref(false);
const highscoreBtnText = computed(() => {
  return highscoreSaved.value ? "Highscore saved!" : "Safe Highscore";
});

const safeScore = () => {
  highscoreSaved.value = true;
  const game = "Memory";
  const score = stopwatch.value;
  console.log(game);
  console.log(score);
  safeHighscore.getHighscore(game, score);
};
</script>

<style scoped>
#memory {
  position: relative;
  display: flex;
  min-width: 500px;
  max-width: 1500px;
  height: 900px;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  background-image: url(https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
header {
  margin: 2rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  justify-content: center;
  align-items: center;
}

#h1 {
  font-family: "bungee-shade";
  font-weight: 900;
  font-size: 3rem;
  color: white;
}

#subHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30rem;
}
#gameInfoBox {
  display: flex;
  flex-direction: column;
}
#gameInfoBox.winner {
  animation: zoom 1s ease-in-out 3;
}
@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.scale {
  animation: scaleAnimation 1s linear;
}

#gameStatus {
  color: var(--primary-light);
  font-size: 2rem;
  font-weight: 800;
  animation: blink 1s infinite;
}

#stopwatch {
  color: var(--primary-light);
  font-size: 2rem;
  font-weight: 700;
}

#newGame {
  all: unset;
  border: 0.1rem solid var(--primary-dark);
  background-color: var(--primary-light);
  color: var(--primary-dark);
  font-size: 2rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  box-shadow: -0.25rem 0.25rem var(--accent-color-two);
}
#newGame:active {
  color: var(--primary-light);
  background-color: var(--primary-dark);
}

#newGame:hover {
  box-shadow: none;
  transform: translate(-0.25rem, 0.25rem);
}

#gameContainer {
  position: relative;
  display: grid;
  justify-content: center;
  gap: 1.5rem;
  min-width: 30rem;
  min-height: 500px;
  max-width: 1000px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-template-rows: repeat(auto-fit);

  padding: 1rem 4rem;
}

.memory_card {
  border: 3px solid black;
  height: 10rem;
  width: 10rem;
  text-align: center;
  cursor: pointer;
}
.card-image {
  display: block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
}

#startCover {
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#popupStartBtn {
  text-decoration: none;
  all: unset;
  border: 0.1rem solid var(--primary-dark);
  background-color: var(--accent-color-two);
  color: var(--primary-light);
  font-size: 2rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.3s;
}
#popupStartBtn:active {
  color: var(--primary-light);
  background-color: var(--primary-dark);
}

#popupStartBtn:hover {
  box-shadow: 0px 0px 50px 15px black;
  transform: scale(1.5);
}

#safeScoreBtn {
  position: absolute;
  left: 60%;
  top: 60%;
  all: unset;
  border: 0.1rem solid var(--primary-dark);
  background-color: var(--accent-color-two);
  color: var(--primary-light);
  font-size: 2rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.3s;
}
#safeScoreBtn:active {
  color: var(--primary-light);
  background-color: var(--primary-dark);
}
#safeScoreBtn:hover {
  box-shadow: 0px 0px 50px 15px black;
  transform: scale(1.5);
}
</style>

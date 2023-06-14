<template>
  <section id="memory">
    <header>
      <!-- <div>Click-Count</div> -->
      <div>
        <p>{{ gameStatus }}</p>
        <p>{{ stopwatch }}</p>
      </div>
      <h1>Memory</h1>
      <button id="newGame" @click="startNewGame">New Game</button>
    </header>

    <main id="gameContainer">
      <div
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
      <!-- <div>{{ duplicatedCards }}</div>
      <div>{{ shuffledCards }}</div> -->
    </main>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

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
onMounted(() => {
  setGameStatus();
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
  //count null
  isGameStarted.value = true;

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

// const cardStatus = computed((card) => {
//   return (card) => card.status === 'shown'
// })

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
    }, 1300);
  }
};

//  Game Status
const gameStatus = ref("");

const setGameStatus = () => {
  const foundAll = shuffledCards.value.filter(
    (card) => card.status === "hidden"
  );
  if (foundAll.length === 0) {
    gameStatus.value = "WINNER";
    stopStopwatch();
    return;
  }
  if (!isGameStarted.value) {
    gameStatus.value = "Start Game";
  } else {
    gameStatus.value = "ACTIVE";
  }
};
</script>

<style>
#gameContainer {
  display: grid;
  justify-content: center;
  gap: 1rem;
  max-width: 600px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-template-rows: repeat(auto-fit);
  background: salmon;
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
</style>

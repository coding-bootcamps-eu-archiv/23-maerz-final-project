<template>
  <section id="memory">
    <header>
      <h1>Memory</h1>
      <div>Click-Count</div>
      <div>Timer</div>
      <p>{{ stopwatch }}</p>
      <button id="newGame" @click="startNewGame">New Game</button>
    </header>

    <main id="gameContainer">
      <div
        class="memory_card"
        v-for="card in shuffledCards"
        :key="card.index"
        @click="showImage(card)"
      >
        <span v-if="!cardStatus">{{ card.defaultImg }}</span>
        <span v-else>{{ card.shownCardSite }}</span>
      </div>
      <div>{{ duplicatedCards }}</div>
      <div>{{ shuffledCards }}</div>
      <div>___________________</div>
      <div>{{ clickedCards }}</div>
      <div>--------------------</div>
    </main>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const memoryCards = ref([
  {
    id: "cat1",
    img: "source1",
    clicked: false,
    shownCardSite: "back",
    defaultImg: "BILD",
    status: "hidden",
  },
  {
    id: "cat2",
    img: "source2",
    clicked: false,
    shownCardSite: "back",
    defaultImg: "BILD",
    status: "hidden",
  },
  {
    id: "cat3",
    img: "source3",
    clicked: false,
    shownCardSite: "back",
    defaultImg: "BILD",
    status: "hidden",
  },
  {
    id: "cat4",
    img: "source4",
    clicked: false,
    shownCardSite: "back",
    defaultImg: "BILD",
    status: "hidden",
  },
]);

//Game-Setup
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
  //timer null
  clickedCards.value = [];
  stopStopwatch();
  startStopwatch();
  shuffledCards.value.forEach((card) => {
    card.clicked = false;
    card.shownCardSite = "back";
    card.status = "hidden";
  });
  nowShuffleCards();
};

// play Game

const clickedCards = computed(() => {
  return shuffledCards.value.filter((card) => card.clicked);
});

const cardStatus = computed((card) => {
  return (card) => card.status === "shown";
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
    setTimeout(() => {
      clicked[0].clicked = false;
      clicked[1].clicked = false;
    }, 1000);
  } else {
    setTimeout(() => {
      clicked[0].clicked = false;
      clicked[0].shownCardSite = "back";
      clicked[0].status = "hidden";
      clicked[1].clicked = false;
      clicked[1].shownCardSite = "back";
      clicked[1].status = "hidden";
    }, 1700);
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
</style>

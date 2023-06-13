<template>
  <section id="memory">
    <header>
      <h1>Memory</h1>
      <div>Click-Count</div>
      <div>Timer</div>
      <p>{{ timer }}</p>
      <button id="newGame" @click="startNewGame">New Game</button>
    </header>

    <main id="gameContainer">
      <div
        class="memory_card"
        v-for="card in shuffledCards"
        :key="card.index"
        @click="showImage(card)"
      >
        <span v-if="!card.clicked">{{ card.defaultImg }}</span>
        <span v-else>{{ card.shownCardSite }}</span>
      </div>
      <div>{{ duplicatedCards }}</div>
      <div>{{ shuffledCards }}</div>
      <div>{{ countClickedCards }}</div>
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
  },
  {
    id: "cat2",
    img: "source2",
    clicked: false,
    shownCardSite: "back",
    defaultImg: "BILD",
  },
  {
    id: "cat3",
    img: "source3",
    clicked: false,
    shownCardSite: "back",
    defaultImg: "BILD",
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

// play Game

const countClickedCards = computed(() => {
  return shuffledCards.value.filter((card) => card.clicked).length;
});

const showImage = (card) => {
  if (countClickedCards.value < 2) {
    card.clicked = true;
    card.shownCardSite = card.img;
  }
};

// New Game Button
const startNewGame = () => {
  //count null
  //timer null
  countClickedCards.value = [];
  shuffledCards.value.forEach((card) => {
    card.clicked = false;
  });
  nowShuffleCards();
};

const timer = computed(() => {});
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

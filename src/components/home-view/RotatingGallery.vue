<template>
  <div class="gallery-wrapper">
    <img :src="gameBoy" alt="gameboy" class="gameboy" />
    <img :src="picture" :alt="name" class="preview-picture" />
    <div class="gameboy-background">
      <button @click="nextPic()" class="arrow" id="arrow-right">
        &#8250;&#8250;
      </button>
      <button @click="prevPic()" class="arrow" id="arrow-left">
        &#8249;&#8249;
      </button>
      <button @click="randomPic()" class="arrow" id="random">?</button>
      <RouterLink :to="route" id="router-link"
        ><button class="arrow">P</button></RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import gameBoy from "/src/assets/img/icons/noun-gameboy-2486655.png";

const games = ref([
  {
    name: "tetris",
    picture: "src/assets/img/preview/tetris-preview.png",
    route: "/games/tetris",
  },
  {
    name: "hangman",
    picture: "src/assets/img/preview/hangman-preview.png",
    route: "/games/hangman",
  },
  {
    name: "memory",
    picture: "src/assets/img/preview/memory-preview.png",
    route: "/games/memory",
  },
  {
    name: "RPS",
    picture: "src/assets/img/preview/rps-preview.png",
    route: "/games/rock-paper-scissors",
  },
]);

const index = ref(0);

const name = computed(() => {
  return games.value[index.value].name;
});
const picture = computed(() => {
  return games.value[index.value].picture;
});

const route = computed(() => {
  return games.value[index.value].route;
});

function prevPic() {
  if (index.value > 0) {
    index.value--;
  }
}

function nextPic() {
  if (index.value < games.value.length - 1) {
    index.value++;
  }
}

function randomPic() {
  let newRandom = Math.floor(Math.random() * games.value.length);
  if (newRandom === index.value) {
    randomPic();
  } else {
    index.value = newRandom;
  }
}
</script>

<style scoped>
.preview-picture {
  border: solid black 2px;
  z-index: 2;
  position: absolute;
  top: 11%;
  height: 210px;
  width: 250px;
  border-bottom-right-radius: 20%;
}

.gallery-wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.arrow {
  all: unset;
  position: relative;
  color: white;
  font-size: 2.5rem;
  z-index: 100;
}

#arrow-right {
  left: 24%;
  top: 59%;
}
#arrow-left {
  left: 2%;
  top: 59%;
}

#random {
  left: 62.5%;
  top: 57%;
}

#router-link {
  all: unset;
  position: relative;
  left: 43.5%;
  top: 63%;
}

.arrow:hover {
  color: var(--accent-color-three);
}

.gameboy {
  color: white;
  z-index: 5;
  _margin-top: 1rem;
  width: 600px;
  height: 600px;
}

.gameboy-background {
  background-color: var(--accent-color-two);
  position: absolute;
  top: 4%;
  width: 350px;
  height: 570px;
  border-bottom-right-radius: 20%;
}
</style>

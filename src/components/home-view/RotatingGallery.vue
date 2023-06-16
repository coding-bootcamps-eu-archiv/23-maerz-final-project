<template>
  <div class="gallery-wrapper">
    <!-- <button @click="prevPic()" class="arrow">&#8249;</button>
    <img :src="picture" :alt="name" class="preview-picture" />
    <button @click="nextPic()" class="arrow">&#8250;</button> -->
    <object
      data="src\assets\img\rotating-gallery\noun-gameboy-2486655.svg"
      width="800"
      height="800"
      class="gameboy"
    ></object
    ><img :src="picture" :alt="name" class="preview-picture" />

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

const games = ref([
  {
    name: "tetris",
    picture: "src/assets/img/preview/tetris-preview.png",
    route: "/games/tetris",
  },
  {
    name: "hangman",
    picture: "src/assets/img/preview/tetris-preview.png",
    route: "/games/hangman",
  },
  {
    name: "memory",
    picture: "src/assets/img/preview/tetris-preview.png",
    route: "/games/memory",
  },
  {
    name: "RPS",
    picture: "src/assets/img/preview/tetris-preview.png",
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
  index.value = Math.floor(Math.random() * games.value.length);
}
</script>

<style scoped>
.preview-picture {
  border: solid black 2px;
  z-index: 2;
  position: absolute;
  top: 10%;
  height: 210px;
  width: 250px;
}

.gallery-wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 2rem;
}

.arrow {
  all: unset;
  position: relative;
  color: white;
  font-size: 2.5rem;
  z-index: 100;
}

#arrow-right {
  left: 26.5%;
  top: 60%;
}
#arrow-left {
  left: 5%;
  top: 60%;
}

#random {
  left: 63%;
  top: 58%;
}

#router-link {
  all: unset;
  position: relative;
  left: 45.5%;
  top: 64%;
}

.arrow:hover {
  color: var(--accent-color-three);
}

.gameboy {
  color: white;
  z-index: 5;
  margin-top: 1rem;
}

.gameboy-background {
  background-color: var(--accent-color-two);
  position: absolute;
  top: 5%;
  width: 400px;
  height: 600px;
  border-bottom-right-radius: 20%;
}
</style>

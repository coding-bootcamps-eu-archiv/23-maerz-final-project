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
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const games = ref([
  { name: "tetris", picture: "https://picsum.photos/260/210" },
  { name: "hangman", picture: "https://picsum.photos/261/211" },
  { name: "memory", picture: "https://picsum.photos/262/212" },
]);

const index = ref(0);

const name = computed(() => {
  return games.value[index.value].name;
});
const picture = computed(() => {
  return games.value[index.value].picture;
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
</script>

<style scoped>
.preview-picture {
  border: solid black 2px;
  z-index: 2;
  position: absolute;
  top: 10%;
}

.gallery-wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
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

.arrow:hover {
  color: red;
}

.gameboy {
  color: white;
  _background-color: white;
  margin-top: 1rem;
  z-index: 5;
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

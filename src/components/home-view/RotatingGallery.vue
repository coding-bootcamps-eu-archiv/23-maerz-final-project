<template>
  <div class="gallery-wrapper">
    <button @click="prevPic()" class="arrow">&#8249;</button>
    <img :src="picture" :alt="name" class="preview-picture" />
    <button @click="nextPic()" class="arrow">&#8250;</button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";




const games = ref([
  { name: "tetris", picture: "https://picsum.photos/400" },
  { name: "hangman", picture: "https://picsum.photos/401" },
  { name: "memory", picture: "https://picsum.photos/402" },
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
  if (index.value < games.value.length) {
    index.value++;
  }
}
</script>

<style scoped>
.preview-picture {
  border: solid black 2px;
}

.gallery-wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.arrow {
  display: flex;
  align-items: center;
  height: 4rem;
  background-color: white;
  border: none;
  font-size: 3rem;
  padding: 0.5rem;
  cursor: pointer;
  opacity: 0.8;
}
</style>

<template>
  <div class="gallery-wrapper">
    <div class="preview">
      <h1>TETRIS</h1>
      <img :src="tetrisImg" class="icon" />
    </div>
    <div class="preview">
      <h1>HANGMAN</h1>
      <img :src="hangmanImg" class="icon" />
    </div>
    <div class="preview">
      <h1>R-P-S</h1>
      <img :src="rpsImg" class="icon" />
    </div>
    <div class="preview">
      <h1>MEMORY</h1>
      <img :src="memoryImg" class="icon" />
    </div>
    <div class="preview">
      <h1>W-A-M</h1>
      <img :src="wamImg" class="icon" />
    </div>
  </div>
</template>

<script setup>
import tetrisImg from "/src/assets/img/icons/noun-tetris-4402336-1f1c2b.png";
import hangmanImg from "/src/assets/img/icons/noun-hangman-3978390-1F1C2B.png";
import rpsImg from "/src/assets/img/icons/noun-rps-3971461-1F1C2B.png";
import memoryImg from "/src/assets/img/icons/noun-memory-game-4545700-1F1C2B.png";
import wamImg from "/src/assets/img/icons/mole.png";
</script>

<style scoped>
.gallery-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  gap: 1rem;
}

.preview {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 250px;
  height: 250px;
  /* background-color: var(--accent-color-two); */
  background-color: var(--accent-color-three);
  _background-color: white;
  color: var(--primary-dark);
  gap: 0.5rem;
}

h1 {
  margin-top: 2rem;
  font-size: 3rem;
  font-weight: bold;
}

.icon {
  height: 100px;
  width: 100px;
}
</style>

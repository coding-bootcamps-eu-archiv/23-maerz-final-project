<template>
  <div class="gallery-wrapper">
    <div class="preview">
      <h1>TETRIS</h1>
      <img
        src="\src\assets\img\icons\noun-tetris-4402336-1f1c2b.png"
        class="icon"
      />
      <!-- <object data=""></object> -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.gallery-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
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

<template>
  <div class="header-wrapper">
    <div class="logo-name-wrapper">
      <img :src="logoUrl" class="logo" alt="arcade logo" />
      <RouterLink class="home-link" :to="{ name: 'home' }"
        ><p class="app-name">GameBox</p></RouterLink
      >
    </div>
    <nav class="navigation">
      <!-- a tags are later changed to router links -->
      <RouterLink class="nav-link" :to="{ name: 'allGames' }"
        >All Games</RouterLink
      >
      <a class="nav-link" href="#">Highscores</a>
    </nav>
    <input type="search" placeholder="Search" class="base-input-field" />
    <div class="action">
      <!-- a tags are later changed to router links -->
      <a href="#" class="base-btn"> Sign Up </a>
      <a href="#" class="base-btn"> Log In </a>
      <a href="#" title="Your profile">
        <button class="account-btn"></button>
      </a>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import logoUrl from "/src/assets/img/icons/noun-arcade-game-5563937-1F1C2B.png";
</script>

<style scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary-light);
  height: 7rem;
  padding: 1rem;
}

.logo-name-wrapper {
  display: flex;
  gap: 1rem;
}
.logo {
  width: 5rem;
  height: 5rem;
  text-align: center;
  border: solid black 3px;
  padding: 0.3rem;
  border-radius: 50%;
  background-color: var(--accent-color-three);
}

.app-name {
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 4rem;
  font-weight: bold;
}

.navigation {
  display: flex;
  position: relative;
  gap: 2rem;
}

.action {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 0.5rem;
}

.account-btn {
  all: unset;
  width: 3rem;
  height: 3rem;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 100%;
  cursor: pointer;
}

.bi-person-fill {
  height: 50%;
  width: 50%;
}

.home-link {
  all: unset;
  display: flex;
  cursor: pointer;
}

.home-link:hover {
  color: var(--accent-color-two);
}
</style>

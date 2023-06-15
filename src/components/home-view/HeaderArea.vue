<template>
  <div class="header-wrapper">
    <div class="logo-name-wrapper">
      <RouterLink :to="{ name: 'home' }">
        <div class="logo">Logo</div>
      </RouterLink>
      <p class="app-name">Arcade - GameBox</p>
    </div>
    <nav class="navigation">
      <!-- a tags are later changed to router links -->
      <RouterLink class="nav-link" :to="{ name: 'allGames' }"
        >All Games</RouterLink
      >
      <RouterLink class="nav-link" :to="{ name: 'Highscores' }"
        >Highscores</RouterLink
      >
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
  flex-direction: column;
  gap: 0.5rem;
}
.logo {
  width: 3rem;
  height: 3rem;
  background-color: black;
  color: white;
  text-align: center;
}

.app-name {
  text-transform: uppercase;
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
</style>

<template>
  <div class="header-wrapper">
    <div class="logo-name-wrapper">
      <RouterLink :to="{ name: 'home' }">
        <div class="logo">Logo</div>
      </RouterLink>
      <p class="app-name">Arcade - GameBox</p>
    </div>
    <input type="search" placeholder="Search" class="searchbar" />
    <nav class="navigation">
      <!-- a tags are later changed to router links -->
      <a class="nav-link" href="#" s>All Games</a>
      <a class="nav-link" href="#">Highscores</a>
    </nav>
    <div class="action">
      <!-- a tags are later changed to router links -->
      <a href="#" class="action-link"> Sign Up </a>
      <a href="#" class="action-link"> Log In </a>
      <a href="#" title="Your profile">
        <button class="account-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
          </svg>
        </button>
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
  background-color: lightgrey;
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

.searchbar {
  all: unset;
  height: 1.5rem;
  width: 15rem;
  background-color: white;
  padding: 0.25rem;
  border-radius: 0.25rem;
}
.navigation {
  display: flex;
  position: relative;
  gap: 2rem;
}

.nav-link {
  all: unset;
  border-radius: 0.25rem;
  padding: 0.25rem;
  height: 1.5rem;
  background-color: black;
  color: white;
  cursor: pointer;
}
.action {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 0.5rem;
}

.action-link {
  all: unset;
  border-radius: 0.25rem;
  padding: 0.25rem;
  height: 1.5rem;
  outline: 0.1rem solid black;
  cursor: pointer;
}

.action-link:nth-child(2) {
  background-color: black;
  color: white;
}

button {
  all: unset;
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

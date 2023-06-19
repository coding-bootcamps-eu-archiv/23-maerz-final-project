<template>
  <div class="header-wrapper">
    <div class="logo-name-wrapper">
      <img :src="logoUrl" class="logo" alt="arcade logo" />
      <RouterLink class="home-link" :to="{ name: 'home' }"
        ><p class="app-name">GameBox</p></RouterLink
      >
      <nav class="navigation">
        <!-- a tags are later changed to router links -->
        <RouterLink class="nav-link" :to="{ name: 'allGames' }"
          >All Games</RouterLink
        >
        <RouterLink class="nav-link" :to="{ name: 'Highscores' }"
          >Highscores</RouterLink
        >
      </nav>
    </div>

    <div class="action">
      <button class="account-btn" @click="toggleProfile()">
        <img :src="profileImg" class="profile-img" />
      </button>
    </div>
    <article class="profile" v-show="showProfile">
      <div class="profile-name-wrapper">
        <button class="account-btn">
          <img :src="profileImg" class="profile-img" />
        </button>
        <div>NAME</div>
      </div>
      <RouterLink :to="{ name: 'accountPage' }" class="base-btn">
        User Settings
      </RouterLink>
    </article>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import logoUrl from "/src/assets/img/icons/noun-arcade-game-5563937-1F1C2B.png";
import { ref } from "vue";
import profileImg from "/src/assets/img/icons/noun-profile-1052598-ece3d9.png";

const showProfile = ref(false);

function toggleProfile() {
  showProfile.value = !showProfile.value;
}
</script>

<style scoped>
.header-wrapper {
  position: relative;
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
  align-items: center;
  position: relative;
  gap: 2rem;
  padding-left: 2rem;
}

.action {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 0.5rem;
}

.profile {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  top: 110%;
  right: 1%;
  background-color: var(--primary-light);
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  z-index: 101;
  animation: 0.5s ease-out 0s 1 slideInFromRight;
}

.profile-img {
  width: 80%;
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(0);
  }
}

.profile-name-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
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

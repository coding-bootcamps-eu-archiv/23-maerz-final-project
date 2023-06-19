<template>
  <div class="header-wrapper">
    <div class="logo-name-wrapper">
      <img :src="logoUrl" class="logo" alt="arcade logo" />
      <RouterLink class="home-link" :to="{ name: 'home' }"
        ><p class="app-name">GameBox</p></RouterLink
      >
      <nav class="navigation">
        <RouterLink class="nav-link" :to="{ name: 'allGames' }"
          >All Games</RouterLink
        >
        <RouterLink class="nav-link" :to="{ name: 'Highscores' }"
          >Highscores</RouterLink
        >
      </nav>
    </div>

    <div class="action">
      <button v-if="!session" @click="login" class="base-btn">
        Login with GitHub
      </button>
      <button v-if="session" @click="logout" class="base-btn">Logout</button>
      <RouterLink :to="{ name: 'accountPage' }">
        <button v-if="session" class="account-btn">
          <img v-if="session.user" :src="avatarImg" class="profile-img" />
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import logoUrl from "/src/assets/img/icons/noun-arcade-game-5563937-1F1C2B.png";
import { computed } from "vue";
import { session } from "../../stores/auth";
import { supabase } from "../../supabase";

const avatarImg = computed(() => {
  if (session.value !== null) {
    return session.value.user.user_metadata.avatar_url;
  } else {
    return "";
  }
});

async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
}

async function logout() {
  const { error } = await supabase.auth.signOut();
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
  gap: 2rem;
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

.profile-img {
  height: inherit;
  overflow: hidden;
  border-radius: inherit;
  outline: 0.2rem solid var(--primary-dark);
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

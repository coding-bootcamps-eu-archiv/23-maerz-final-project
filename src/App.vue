<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { supabase } from "@/supabase.js";
import HeaderArea from "@/components/home-view/HeaderArea.vue";
import FooterArea from "@/components/home-view/FooterArea.vue";

import { session } from "./stores/auth.js";

onMounted(() => {
  supabase.auth.onAuthStateChange((authEvent, authSession) => {
    session.value = authSession;

    if (session.value !== null) {
      const githubUsername = session.value.user.user_metadata.user_name;
      const avatarUrl = session.value.user.user_metadata.avatar_url;
      const user = session.value.user;

      const updates = {
        id: user.id,
        github_username: githubUsername,
        avatar_url: avatarUrl,
      };

      supabase.from("profiles").upsert(updates);
    }
  });
});
</script>

<template>
  <HeaderArea></HeaderArea>
  <main class="router-view">
    <RouterView />
  </main>
  <FooterArea></FooterArea>
</template>

<style scoped>
.router-view {
  background-color: var(--primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
</style>

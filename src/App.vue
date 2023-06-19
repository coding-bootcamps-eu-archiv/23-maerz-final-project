<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { supabase } from "@/supabase.js";
import HeaderArea from "@/components/home-view/HeaderArea.vue";
import FooterArea from "@/components/home-view/FooterArea.vue";

import { session } from "./stores/auth.js";

onMounted(() => {
  supabase.auth.onAuthStateChange(async (_, _session) => {
    session.value = _session;

    if (session.value !== null) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const githubUsername = user.user_metadata.user_name;
      const avatarUrl = user.user_metadata.avatar_url;

      const { error } = await supabase
        .from("profiles")
        .update({
          github_username: githubUsername,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);
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
}
</style>

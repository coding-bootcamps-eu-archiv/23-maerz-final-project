<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Account from "@/components/Account.vue";
import Auth from "@/components/Auth.vue";
import { supabase } from "@/supabase.js";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<style scoped>
.container {
  background-color: white;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
  text-align: center;
}
</style>

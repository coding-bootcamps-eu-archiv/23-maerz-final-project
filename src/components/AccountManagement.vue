<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <p v-else>You are logged out.</p>
  </div>
</template>

<script setup>
import Account from "@/components/Account.vue";
import { session } from "../stores/auth";
</script>

<style scoped>
.container {
  background-color: white;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
  text-align: center;
  margin: 1.5rem;
}
</style>

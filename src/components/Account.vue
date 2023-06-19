<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { session } from "../stores/auth";

const props = defineProps(["session"]);

const loading = ref(true);
const username = ref("");

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const updates = {
      id: user.id,
      username: username.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="form-widget acc-wrapper" @submit.prevent="updateProfile">
    <p>
      Hello <span class="username-style">{{ username }}</span
      >! You are currently logged in.
    </p>
    <div class="log-info">
      <p>change your name here:</p>
      <div class="input-data-fields">
        <label for="username">username</label>
        <input
          class="base-input-field"
          id="username"
          type="text"
          v-model="username"
        />
      </div>
    </div>

    <div class="action-btns">
      <div>
        <input
          type="submit"
          class="button primary block base-btn"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<style scoped>
.username-style {
  text-decoration: underline;
}
.input-data-fields {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin-bottom: 1rem;
}
.acc-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
}

.log-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.action-btns {
  display: flex;
  gap: 2rem;
}
</style>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import Avatar from "./Avatar.vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_url = ref("");

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
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
      website: website.value,
      avatar_url: avatar_url.value,
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

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
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
    <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />
    <div>
      <div class="input-data-fields">
        <label for="email">Email</label>
        <input
          class="base-input-field"
          id="email"
          type="text"
          :value="session.user.email"
          disabled
        />
      </div>
      <div class="input-data-fields">
        <label for="username">Name</label>
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

      <div>
        <button
          class="button block base-btn"
          @click="signOut"
          :disabled="loading"
        >
          Sign Out
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
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

.action-btns {
  display: flex;
  gap: 2rem;
}
</style>

import { ref } from "vue";
import { session } from "../stores/auth.js";
import { supabase } from "../supabase.js";

// export const game = ref("");
// export const score = ref(0);

export async function saveHighscore(game, score) {
  const updates = {
    id: session.value.user.id,
    [game]: score,
    user_name: session.value.user.user_metadata.user_name,
    profile_pic: session.value.user.user_metadata.avatar_url,
  };
  const { data, error } = await supabase.from("highscores").upsert(updates);

  console.log("yay");
  // console.log(session.value.user.app_metadata);
  // console.log(session.value.user.user_metadata);
}

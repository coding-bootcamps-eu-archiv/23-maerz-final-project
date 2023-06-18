import { ref } from "vue";

export const game = ref("");
export const score = ref(0);

export const safeHighscore = {
  getHighscore(gameValue, scoreValue) {
    game.value = gameValue;
    score.value = scoreValue;
    return { game: game.value, score: score.value };
  },
};

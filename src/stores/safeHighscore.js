import { ref } from "vue";

const game = ref("");
const score = ref(0);

export const safeHighscore = {
  getHighscore(gameValue, scoreValue) {
    game.value = gameValue;
    score.value = scoreValue;
    console.log(gameValue);
    console.log(scoreValue);
    return { game: game.value, score: score.value };
  },
};

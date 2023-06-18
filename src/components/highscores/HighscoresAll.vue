<template>
  <section id="table-section">
    <input
      id="filter-input"
      type="text"
      placeholder="Filter by game or username ..."
      v-model="filter"
    />
    <table class="table">
      <thead>
        <tr>
          <th>ProfilePic</th>
          <th>User</th>
          <th>
            <select v-model="selectedGame">
              <option value="all">All Games</option>
              <option v-for="game in uniqueGames" :value="game" :key="game">
                {{ game }}
              </option>
            </select>
          </th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="userScores in filteredRowsByGame">
          <td>{{ userScores.profilePic }}</td>
          <td>{{ userScores.username }}</td>
          <td>{{ userScores.gameName }}</td>
          <td>{{ userScores.score }}</td>
          <td>{{ userScores.dateOfScore }}</td>
        </tr>
      </tbody>
    </table>
    <div style="color: aliceblue">{{ newHighscore }}</div>
    <div style="color: aliceblue">{{ newHighscoreCopy }}</div>
    <div style="color: aliceblue">{{ game }}{{ score }}</div>
    <div style="color: aliceblue">{{ highscore }}</div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { safeHighscore } from "../../stores/safeHighscore.js";
import { game, score } from "../../stores/safeHighscore.js";

onMounted(() => {
  addHighscore();
});

const userScores = ref([
  {
    id: 1,
    profilePic: "⚡",
    username: "Harry",
    gameName: "Memory",
    score: "00:40.23",
    dateOfScore: "01.01.01",
  },
  {
    id: 2,
    profilePic: "🐭",
    username: "Mouse",
    gameName: "RPS",
    score: "5 Punkte",
    dateOfScore: "02.02.02",
  },
  {
    id: 3,
    profilePic: "🧔🏻",
    username: "Hagrid",
    gameName: "Tetris",
    score: "100 Punkte",
    dateOfScore: "03.03.03",
  },
  {
    id: 4,
    profilePic: "<(°.°)>",
    username: "Baby-Yoda",
    gameName: "Tetris",
    score: "500 Punkte",
    dateOfScore: "04.04.04",
  },
]);

//Filter by Input-Search
const filter = ref("");

const filteredRows = computed(() => {
  return userScores.value.filter((userScores) => {
    const usernameFilter = userScores.username.toLowerCase();
    const gameFilter = userScores.gameName.toLowerCase();
    const searchTermFilter = filter.value.toLowerCase();

    return (
      usernameFilter.includes(searchTermFilter) ||
      gameFilter.includes(searchTermFilter)
    );
  });
});

//Filter by Dorp-Down Games
const uniqueGames = computed(() => {
  const gamesSet = new Set();
  userScores.value.forEach((entry) => {
    gamesSet.add(entry.gameName);
  });
  return Array.from(gamesSet);
});

const selectedGame = ref("all");

const filteredRowsByGame = computed(() => {
  if (selectedGame.value === "all") {
    return filteredRows.value;
  } else {
    return filteredRows.value.filter(
      (userScores) => userScores.gameName === selectedGame.value
    );
  }
});

// _____________________Highscore___________________________________________________________

const newHighscore = ref({
  id: 0,
  profilePic: "",
  username: "",
  game: "",
  score: "",
  dateOfScore: "",
});
const highscore = computed(() =>
  safeHighscore.getHighscore(game.value, score.value)
);
const newHighscoreCopy = ref({});

const addHighscore = () => {
  const newId = userScores.value.length + 1;
  const currentDate = new Date();
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  const dateOfScore = currentDate.toLocaleDateString(undefined, dateOptions);
  const timeOfScore = currentDate.toLocaleTimeString(undefined, timeOptions);
  newHighscore.value = {
    id: newId,
    profilePic: "",
    username: "",
    game: game.value,
    score: score.value,
    dateOfScore: dateOfScore + " " + timeOfScore,
  };

  newHighscoreCopy.value = { ...newHighscore.value };
  userScores.value.push(newHighscoreCopy);

  resetNewHighscore();
};
const resetNewHighscore = () => {
  newHighscore.value.id = 0;
  newHighscore.value.profilePic = "";
  newHighscore.value.username = "";
  newHighscore.value.game = "";
  newHighscore.value.score = "";
  newHighscore.value.dateOfScore = "";
};
</script>

<style>
#filter-input {
  all: unset;
  height: 1.5rem;
  width: 13rem;
  background-color: white;
  padding: 0.25rem;
  border-radius: 0.25rem;
  outline: 0.1rem solid var(--primary-dark);
  width: 20rem;
}

#table-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

select {
  font-family: unset;
  font-size: unset;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-dark);
}

select option {
  border: 0px;
}

.table {
  width: 50rem;
  border-radius: 0.5rem;
  text-align: center;
  background-color: var(--primary-light);
}
.table th {
  border-radius: 0.5rem;
}

table.table td,
table.table th {
  padding: 5px 4px;
}
table.table tbody td {
  font-size: 0.9rem;
}
table.table thead {
  background: #ffffff;
  border-bottom: 4px solid var(--primary-dark);
}
table.table thead th {
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-dark);
  text-align: center;
  border-left: 2px solid var(--primary-dark);
}
table.table thead th:first-child {
  border-left: none;
}
</style>

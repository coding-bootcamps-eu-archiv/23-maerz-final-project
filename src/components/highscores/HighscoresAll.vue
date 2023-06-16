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
            <select v-model="selectedGame" :class="no - border">
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
        <tr v-for="userScores in filteredRowsByGame" :key="game">
          <td>{{ userScores.profilePic }}</td>
          <td>{{ userScores.username }}</td>
          <td>{{ userScores.game }}</td>
          <td>{{ userScores.score }}</td>
          <td>{{ userScores.dateOfScore }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const userScores = ref([
  {
    id: 1,
    profilePic: "⚡",
    username: "Harry",
    game: "Memory",
    score: "00:40.23",
    dateOfScore: "01.01.01",
  },
  {
    id: 2,
    profilePic: "🐭",
    username: "Mouse",
    game: "RPS",
    score: "5 Punkte",
    dateOfScore: "02.02.02",
  },
  {
    id: 3,
    profilePic: "🧔🏻",
    username: "Hagrid",
    game: "Tetris",
    score: "100 Punkte",
    dateOfScore: "03.03.03",
  },
  {
    id: 4,
    profilePic: "<(°.°)>",
    username: "Baby-Yoda",
    game: "Tetris",
    score: "500 Punkte",
    dateOfScore: "04.04.04",
  },
]);

//Filter by Input-Search
const filter = ref("");

const filteredRows = computed(() => {
  return userScores.value.filter((userScores) => {
    const username = userScores.username.toLowerCase();
    const game = userScores.game.toLowerCase();
    const searchTerm = filter.value.toLowerCase();

    return username.includes(searchTerm) || game.includes(searchTerm);
  });
});

//Filter by Dorp-Down Games
const uniqueGames = computed(() => {
  const gamesSet = new Set();
  userScores.value.forEach((score) => {
    gamesSet.add(score.game);
  });
  return Array.from(gamesSet);
});

const selectedGame = ref("all");

const filterGames = (event) => {
  selectedGame.value = event.target.value;
};

const filteredRowsByGame = computed(() => {
  if (selectedGame.value === "all") {
    return filteredRows.value;
  } else {
    return filteredRows.value.filter(
      (userScores) => userScores.game === selectedGame.value
    );
  }
});
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
  border: 0px solid #ffffff;
  padding: 5px 4px;
}
table.table tbody td {
  font-size: 0.9rem;
}
table.table thead {
  background: #ffffff;
  border-bottom: 4px solid #333333;
}
table.table thead th {
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-dark);
  text-align: center;
  border-left: 2px solid #333333;
}
table.table thead th:first-child {
  border-left: none;
}

table.table tfoot td {
  font-size: 14px;
}
</style>

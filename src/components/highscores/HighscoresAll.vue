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
            Game
            <select v-on:change="filterMember">
              <option value="">Alle Spiele</option>
              <option v-for="userScore in userScores" :value="userScore.game">
                {{ userScores.games }}
              </option>
            </select>
          </th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="userScores in filteredRows" :key="userScores.id">
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

const filter = ref("");

const filteredRows = computed(() => {
  return userScores.value.filter((userScores) => {
    const username = userScores.username.toLowerCase();
    const game = userScores.game.toLowerCase();
    const searchTerm = filter.value.toLowerCase();

    return username.includes(searchTerm) || game.includes(searchTerm);
  });
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
option {
  color: black;
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
  font-size: 16px;
}
table.table thead {
  background: #ffffff;
  border-bottom: 4px solid #333333;
}
table.table thead th {
  font-size: 15px;
  font-weight: bold;
  color: #333333;
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

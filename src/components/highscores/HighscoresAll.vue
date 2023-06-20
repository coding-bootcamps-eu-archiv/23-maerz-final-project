<template>
  <section id="table-section">
    <!-- <input
      id="filter-input"
      type="text"
      placeholder="Filter by game or username ..."
      v-model="filter"
    /> -->
    <table class="table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>User</th>
          <th>
            <!-- <select v-model="selectedGame">
              <option value="all">All Games</option>
              <option v-for="game in uniqueGames" :value="game" :key="game">
                {{ game }}
              </option>
            </select> -->
            Tetris
          </th>
          <th>Hangman</th>
          <th>R-P-S</th>
          <th>Memory</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userScores">
          <td>
            <img :src="user.profilePic" class="profile-pic" />
          </td>
          <td>
            {{ user.username }}
          </td>
          <td>
            {{ user.tetris }}
          </td>
          <td>
            {{ user.hangman }}
          </td>
          <td>
            {{ user.rps }}
          </td>
          <td>
            {{ user.memory }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "../../supabase";

onMounted(() => {
  // if (game.value !== "" && score.value !== "") {
  //   addHighscore();
  // }
  getHighscores();
});

// gets the highscores from the supabase database

async function getHighscores() {
  let { data, error } = await supabase.from("highscores").select("*");
  data.forEach((element) => {
    userScores.value.push({
      id: 1,
      profilePic: element.profile_pic,
      username: element.user_name,
      tetris: element.tetris,
      hangman: element.hangman,
      rps: element.rps,
      memory: element.memory,
    });
  });
}

const userScores = ref([]);

// const userScores = ref([
//   {
//     id: 1,
//     profilePic: "⚡",
//     username: "Harry",
//     gameName: "Memory",
//     score: "00:40.23",
//     dateOfScore: "01.01.01",
//   },
//   {
//     id: 2,
//     profilePic: "🐭",
//     username: "Mouse",
//     gameName: "RPS",
//     score: "5 Punkte",
//     dateOfScore: "02.02.02",
//   },
//   {
//     id: 3,
//     profilePic: "🧔🏻",
//     username: "Hagrid",
//     gameName: "Tetris",
//     score: "100 Punkte",
//     dateOfScore: "03.03.03",
//   },
//   {
//     id: 4,
//     profilePic: "<(°.°)>",
//     username: "Baby-Yoda",
//     gameName: "Tetris",
//     score: "500 Punkte",
//     dateOfScore: "04.04.04",
//   },
// ]);

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
    return userScores.value;
  } else {
    return filteredRows.value.filter(
      (userScores) => userScores.gameName === selectedGame.value
    );
  }
});

// _____________________Highscore___________________________________________________________
// import { game, score } from "../../stores/safeHighscore.js";

const newHighscore = ref({
  id: 0,
  profilePic: "",
  username: "",
  gameName: "",
  score: "",
  dateOfScore: "",
});

const addHighscore = () => {
  resetNewHighscore();
  const newId = userScores.value.length + 1;
  const currentDate = new Date();
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateOfScore = currentDate.toLocaleDateString(undefined, dateOptions);
  newHighscore.value = {
    id: newId,
    profilePic: "cba",
    username: "abc",
    gameName: game.value,
    score: score.value,
    dateOfScore: dateOfScore,
  };
  console.log(newHighscore);
  const newHighscoreCopy = { ...newHighscore.value };
  userScores.value.push(newHighscoreCopy);
  console.log(newHighscoreCopy);
  console.log(userScores);
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
  font-size: 1.5rem;
  text-align: start;
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

.profile-pic {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.td-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

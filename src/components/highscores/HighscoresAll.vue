<template>
  <section id="table-section">
    <table class="table">
      <thead>
        <tr>
          <th>ProfilePic</th>
          <th>User</th>
          <th>Game</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BILD 1</td>
          <td>Hans</td>
          <td>Memory</td>
          <td>TIME XY</td>
          <td>01.01.01</td>
        </tr>
        <tr>
          <td>BILD 2</td>
          <td>Wurst</td>
          <td>Tetris</td>
          <td>500 Punkte</td>
          <td>01.01.01</td>
        </tr>
        <tr>
          <td>BILD 3</td>
          <td>Gisela</td>
          <td>RPS</td>
          <td>1 Punkt</td>
          <td>11.11.11</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup></script>
<style>
#table-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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

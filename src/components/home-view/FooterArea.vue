<template>
    <footer id="Footer-Links"> 
<div id="links">
  <a href="">Terms & Conditions</a>
  <a href=""> 🛈 About</a>
  <a href=""> 🍪 Cookie Settings</a>
  <a href="">✉️ Contact</a>
</div>
</footer>


</template>

<style scoped>
*{
    font-family: sans-serif;
}
#Footer-Links{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: lightgrey;

}
#links{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0rem;
}
a{
    padding: 0.1rem 0rem;
    color: black;
    font-weight: bold;
}
</style>
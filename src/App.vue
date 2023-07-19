<template>
  <div class="container">
    <nav>
      <div class="nav-wrapper teal green">
        <a href="#!" class="brand-logo"></a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        >
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/patient">Pacientes</router-link></li>
          <li><router-link to="/consultation">Consultas</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/patient">Pacientes</router-link></li>
      <li><router-link to="/consultation">Consultas</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
export default {
  name: "AppView",
  data() {
    return {};
  },
  created() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems, {});
    });
  },
};
</script>

<template>
  <div id="app">
    <Navbar />
    <div id="viewport">
      <router-view />
    </div>
    <!-- Main app view -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};

// Default page title
// TODO: update to current congregation name
document.title = "Wilshire Church Management";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

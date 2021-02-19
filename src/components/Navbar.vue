<template>
  <div class="navbar bg-dark text-light px-4 py-3 mb-4">
    <b-nav pills>
      <h3 class="my-auto pr-4">Wilshire Church of Christ</h3>
      <!-- TODO: change this to current congregation name -->
      <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
      <b-nav-item to="/about" exact exact-active-class="active">About</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {}
};
</script>

<style scoped></style>

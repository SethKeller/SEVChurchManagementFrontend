<template>
  <div>
    <Search v-on:search-submitted="doSomething"/>
    <!-- {{ displayData }} -->

    <div class="displayResults">
      <li v-for="person in people" :key="person.id">
        {{ person.DisplayName }}, {{ person.familys.FamilyName }}, {{ person.Email }}
      </li>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  components: {
    Search
  },
  data() {
    return {
      displayData: ":3",
      people: []
    };
  },
  created() {},
  methods: {
    doSomething(people) {
      this.displayData = people;
      this.people = people;
    }
  }
};
</script>

<style lang="css" scoped>
.displayResults {
  margin-top: 20px;
}
</style>

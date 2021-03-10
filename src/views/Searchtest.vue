<template>
  <div>
    <div id="search-box">
      <Search v-on:search-submitted="doSomething"/>
    </div>

    <div class="displayResults">
      <li v-for="person in people" :key="person.id">
        {{ person.FirstName }} {{ person.LastName}} (Display name: {{ person.DisplayName }}), {{ person.Phone }}, {{ person.Email }}
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
#search-box {
  display: grid;
  place-items: center;
}
</style>

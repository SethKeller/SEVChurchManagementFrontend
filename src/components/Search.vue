<template>
  <div>
    <div>
      <b-form @submit="onSubmit">
        <b-form-input
          id="input-name"
          v-model="query"
          placeholder="Search by name, email, family name"
          required
        ></b-form-input>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div>
      <!-- checkbox here -->
    </div>
  </div>
</template>

<script>
import SearchServices from "../services/SearchServices.js";
export default {
  name: "Search",
  props: {},
  created() {},
  data() {
    return {
      query: "",
      response: ":3" // stores JSON response from backend to quickly display for easy testing
    };
  },
  methods: {
    onSubmit() {
      let sanitizedQ = this.query.trim(); // sanitize query by removing excess white space at perimeter
      this.searchPerson(sanitizedQ);
    },
    searchPerson(query) {
      SearchServices.searchPerson(query)
        .then(res => {
          // just assign the response data to message which is displayed directly below the form
          // hook this up to a member-list page by emitting an array either memberID's the actualy JSON objects
          // this.response = res.data;
          let result = res.data;
          this.$emit("search-submitted", result);
        })
        .catch(error => {
          this.message = error.resposne;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

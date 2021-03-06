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
        <b-form-group label="Narrow your search:">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected"
            :options="options"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
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
      response: ":3", // stores JSON response from backend to quickly display for easy testing
      selected: [], // Must be an array reference!
      options: [
        { text: "Name", value: "name" },
        { text: "Family", value: "family" },
        { text: "Email", value: "email" }
      ]
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let sanitizedQ = this.query.trim().toLowerCase(); // sanitize query by removing excess white space at perimeter
      // check the checkboxes
      // if nothing is selected, do this.searchPerson
      this.searchPerson(sanitizedQ);
    },
    searchPerson(query) {
      SearchServices.searchPerson(query)
        .then(res => {
          let people = res.data;
          let searchResult;

          if (this.selected.length === 0) {
            searchResult = people;
          } else {
            searchResult = people.filter(person => {
              let nameMatch = false;
              let emailMatch = false;
              let familyMatch = false;
              let name = person.FirstName + " " + person.LastName;
              name = name.toLowerCase();
              let familyName = person.familys.FamilyName.toLowerCase();

              if (this.selected.includes("name"))
                nameMatch = name.includes(query);
              if (this.selected.includes("family"))
                familyMatch = familyName.includes(query);
              if (this.selected.includes("email"))
                emailMatch = person.Email.includes(query);

              return nameMatch || emailMatch || familyMatch;
            });
          }

          this.$emit("search-submitted", searchResult);
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

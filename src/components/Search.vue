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
          let filteredPeople = [];
          let nameFilter;
          let familyFilter;
          let emailFilter;
          let searchResult;

          // if the user did not check any boxes then selected array length will be 0
          if (this.selected.length === 0) {
            searchResult = people;
          } else {
            // filter by name
            if (this.selected.includes("name")) {
              nameFilter = people.filter(person => {
                let name = person.FirstName + " " + person.LastName;
                name = name.toLowerCase();
                return name.includes(query);
              });
              filteredPeople = filteredPeople.concat(nameFilter);
            }
            // filter by family name
            if (this.selected.includes("family")) {
              familyFilter = people.filter(person => {
                let familyName = person.familys.FamilyName;
                familyName = familyName.toLowerCase();
                return familyName.includes(query);
              });
              filteredPeople = filteredPeople.concat(familyFilter);
            }
            // filter by family name
            if (this.selected.includes("email")) {
              emailFilter = people.filter(person => {
                let email = person.Email;
                email = email.toLowerCase();
                return email.includes(query);
              });
              filteredPeople = filteredPeople.concat(emailFilter);
            }
            searchResult = [...new Set(filteredPeople)];
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

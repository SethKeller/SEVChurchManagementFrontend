<template>
  <div>
    <div id="search-form">
      <b-form inline @submit="onSubmit">
        <b-form-input
          id="input-name"
          class="mb-2 mr-2 mb-sm-0 cols-xs-"
          v-model="query"
          placeholder="Search for a member"
          required
          shadow
        ></b-form-input>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>

      <div class="mt-2">
        <b-button v-b-toggle.collapse-1 variant="outline-secondary" size="sm">Filter</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <b-form-checkbox-group
              id="checkbox-group-1"
              class="mb-2 mb-sm-0"
              v-model="selected"
              :options="options"
              name="member-attribute"
              buttons
              button-variant="outline-success"
              size="sm"
            ></b-form-checkbox-group>
          </b-card>
        </b-collapse>
      </div>
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
              let email = person.Email.toLowerCase();

              if (this.selected.includes("name"))
                nameMatch = name.includes(query);
              if (this.selected.includes("family"))
                familyMatch = familyName.includes(query);
              if (this.selected.includes("email"))
                emailMatch = email.includes(query);

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
<style scoped>
#search-form {
  /* width: 100%; */
  /* min-width: 35ch; */
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: left;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
</style>

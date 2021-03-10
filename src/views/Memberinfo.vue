<template>
  <div class="parent">
    <div id="congregation-form">
      <b-form @submit="onSubmit">
        <b-container fluid>
          <b-row class="my-2">
            <b-col sm="3">
              <label for="input-group-fname">First Name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="input-group-fname"
                v-model="people.FirstName"
                required
                placeholder="First Name"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label for="input-group-lname">Last Name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="input-group-lname"
                v-model="people.LastName"
                required
                placeholder="Last Name"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label for="input-group-dname">Display Name:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="input-group-dname"
                v-model="people.DisplayName"
                required
                placeholder="Display Name"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label for="input-group-DofBirth">Date of Birth:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="input-group-DofBirth"
                v-model="people.DateofBirth"
                required
                placeholder="Date of Birth"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label for="input-group-Phone">Phone:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="input-group-Phone"
                v-model="people.Phone"
                required
                placeholder="Phone number"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label for="input-group-HousePhone"> House Phone:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="input-group-HousePhone"
                v-model="people.HousePhone"
                required
                placeholder="House Phone"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-button type="submit" to="/" variant="primary">Back</b-button>
          &nbsp;
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-container>
      </b-form>
    </div>
  </div>
</template>

<script>
import MemberInfoServices from "../services/Member-InfoServices";
export default {
  name: "Member",
  components: {},
  data() {
    return {
      people: {},
      show: true
    };
  },
  created() {
    this.getPeople(2);
  },
  methods: {
    getPeople(id) {
      MemberInfoServices.getPeople(id)
        .then(response => {
          this.people = response.data;
          console.log("Loaded:" + this.people.data);
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    onSubmit() {
      this.updatePeople(2, this.people);
    },
    updatePeople(id, people) {
      MemberInfoServices.updatePeople(id, people)
        .then(() => {
          console.log("member updated!");
        })
        .catch(error => {
          this.message = error.response;
        });
    }
  }
};
</script>

<style lang="css" scoped>
.parent {
  display: grid;
  place-items: center;
}

#congregation-form {
  width: 70%;
  text-align: left;
}
</style>

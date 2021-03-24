<template>
  <div>
    <b-form @submit="onSubmit">
      <b-container>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="input-group-fname">First Name:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-fname"
              v-model="member.FirstName"
              required
              placeholder="First Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="3">
            <label for="input-group-lname">Last Name:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-lname"
              v-model="member.LastName"
              required
              placeholder="Last Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="3">
            <label for="input-group-dname">Display Name:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-dname"
              v-model="member.DisplayName"
              required
              placeholder="Display Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-4">
          <b-col sm="3">
            <label for="input-group-DofBirth">Date of Birth:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-DofBirth"
              v-model="member.DateofBirth"
              required
              placeholder="Date of Birth"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-5">
          <b-col sm="3">
            <label for="input-group-Phone">Phone:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-Phone"
              v-model="member.Phone"
              required
              placeholder="Phone number"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-6">
          <b-col sm="3">
            <label for="input-group-HousePhone"> House Phone:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-HousePhone"
              v-model="member.HousePhone"
              required
              placeholder="House Phone"
            ></b-form-input>
          </b-col>
        </b-row>  
        <br>
        <b-row>
          <b-col class="mr-2"
            ><b-button variant="success" type="submit">Submit</b-button></b-col
          >
          <b-col class="mr-2"
            ><b-button variant="primary" to="/" >Home</b-button></b-col
          >
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>
<script>
export default {
  props: {
    member: Object,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("formSubmitted");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>


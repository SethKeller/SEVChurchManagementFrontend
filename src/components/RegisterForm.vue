<template>
  <div>
    <b-form @submit="onSubmit">
      <b-container>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-fname" class="pt-1">First Name:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-fname"
              v-model="member.FirstName"
              required
              placeholder="First Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-lname" class="pt-1">Last Name:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-lname"
              v-model="member.LastName"
              required
              placeholder="Last Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-email" class="pt-1">Email:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-email"
              v-model="member.Email"
              required
              placeholder="Email"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-password" class="pt-1"
              >Temporary Password:</label
            >
          </b-col>
          <b-col sm="8">
            <b-form-group
              label-for="input-group-password"
              description="Password is randomly generated."
              class="mb-0"
            >
              <b-form-input
                id="input-group-password"
                v-model="this.tempPass"
                required
                placeholder="Password"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mx-2"
            ><b-button variant="success" type="submit">Submit</b-button></b-col
          >
          <b-col class="mx-2"
            ><b-button variant="primary" to="/">Home</b-button></b-col
          >
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    member: Object
  },
  components: {},
  data() {
    return {
      show: true,
      dateConverted: false
    };
  },
  computed: {
    // Date handler to prevent timezone conversions in the date picker
    tempPass() {
      return Math.floor(Math.random() * 5000) + 1000;
    },
    dateOfBirth: {
      get() {
        if (!this.dateConverted)
          return new Date(this.member.DateofBirth.slice(0, 10) + " 12:00:00");
        else return this.member.DateofBirth;
      },
      set(newVal) {
        this.member.DateofBirth = new Date(
          newVal.getFullYear(),
          newVal.getMonth(),
          newVal.getDate()
        );
        this.dateConverted = true;
      }
    }
  },
  methods: {
    onSubmit() {
      // Ensure date is saved correctly
      this.member.DateofBirth = new Date(
        this.dateOfBirth.getFullYear(),
        this.dateOfBirth.getMonth(),
        this.dateOfBirth.getDate()
      );
      this.$emit("formSubmitted");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

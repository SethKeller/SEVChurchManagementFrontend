<template>
  <div>
    <b-form @submit="onSubmit">
      <PictureUpload :member="member" class="mx-auto" style="max-width:600px;" />
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
            <label for="input-group-dname" class="pt-1">Display Name:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-dname"
              v-model="member.DisplayName"
              required
              placeholder="Display Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-DofBirth" class="pt-1">Date of Birth:</label>
          </b-col>
          <b-col sm="8">
            <datepicker
              id="input-group-DofBirth"
              input-class="form-control"
              v-model="dateOfBirth"
              valueType="format"
              :format="'M/dd/yyyy'"
              required
              placeholder="Date of Birth"
            ></datepicker>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-Phone" class="pt-1">Phone:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-Phone"
              v-model="member.Phone"
              required
              placeholder="Phone number"
              @input="acceptNumber"
            >
              ></b-form-input
            >
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-HousePhone" class="pt-1"> House Phone:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-HousePhone"
              v-model="member.HousePhone"
              required
              placeholder="House Phone"
              @input="acceptNumber2"
            ></b-form-input>
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
import Datepicker from 'vuejs-datepicker';
import PictureUpload from "@/components/PictureUpload.vue";

export default {
  props: {
    member: Object,
  },
  components: {
    Datepicker,
    PictureUpload
  },
  data() {
    return {
      show: true,
      dateConverted: false
    };
  },
  computed: {
    // Date handler to prevent timezone conversions in the date picker
    dateOfBirth: {
      get() {
        if (!this.dateConverted)
          return new Date(this.member.DateofBirth.slice(0,10)+" 12:00:00");
        else
          return this.member.DateofBirth;
      },
      set(newVal) {
        this.member.DateofBirth = new Date(newVal.getFullYear(), newVal.getMonth(), newVal.getDate());
        this.dateConverted = true;
      }
    }
  },
  methods: {
    onSubmit() {
      // Ensure date is saved correctly
      this.member.DateofBirth = new Date(this.dateOfBirth.getFullYear(), this.dateOfBirth.getMonth(), this.dateOfBirth.getDate());
      this.$emit("formSubmitted");
    },
    acceptNumber() {
      var x = this.member.Phone.replace(/\D/g, "").match(
        /(\d{0,3})(\d{0,3})(\d{0,4})/
      );
      this.member.Phone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
    acceptNumber2() {
      var x = this.member.HousePhone.replace(/\D/g, "").match(
        /(\d{0,3})(\d{0,3})(\d{0,4})/
      );
      this.member.HousePhone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
  },
  mounted() {
    this.acceptNumber();
    this.acceptNumber2();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

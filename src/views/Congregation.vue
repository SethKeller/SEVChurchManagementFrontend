<template>
  <div>
    <b-form @submit="onSubmit" v-if="congregation.Name">
      <b-form-group
        id="input-group-name"
        label="Congregation Name:"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="congregation.Name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-city"
        label="Congregation City:"
        label-for="input-city"
      >
        <b-form-input
          id="input-City"
          v-model="congregation.City"
          placeholder="Enter city"
          required
        ></b-form-input>
        
      </b-form-group>
      <b-form-group
        id="input-group-state"
        label="Congregation State:"
        label-for="input-state"
      >
        <b-form-input
          id="input-State"
          v-model="congregation.State"
          placeholder="Enter State"
          required
        ></b-form-input>
        
      </b-form-group>
       <b-form-group
        id="input-group-zipcode"
        label="Congregation Zipcode:"
        label-for="input-zipcode"
      >
        <b-form-input
          id="input-Zipcode"
          v-model="congregation.Zipcode"
          placeholder="Enter Zipcode"
          required
        ></b-form-input>
        
      </b-form-group>
      <b-form-group
        id="input-group-streetaddress"
        label="Congregation Street Address:"
        label-for="input-streetaddress"
      >
        <b-form-input
          id="input-StreetAddress"
          v-model="congregation.StreetAddress"
          placeholder="Enter street Address"
          required
        ></b-form-input>
        
      </b-form-group>
      <b-form-group
        id="input-group-mailingAddress"
        label="Congregation Mailing Address:"
        label-for="input-mailingAddress"
      >
        <b-form-input
          id="input-MailingAdress"
          v-model="congregation.MailingAddress"
          placeholder="Enter Mailing Address"
          required
        ></b-form-input>
        
      </b-form-group>
      
      <b-form-group
        id="input-group-phone"
        label="Congregation Phone:"
        label-for="input-phone"
      >
        <b-form-input
          id="input-phone"
          v-model="congregation.Phone"
          placeholder="Enter phone number"
          required
        ></b-form-input>
      </b-form-group>
    <b-button type="submit"  href="/" variant="primary">Back</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import CongregationServices from "../services/CongregationServices.js";
export default {
  components: {},
  data() {
    return {
      congregation: {},
      show: true
    };
  },
  created() {
    // need a way to select MY church; current API returns either a list of congregations or you can request a congregation by ID
    // defaulting congregation with id of 1 since we are only working with one church right now
    // maybe before this page, we should ask the user to choose a congregation
    this.getCongregation(1);
  },
  methods: {
    getCongregation(id) {
      CongregationServices.getCongregation(id)
        .then(response => {
          this.congregation = response.data;

          // update form fields with data pulled from DB congregation table
          this.form.name = this.congregation.Name;
          this.form.address = this.congregation.Address;
          this.form.phone = this.congregation.Phone;
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    onSubmit() {
      this.updateCongregation(1, this.congregation);
    },
    updateCongregation(id, congregation) {
      CongregationServices.updateCongregation(id, congregation)
        .then(() => {
          // this.$router.push('congregation');
          console.log("congregation updated!");
        })
        .catch(error => {
          this.message = error.response;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

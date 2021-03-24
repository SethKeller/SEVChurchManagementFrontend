<template>
  <div class="parent">
    <b-alert
      :show="alertCountdown"
      dismissible
      fade
      variant="success"
      @dismissed="alertCountdown=0"
      @dismiss-count-down="alertCountdownChanged"
    >
      Congregation info updated!
    </b-alert>
    <div id="congregation-form">
    <b-form @submit="onSubmit" style="max-width:600px" class="mx-auto">
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
          id="input-city"
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
          id="input-state"
          v-model="congregation.State"
          placeholder="Enter state"
          required
        ></b-form-input>
        
      </b-form-group>
       <b-form-group
        id="input-group-zipcode"
        label="Congregation Zipcode:"
        label-for="input-zipcode"
      >
        <b-form-input
          id="input-zipcode"
          v-model="congregation.Zipcode"
          placeholder="Enter zipcode"
          required
        ></b-form-input>
        
      </b-form-group>
      <b-form-group
        id="input-group-streetaddress"
        label="Congregation Street Address:"
        label-for="input-streetaddress"
      >
        <b-form-input
          id="input-streetaddress"
          v-model="congregation.StreetAddress"
          placeholder="Enter street address"
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
      <div id="form-button">
        <b-button type="submit" to="/" variant="primary">Back</b-button>&nbsp;
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
    </div>
  </div>
</template>

<script>
import CongregationServices from "../services/CongregationServices.js";
export default {
  components: {},
  data() {
    return {
      congregation: {},
      show: true,
      alertCountdown: 0
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
          //this.form.name = this.congregation.Name;
          //this.form.address = this.congregation.Address;
          //this.form.phone = this.congregation.Phone;
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
          console.log("Congregation updated!");
          this.showAlert(); // Show success alert
        })
        .catch(error => {
          this.message = error.response;
        });
    },
    alertCountdownChanged(dismissCountDown) {
        this.alertCountdown = dismissCountDown;
    },
    showAlert() {
        this.alertCountdown = 5;
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
  width: 50%;
  text-align: left;
}
</style>

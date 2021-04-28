<template>
  <div class="parent"  v-show="address !== undefined">
    <b-form @submit="onSubmit" style="max-width:600px" class="mx-auto">
      <b-form-group
        id="input-group-streetaddress"
        label="Street: "
        label-for="input-streetaddress"
      >
        <b-form-input
          id="input-streetaddress"
          v-model="address.Street"
          placeholder="Enter street address"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-HouseNumber"
        label="House Number:"
        label-for="input-HouseNumber"
      >
        <b-form-input
          id="input-houseNumber"
          v-model="address.HouseNumber"
          placeholder="Enter house number"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-city" label="City:" label-for="input-city">        
        <b-form-input
          id="input-city"
          v-model="address.City"
          placeholder="Enter city"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-state"
        label="State: "
        label-for="input-state"
      >
        <b-form-input
          id="input-state"
          v-model="address.State"
          placeholder="Enter state"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-zipcode"
        label="Zipcode: "
        label-for="input-zipcode"
      >
        <b-form-input
          id="input-zipcode"
          v-model="address.Zipcode"
          placeholder="Enter zipcode"
          required
        ></b-form-input>
      </b-form-group>
      <div id="form-button">
        <b-button type="submit" variant="primary">Update Address</b-button>
      </div> 
    </b-form>
  </div>
</template>
<script>
import AddressService from "../services/AddressServices";

export default {
  props: {
    member: Object,
  },
  data() {
    return {
      address: {},
    };
  },
  methods: {
    getAddress(id) {
      AddressService.getAddressByPerson(id)
        .then((response) => {
          if(this.address != null){
            this.address = response.data[0];
            console.log("Address:", this.address);
          }         
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    onSubmit() {
     AddressService.updateAddress(this.address.id, this.address)
        .then(() => {
          console.log("Address updated!");
          this.$emit("formSubmitted");
        })
        .catch((error) => {
          this.message = error.response;
          this.$emit("formError");
        });
    },
  },
  created() {
    if(this.member.id != null){
      this.getAddress(this.member.id);
    }
  }
};
</script>

<style scoped></style>

<template>
  <div>
    <h3>Family Info:</h3>
    <b-alert
      dismissible
      style="width:70%;max-width:540px"
      class="mx-auto"
      :variant="alertType"
      :show="alertCountdown"
      @dismissed="dismissCountdown = 0"
      @dismiss-count-down="alertCountdownChanged"
    >
        {{ alertMessage }}
    </b-alert>
    
    <b-form @submit="onSubmit">
    <b-container fluid>
      <b-container style="width:70%;max-width:540px" class="mx-auto">
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-fname" class="pt-1">Family Name:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-fname"
              v-model="family.FamilyName"
              required
              placeholder="Family Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-dname" class="pt-1">Street:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-dname"
              v-model="headAddress.Street"
              required
              placeholder="Display Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-Phone" class="pt-1">House Number:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-Phone"
              v-model="headAddress.HouseNumber"
              required
              placeholder="Phone number"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-lname" class="pt-1">City:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-lname"
              v-model="headAddress.City"
              required
              placeholder="Last Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-dname" class="pt-1">State:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-dname"
              v-model="headAddress.State"
              required
              placeholder="Display Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-zip" class="pt-1">Zipcode:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-zip"
              v-model="headAddress.Zipcode"
              required
              placeholder="Zipcode"
            ></b-form-input>
          </b-col>
        </b-row>
        
        <b-row>
          <b-col sm="3" />
          <b-col class="mr-2" sm="3"
            ><b-button variant="success" type="submit">Submit</b-button></b-col
          >
          <b-col class="mr-2" sm="3"
            ><b-button variant="primary" to="/">Home</b-button></b-col
          >
          <b-col sm="3" />
        </b-row>
      </b-container>
      
      <b-container class="pb-4">
        <hr />
        <h3>Family Members:</h3>
        <FamilyInfo
          v-for="member in members"
          :key="member.LASTNAME"
          :member="member"
          class="m-2 d-md-inline-block"
        />
      </b-container>
    </b-container>
    </b-form>
  </div>
</template>

<script>
import FamilyInfo from "@/components/FamilyInfo";
import FamilyInfoServices from "../services/FamilyMemberServices";
import AddressService from "../services/AddressServices";
import MemberService from "../services/MemberListServices";

export default {
  name: "MemberInfo",
  components: {
    FamilyInfo,
  },
  props: {},
  data() {
    return {
      headOfFamily: null,
      family: {},
      members: [],
      id: null,
      address: null,
      headAddress: null,
      show: true,
      alertMessage: 'Member info updated!',
      alertType: 'success',
      alertCountdown: 0
    };
  },
  created() {
    this.getMember(2)
  },

  methods: {
    getFamily(id) {
      FamilyInfoServices.getFamily(id)
        .then((response) => {
          this.family = response.data;
          this.members = this.family.people;
          this.getHeadOfFamily();
          
          //console.log("Loaded family:", this.family);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    getMember(id){
      MemberService.getMember(id).then((response) => {
          var member = response.data;
          this.getFamily(member.FamilyId);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    onSubmit() {
      var hasError = false,
          errorMessage = "";
      
      // Update data in the database
      AddressService.updateAddress(this.headAddress.id, this.headAddress)
        .then(() => {
          console.log("Address updated!");
        })
        .catch((error) => {
          errorMessage = error.response;
          hasError = true;
        });
      FamilyInfoServices.updateFamily(this.family.id, this.family)
        .then(() => {
          console.log("Family updated!");
        })
        .catch((error) => {
          errorMessage = error.response;
          hasError = true;
        });
      
      if (!hasError) {
          // Show success alert
          this.alertMessage = 'Family info updated!';
          this.alertType = 'success';
          this.alertCountdown = 4;
      } else {
          // Show error alert
          this.alertMessage = errorMessage;
          this.alertType = 'error';
          this.alertCountdown = 4;
      }
    },
    getHeadOfFamily() {
      var i;
      for (i = 0; i < this.members.length; i++) {
        if (this.members[i].FamilyRole === 1) {
          this.headOfFamily = this.members[i];
          this.address = this.headOfFamily.addresses;
          if (this.address[i].Active === 1){
            this.headAddress = this.address[i]
          }
          break;
        }
      }
    },
    alertCountdownChanged(countdown) {
      this.alertCountdown = countdown;
    }
  },
};
</script>

<style lang="scss" scoped></style>

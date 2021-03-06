<template>
  <div>
    <h3>Family Info:</h3>
    <b-alert
      dismissible
      style="width:70%;max-width:540px"
      class="mx-auto"
      :variant="alertType"
      :show="alertCountdown"
      @dismissed="alertCountdown = 0"
      @dismiss-count-down="alertCountdownChanged"
    >
        {{ alertMessage }}
    </b-alert>
    
    <b-form @submit="onSubmit">
    <b-container fluid>
      <b-container style="width:70%;max-width:540px" class="mx-auto">
        <PictureUpload :family="family" :canEdit="hasEditAccess()" class="mx-auto" style="max-width:600px;" />
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
              :plaintext="!hasEditAccess()"
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
              placeholder="Street"
              :plaintext="!hasEditAccess()"
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
              placeholder="House Number"
              :plaintext="!hasEditAccess()"
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
              placeholder="City"
              :plaintext="!hasEditAccess()"
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
              placeholder="State"
              :plaintext="!hasEditAccess()"
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
              :plaintext="!hasEditAccess()"
            ></b-form-input>
          </b-col>
        </b-row>
        
        <b-row v-show="hasEditAccess()">
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
          :key="member.FamilyRole"
          :member="member"
          :canEdit="hasEditAccess()"
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
//import AddressService from "../services/AddressServices";
import MemberService from "../services/MemberListServices";
import PictureUpload from "@/components/PictureUpload.vue";

export default {
  name: "MemberInfo",
  components: {
    FamilyInfo,
    PictureUpload
  },
  props: {
    familyId: String
  },
  data() {
    return {
      headOfFamily: null,
      family: {},
      members: [],
      id: null,
      address: null,
      headAddress: null,
      show: true,
      alertMessage: 'Loading...',
      alertType: 'secondary',
      alertCountdown: 10
    };
  },
  created() {
    // Fetch the correct family based on passed-in prop
    if (this.familyId == "" || this.familyId == undefined)
        console.error("Error: Family ID not provided!");
    else
        this.getFamily(this.familyId);
  },

  methods: {
    getFamily(id) {
      FamilyInfoServices.getFamily(id)
        .then((response) => {
          this.family = response.data;
          this.members = this.family.people;
          this.getHeadOfFamily();
          
          // Clear loading message
          this.alertCountdown = 0;
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
      // AddressService.updateAddress(this.headAddress.id, this.headAddress)
      //   .then(() => {
      //     console.log("Address updated!");
      //   })
      //   .catch((error) => {
      //     errorMessage = error.response;
      //     hasError = true;
      //   });
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
          this.headAddress = this.address.find(a => a.Active === 1);
          break;
        }
      }
    },
    hasAdminAccess() {
      return this.$store.state.auth.user.roles.includes("ROLE_ADMIN");
    },
    hasEditAccess() {
      // Check if user is allowed to edit the family (either admin or the head of this family)
      var currentUser = this.$store.state.auth.user;
      return (this.hasAdminAccess() || this.headOfFamily.id == currentUser.id);
    },
    alertCountdownChanged(countdown) {
      this.alertCountdown = countdown;
    }
  },
};
</script>

<style lang="scss" scoped></style>

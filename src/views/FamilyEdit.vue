<template>
  <div>
    <b-form @submit="onSubmit">
      <b-container fluid>
    <b-container>
        <b-row class="my-3">
          <b-col sm="3">
            <label for="input-group-fname">First Name:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-fname"
              v-model="headOfFamily.FirstName"
              required
              placeholder="First Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="3">
            <label for="input-group-lname">City:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-lname"
              v-model="headAddress.City"
              required
              placeholder="Last Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="3">
            <label for="input-group-dname">State:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-dname"
              v-model="headAddress.State"
              required
              placeholder="Display Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="3">
            <label for="input-group-dname">State:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-dname"
              v-model="headAddress.Street"
              required
              placeholder="Display Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="3">
            <label for="input-group-Phone">House Number</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="input-group-Phone"
              v-model="headAddress.HouseNumber"
              required
              placeholder="Phone number"
             
            >
              ></b-form-input
            >
          </b-col>
        </b-row>
        
        <br />
        <br/>
       
      </b-container>
        <FamilyInfo
          v-for="member in members"
          :key="member.LASTNAME"
          :member="member"
          class="m-2 d-md-inline-block"
        />
        <br>
         <b-row>
          <b-col class="mr-2"
            ><b-button variant="success" type="submit">Submit</b-button></b-col
          >
          <b-col class="mr-2"
            ><b-button variant="primary" to="/">Home</b-button></b-col
          >
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import FamilyInfo from "@/components/FamilyInfo";
import Familyinfooervices from "../services/FamilyMemberServices";
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
      id :null,
      address: null,
      headAddress: null,
      show: true,
      page: 1,
      searchQuery: "",
    };
  },
  created() {
    // Get page number from URL
    if (this.$route.query.page != undefined && this.$route.query.page != "")
      this.page = parseInt(this.$route.query.page);
    this.getMember(2)
  },

  methods: {
    getFamily(id) {
      Familyinfooervices.getFamily(id)
        .then((response) => {
          this.family = response.data;
          this.members = this.family.people;
          this.getHeadOfFamily();
          
          //console.log("Loaded:" + this.family.data);
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
     AddressService.updateAddress(this.headAddress.id, this.headAddress)
        .then(() => {
          this.$router.go(this.$router.currentRoute);
          console.log("address updated!");
        })
        .catch((error) => {
          this.message = error.response;
        });
        MemberService.updatePeople(this.headOfFamily.id, this.headOfFamily)
        .then(() => {
          this.$router.go(this.$router.currentRoute);
          console.log("member updated!");
        })
        .catch((error) => {
          this.message = error.response;
        });
    },
   
    getHeadOfFamily() {
      var i;
      for (i = 0; i < this.members.length; i++) {
        if (this.members[i].FamilyRole === 1) {
          this.headOfFamily = this.members[i];
          this.address =this.headOfFamily.addresses;
          if(this.address[i].Active ===1 ){
            this.headAddress =this.address[i]
          }
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

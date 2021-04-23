<template>
  <b-card no-body class="overflow-hidden shadow" style="max-width: 600px;">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img
          :src="this.picturePath() + member.Picture"
          :alt="'Picture of ' + member.FirstName != null ? member.FirstName : ' '+ ' ' + member.LastName != null ? member.LastName : ''"
          class="rounded-right"
          style="width: 200px; max-height: 200px;"
        />
      </b-col>
      <b-col md="7" class="mx-auto" style="min-width: 248px; min-height: 200px">
        <b-card-body :title="member.FirstName + ' ' + member.LastName">
          <b-card-text>
            <i>Contact:</i><br />
            {{ member.Email }}<br />
            {{ member.Phone }}
          </b-card-text>
          <b-card-text>
            <b-button v-b-toggle="`id-${member.id}`" variant="primary" style="margin-top:-8px;">
              Edit
            </b-button>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
    <b-row md="12" class="mx-auto" style="width:100%;">
      <b-collapse :id="`id-${member.id}`" title="Sidebar" right shadow style="width:100%;">
        <div class="px-3 py-2">
          <div>
            <MemberEditInfo
              :member="member"
               v-on:formSubmitted="submitForm(member.id)"
            />
            <b-alert
              dismissible
              style="width:90%"
              class="mx-auto mt-3"
              :variant="alertType"
              :show="alertCountdown"
              @dismissed="dismissCountdown = 0"
              @dismiss-count-down="alertCountdownChanged"
            >
                {{ alertMessage }}
            </b-alert>
            <div>
              <AddressEdit
              :member="member"
               v-on:formSubmitted="submitForm(address.id)"
              />
            </div>
          </div>
        </div>
      </b-collapse>
    </b-row>
  </b-card>
</template>

<script>
import MemberEditInfo from "../components/MemberEditInfo";
import MemberInfoServices from "../services/Member-InfoServices";

import AddressEdit from "../components/AddressEdit";
import AddressService from "../services/AddressServices";

export default {
  name: "MemberInfo",
  components: {
    MemberEditInfo,
    AddressEdit
  },
  props: {
    member: Object
  },
   data() {
    return {
      address: {},
      alertMessage: 'Member info updated!',
      alertType: 'success',
      alertCountdown: 0
    };
  },
  methods: {
    picturePath: function() {
      return MemberInfoServices.getPictureRootPath();
    },
    submitForm(id) {
      var hasError = false,
          errorMessage = "";
      
      MemberInfoServices.updatePeople(id, this.member)
        .then(() => {
          console.log("Member updated!");
        })
        .catch((error) => {
          errorMessage = error.response;
          hasError = true;
        });
      //var address =this.getAddress(this.member.id)
      AddressService.updateAddress(this.address.id, this.address)
        .then(() => {
          console.log("Address updated!");
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
    getAddress(id) {
      AddressService.getAddressByPerson(id)
        .then((response) => {
          var addresses =response.data;
          for(var i=0; i< addresses.length;i++){
            if(addresses[i].Active===1){
              this.address = addresses[i]
               break;
            }
          }
          console.log("Address loaded:", this.address);
          //console.log("Loaded:" + this.family.data);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    alertCountdownChanged(countdown) {
      this.alertCountdown = countdown;
    }
  },
  created() {
      this.getAddress(this.member.id);
    // Test data if info card was not created with a member object
    if (this.member == undefined) {
      this.member = {
        Picture: "/pictures/member/default.png",
        FirstName: "Carl",
        LastName: "Friedricksen",
        Phone: "405-425-5555",
        Email: "c.friedricksen@aol.com"
      };
    }
    // Default photo (until photos are implemented)
    else {
      // Force default picture if backend fails at its job
      if (this.member.Picture == undefined) {
        this.member.Picture = "/pictures/member/default.png";
      }
      if (this.member.Phone == undefined) {
        this.member.Phone = "Not available";
      }
    }
  },
};
</script>

<style scoped></style>

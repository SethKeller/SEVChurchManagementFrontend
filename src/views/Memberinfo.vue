<template>
  <div>
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
    <MemberEditInfo :member="member" :canEdit="true" v-on:formSubmitted="submitForm" style="width:70%;max-width:540px" class="mx-auto" />
  </div>
</template>

<script>
import MemberEditInfo from "../components/MemberEditInfo";
import MemberInfoServices from "../services/Member-InfoServices";
import AddressService from "../services/AddressServices";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  components: {
    MemberEditInfo
  },
  data() {
    return {
      member: {},
      alertMessage: 'Member info updated!',
      alertType: 'success',
      alertCountdown: 0
    };
  },
  created() {
    this.getPeople(this.currentUser.id);
    console.log("hello");
    console.log(this.currentUser.id);
  },
  methods: {
    submitForm() {
      MemberInfoServices.updatePeople(this.currentUser.id, this.member)
        .then(() => {
          //this.$router.go(this.$router.currentRoute); // Reload the page
          console.log("Member updated!");
          // Show success alert
          this.alertMessage = 'Member info updated!';
          this.alertType = 'success';
          this.alertCountdown = 4;
        })
        .catch((error) => {
          // Show error alert
          this.alertMessage = error.response;
          this.alertType = 'error';
          this.alertCountdown = 4;
        });
         AddressService.updateAddress(this.address.id, this.address)
        .then(() => {
          console.log("Address updated!");
        })
        .catch((error) => {
          this.alertMessage = error.response;
          this.alertType = 'error';
          this.alertCountdown = 4;
        });

    },
    getPeople(id) {
      MemberInfoServices.getPeople(id)
        .then(response => {
          this.member = response.data;
          console.log("Loaded:" + this.member.data);
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    alertCountdownChanged(countdown) {
      this.alertCountdown = countdown;
    }
  }
};
</script>

<style scoped></style>

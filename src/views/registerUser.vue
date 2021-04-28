<template>
  <div>
    <b-button v-b-modal.modal-1 variant="primary">Register Member</b-button>

    <b-modal id="modal-1" title="Register Member" hide-backdrop>
      <RegisterForm
        :member="member"
        v-on:formSubmitted="submitForm"
        style="width:70% max-width:540px"
        class="mx-auto"
      />
    </b-modal>
    {{ this.display }}
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
import MemberInfoServices from "../services/Member-InfoServices";

export default {
  name: "MemberInfo",
  components: {
    RegisterForm
  },
  data() {
    return {
      alertMessage: "Member info updated!",
      alertType: "success",
      alertCountdown: 0,
      member: {
        FirstName: "Jane",
        LastName: "Doe",
        CongregationId: 1
      },
      display: ""
    };
  },
  methods: {
    picturePath: function() {
      return MemberInfoServices.getPictureRootPath();
    },
    submitForm(member) {
      // console.log(member);
      this.display = member;
    }
  },
  created() {}
};
</script>

<style scoped></style>

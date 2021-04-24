<template>
  <div>
    <b-button v-b-modal.modal-1>Register Member</b-button>

    <b-modal id="modal-1" title="Register Member">
      <RegisterForm
        :member="member"
        v-on:formSubmitted="submitForm"
        style="width:70%;max-width:540px"
        class="mx-auto"
      />
    </b-modal>
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
        FirstName: "Jamie",
        LastName: "Lannister",
        DisplayName: "J Lannister",
        DateofBirth: "1979-06-16 14:31:21",
        Email: "jamie3@gmail.com",
        Phone: "5551234"
      }
    };
  },
  methods: {
    picturePath: function() {
      return MemberInfoServices.getPictureRootPath();
    },
    submitForm() {
      return 0;
    }
  },
  created() {}
};
</script>

<style scoped></style>

<template>
  <div>
    <MemberEditInfo :member="member" v-on:formSubmitted="submitForm" />
  </div>
</template>

<script>
import MemberEditInfo from "../components/MemberEditInfo";
import MemberInfoServices from "../services/Member-InfoServices";

export default {
  components: {
    MemberEditInfo,
  },
  data() {
    return {
      member: {},
    };
  },
  created() {
    this.getPeople(2);
  },
  methods: {
    submitForm() {
      MemberInfoServices.updatePeople(2, this.member)
        .then(() => {
          this.$router.go(this.$router.currentRoute);
          console.log("member updated!");
        })
        .catch((error) => {
          this.message = error.response;
        });
    },
    getPeople(id) {
      MemberInfoServices.getPeople(id)
        .then((response) => {
          this.member = response.data;
          console.log("Loaded:" + this.member.data);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    }
  }
};
</script>

<style scoped></style>

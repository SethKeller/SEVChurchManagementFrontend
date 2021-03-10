<template>
  <div class="">
    <h1 class="pb-3">Church Directory</h1>
    <h4>{{ message }}</h4>
    <!-- TODO: add basic search bar -->
    <!-- TODO: build dynamic grid of info cards -->
    <MemberInfo
      v-for="member in members"
      :key="member.LASTNAME"
      :member="member"
      class="m-2 d-md-inline-block"
    />
    <!-- TEMPORARY TEST CARDS: -->
    <MemberInfo class="m-2 d-md-inline-block" />

    <!-- TODO: footer with pages OR infiniteload? -->
  </div>
</template>

<script>
import MemberInfo from "@/components/MemberInfo.vue";
import MemberListServices from "@/services/MemberListServices.js";

export default {
  name: "MemberDirectory",
  components: {
    MemberInfo
  },
  props: {},
  data() {
    return {
      members: [],
      message: "Loading...",
      page: 1,
      searchQuery: ""
    };
  },
  methods: {
    getMemberList() {
      // TODO - call services to get list from API
      MemberListServices.getMembers() //this.page, this.searchQuery)
        .then(response => {
          this.members = response.data;
          this.message = "";
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    }
  },
  created() {
    // Get page number from URL
    if (this.$route.query.page != undefined && this.$route.query.page != "")
      this.page = parseInt(this.$route.query.page);
    // Get member list from backend API
    this.getMemberList();
  }
};
</script>

<style scoped></style>

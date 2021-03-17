<template>
  <div class="">
    <h1 class="pb-3">Church Directory</h1>
    <h4>{{ message }}</h4>
    
    <Search v-on:search-submitted="doSearch" class="m-auto pb-3" style="width:340px" />
    <MemberInfo
      v-for="member in members"
      :key="member.LASTNAME"
      :member="member"
      class="m-2 d-md-inline-block"
    />

    <!-- TODO: footer with pages OR infiniteload? -->
  </div>
</template>

<script>
import MemberInfo from "@/components/MemberInfo.vue";
import MemberListServices from "@/services/MemberListServices.js";
import Search from "@/components/Search.vue";

export default {
  name: "MemberDirectory",
  components: {
    MemberInfo,
    Search
  },
  props: {},
  data() {
    return {
      members: [],
      message: "Loading...",
      searchQuery: ""
    };
  },
  methods: {
    getMemberList() {
      // Load full member list to start with
      MemberListServices.getMembers() //this.page, this.searchQuery)
        .then(response => {
          this.members = response.data;
          this.message = "";
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    doSearch(members) {
      // Get member list from search component
      this.members = members;
    }
  },
  created() {
    // Get search query from URL
    if (this.$route.query.search != undefined && this.$route.query.search != "")
      this.searchQuery = this.$route.query.search;
    // Get member list from backend API
    this.getMemberList();
  }
};
</script>

<style scoped></style>

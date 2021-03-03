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
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />
    <MemberInfo class="m-2 d-md-inline-block" />

    <!-- TODO: footer with pages OR infiniteload? -->
  </div>
</template>

<script>
import MemberInfo from "@/components/MemberInfo.vue";

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
      this.message = "Error: DB access not implemented";
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

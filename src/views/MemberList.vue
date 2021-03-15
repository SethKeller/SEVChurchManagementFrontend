<template>
<div>
    <h1> Member List</h1>
    <h3>{{ message }}</h3>
    <div id="page-buttons">
        <button v-on:click="prevPage">Prev</button>
        <button v-on:click="nextPage">Next</button>
    </div>
    <br/>
    
    <table>
        <tr>
            
        </tr>   

    </table>
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
<template>
<div>
    <h1> Member List</h1>
    <h3>{{ message }}</h3>
    <div id="page-buttons">
        <!--button v-on:click="prevPage">Prev</button>
        <button v-on:click="nextPage">Next</button-->
    </div>
    <br/>
    
    <table class= "mx-auto">
        <tr>
            <th class="list-header" width= "300px">First Name</th>
            <th class="list-header" width= "300px">Last Name</th>
        </tr>   
        <MemberListDisplay v-for="member in members" :key="member.member_name" :member="member"/>
    </table>
</div>
</template>

<script>
//import MemberInfo from "@/components/MemberInfo.vue";
import MemberListServices from "@/services/MemberListServices.js";
export default {
  //name: "MemberDirectory",
  components: {},
  props: {},
  data() {
    return {
      members: [],
      message: "Loading...",
      page: 1,
    };
  },
  methods: {
    getMemberList: function() {
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
    //console.log("Log hit")
  }
};
</script>

<style scoped></style>
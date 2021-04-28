<template>
<div class=" ">
    <h1 class="pb-3"> Member List</h1>
    <h3>{{ message }}</h3>
     <b-button v-b-modal.modal-1 variant="primary">Register Member</b-button>

    <b-modal id="modal-1" title="Register Member" hide-backdrop>
      <RegisterForm
        :member="member"
        v-on:formSubmitted="submitForm"
        style="width:70% max-width:540px"
        class="mx-auto"
      />
    </b-modal>
    <Search v-on:search-submitted="doSearch" class="m-auto pb-3" style="width:340px" />
    <div id="page-buttons">
        <!--button v-on:click="prevPage">Prev</button>
        <button v-on:click="nextPage">Next</button-->
        
    </div>
    <br/>    
    <table class= "mx-auto">
        <tr>
           <!-- <th class="list-header" width= "300px">First Name</th>
            <th class="list-header" width= "300px">Last Name</th> -->
        </tr>   
        <MemberInfo v-for="member in members" :key="member.LASTNAME" :member="member" v-on:edit-pressed="editMember" v-on:delete-pressed="deleteMember"/>
    </table>
    <br/>
    
</div>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
import MemberInfo from "@/components/Listmember.vue";
import MemberListServices from "@/services/MemberListServices.js";
import Search from "@/components/Search.vue";
export default {
  name: "MemberDirectory",
  components: {
    MemberInfo,
    Search,
    RegisterForm
  },
  props: {},
  data() {
    return {
      members: [],
      message: "Loading...",
      page: 1,
      searchQuery: "",
      member: {
        FirstName: "Jane",
        LastName: "Doe",
        CongregationId: 1
      },
    };
  },
  methods: {
    editMember(value) {
      console.log(value);

    },

    deleteMember(value){
      console.log(value);
      
      MemberListServices.deleteMember(value);
    },

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
    },
    doSearch(members) {
      // Get member list from search component
      this.members = members;
     },
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
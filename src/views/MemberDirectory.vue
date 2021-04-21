<template>
  <div class="">
    <h1 class="pb-3">Church Directory</h1>
    <h4>{{ message }}</h4>
    
    <b-form-checkbox switch size="lg" v-model="familyMode">Family Mode</b-form-checkbox>
    <br/>
    
    <Search v-on:search-submitted="doSearch" class="m-auto pb-3" style="width:340px" />
    <div v-if="!familyMode">
      <MemberInfo
        v-for="member in members"
        :key="member.LASTNAME"
        :member="member"
        class="m-2 d-md-inline-block"
      />
    </div>
    <div v-if="familyMode">
      <FamilyDirectoryInfo
        v-for="family in filteredFamilies"
        :key="family.FamilyName"
        :family="family"
        class="m-2 d-md-inline-block"
      />
    </div>
    
  </div>
</template>

<script>
import MemberInfo from "@/components/MemberInfo.vue";
import FamilyDirectoryInfo from "@/components/FamilyDirectoryInfo.vue";
import MemberListServices from "@/services/MemberListServices.js";
import FamilyMemberServices from "@/services/FamilyMemberServices.js";
import Search from "@/components/Search.vue";

export default {
  name: "MemberDirectory",
  components: {
    MemberInfo,
    FamilyDirectoryInfo,
    Search
  },
  props: {},
  data() {
    return {
      familyMode: false,
      members: [],
      families: [],
      filteredFamilies: [],
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
    getFamilyList() {
      // Load full family list
      FamilyMemberServices.getFamilies()
        .then(response => {
          this.families = response.data;
          this.filteredFamilies = this.families; // Unfiltered list = full list
          this.message = "";
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    },
    doSearch(members) {
      // Get member list from search component
      this.members = members;
      
      // Get filtered family list by matching members returned from search
      this.filteredFamilies = this.families.filter(family => {
        var included = false;
        for (var i=0; i<family.people.length; i++) {
          for (var j=0; j<this.members.length; j++) {
            if (family.people[i].id == this.members[j].id)
              included = true;
          }
        }
        return included;
      });
    }
  },
  created() {
    // Get search query from URL
    if (this.$route.query.search != undefined && this.$route.query.search != "")
      this.searchQuery = this.$route.query.search;
    
    // Get member list from backend API
    this.getMemberList();
    
    // Get family list from backend API
    this.getFamilyList();
  }
};
</script>

<style scoped></style>

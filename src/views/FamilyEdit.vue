<template>
  <div>
    <b-form>
      <b-container fluid>
        <b-col sm="3">
          <label for="input-group-fname">First Name:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input
            id="input-group-fname"
            v-model="family.FamilyName"
            required
            placeholder="First Name"
          ></b-form-input>
        </b-col>
        <FamilyInfo
          v-for="member in members"
          :key="member.LASTNAME"
          :member="member"
          class="m-2 d-md-inline-block"          
        />
      </b-container>
    </b-form>
  </div>
</template>


<script>
import FamilyInfo from "@/components/FamilyInfo";
import Familyinfooervices from "../services/FamilyMemberServices";

export default {
  name: "MemberInfo",
  components: {
    FamilyInfo,    
  },
  props: {},
  data() {
    return {
      family: {},
      members: [],
      show: true,
      page: 1,
      searchQuery: "",
    };
  },
  created() {
    // Get page number from URL
    if (this.$route.query.page != undefined && this.$route.query.page != "")
      this.page = parseInt(this.$route.query.page);

    this.getFamily(1);
  },

  methods: {
    getFamily(id) {
      Familyinfooervices.getFamily(id)
        .then((response) => {
          this.family = response.data;
          this.members = this.family.people;
          console.log("Loaded:" + this.members);
          //console.log("Loaded:" + this.family.data);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },

  },
  //  onSubmit() {
  //     this.updateFamily(1, this.family);
      
  //   },
  //   updateFamily(id){
  //     Familyinfooervices.updateFamily(id)
  //      .then(() => {
          
  //         console.log("family updated!");
  //       })
  //       .catch((error) => {
  //         this.message = error.response;
  //       });
  //   }
};
</script>

<style lang="scss" scoped>
</style>
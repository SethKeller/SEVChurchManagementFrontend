<template>
  <b-card no-body class="overflow-hidden shadow family-card" @click="goToFamily">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img
          :src="this.picturePath() + family.Picture"
          :alt="'Picture of the ' + family.FamilyName + ' family'"
          class="rounded-right"
          style="width: 200px; max-height: 200px;"
        />
      </b-col>
      <b-col md="7" class="mx-auto" style="min-width: 248px; min-height: 200px">
        <b-card-body :title="family.FamilyName">
          <b-card-text>
            <i>Family</i>
            <!-- TODO: list family members -->
            <div v-for="person in family.people" :key="person.FirstName">
              {{ person.FirstName }} {{ person.LastName }}
            </div>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import FamilyMemberServices from "@/services/FamilyMemberServices.js";

export default {
  name: "FamilyDirectoryInfo",
  props: {
    family: Object
  },
  methods: {
    goToFamily: function() {
      // Go to the family details page
      this.$router.push("/family-info/" + this.family.id);
    },
    picturePath: function() {
      return FamilyMemberServices.getPictureRootPath();
    }
  },
  created() {
    // Test data if info card was not created with a family object
    if (this.family == undefined) {
      this.family = {
        FamilyName: "Default Family",
        Picture: "/pictures/family/default.png"
      };
    }
    console.log("FAMILY", this.family);
  }
};
</script>

<style scoped>
    .family-card {
        max-width: 450px;
        cursor: pointer;
        transform: scale(1.0);
        transition: transform .2s;
    }
    .family-card:hover {
        transform: scale(1.03);
    }
</style>

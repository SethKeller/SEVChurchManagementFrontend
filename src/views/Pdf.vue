<template>
  <div>
    <ul>
      <li v-for="(family, index) in familiesArr" :key="index">
        {{ family.FamilyName }}
        {{ family.people.FirstName }}
        <ul>
          <li v-for="(members, mi) in family.people" :key="mi">
            {{ members.FirstName }}
            {{ members.addresses.length }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import FamilyMemberServices from "../services/FamilyMemberServices";

export default {
  data() {
    return {
      families: [],
      familyMembers: []
    };
  },
  created() {
    this.getAllFamilies();
  },
  computed: {
    familiesArr() {
      return this.families;
    }
  },
  methods: {
    getAllFamilies() {
      FamilyMemberServices.getAllFamilies()
        .then(response => {
          this.families = response.data;
          console.log(this.families);
          console.log("hello");
          console.log(response.data);
        })
        .catch(err => {
          this.message = err.response.data.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <ul>
      <li v-for="(f, index) in familiesArr" :key="index">
        <img v-bind:src="f.imgLink" />
        <br>
        Family Name: {{ f.familyName }}
        <br>
        Head of family: {{ f.headNames }}
        <br>
        Street: {{ f.street }}
        <br>
        City: {{ f.city }}
        <br>
        State: {{ f.state }}
        <br>
        Phone: {{ f.phone }}
        <br>
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
      familyMembers: [],
      randomImg: [
        "https://cdn.betterttv.net/emote/5b1740221c5a6065a7bad4b5/3x",
        "https://cdn.betterttv.net/emote/5aa1d0e311237146531078b0/3x",
        "https://cdn.betterttv.net/emote/554da1a289d53f2d12781907/3x",
        "https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/3x"
      ]
    };
  },
  created() {
    this.getAllFamilies();
  },
  computed: {
    familiesArr() {
      let families = this.families;
      let n = [];

      n = families.map(family => {
        let head = [];
        let headNames = [];

        family.people.forEach(p => {
          if (p.FamilyRole == 1) {
            head.push(p);
            headNames.push(p.FirstName);
          }
        });
        let familyName = family.FamilyName;
        let address = "not avail";
        let phone = "not avail";
        let chosenOne = Math.floor(Math.random() * this.randomImg.length);
        let imgLink = this.randomImg[chosenOne];
        if (head[0] != undefined) {
          phone = head[0].Phone;
          if (head[0].addresses[0] != undefined) address = head[0].addresses[0];
          if (head[0].Picture != undefined) imgLink = head[0].Picture;
        }

        return {
          familyName,
          headNames,
          street: address.Street,
          city: address.City,
          state: address.State,
          zip: address.Zipcode,
          phone,
          imgLink
        };
      });

      return n;
    }
  },
  methods: {
    getAllFamilies() {
      FamilyMemberServices.getAllFamilies()
        .then(response => {
          this.families = response.data;
        })
        .catch(err => {
          this.message = err.response.data.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

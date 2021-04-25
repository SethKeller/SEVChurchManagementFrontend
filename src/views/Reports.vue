<template>
  <div>
    <h1 class="pb-3">Reports</h1>
    <p>Clicking a button below will create and download a PDF</p>
    <b-button
      class="m-2"
      size="lg"
      pill
      variant="primary"
      @click="createFamilyPDF"
      >Create Familys PDF</b-button
    >
    <br />
    <b-button
      class="m-2"
      size="lg"
      pill
      variant="primary "
      @click="createMemberPDF"
      >Create Members PDF</b-button
    >
    <br />
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import FamilyMemberServices from "../services/FamilyMemberServices";
import MemberListServices from "@/services/MemberListServices.js";

export default {
  data() {
    return {
      families: [],
      members: []
    };
  },
  created() {
    this.getAllFamilies();
    this.getMemberList();
    this.familiesArr;
  },
  computed: {
    // Returns a list of families
    // Each entry in list is a list [Family Name, Family Heads, Street, City, State, Zipcode, Phone]
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

        if (head[0] != undefined) {
          phone = head[0].Phone;
          if (head[0].addresses[0] != undefined) address = head[0].addresses[0];
        }
        let arr = [
          familyName,
          headNames.join(","),
          address.Street,
          address.City,
          address.State,
          address.Zipcode,
          phone
        ];

        return arr;
      });

      return n;
    },
    membersArr() {
      // each member is an object and we want it as a list/array to feed it to JSPDF auto-table
      const membersArr = [];

      this.members.forEach(m => {
        let memberInfo = [];
        let address = "";

        if (m.addresses[0] != undefined)
          address =
            m.addresses[0].Street +
            " " +
            m.addresses[0].City +
            " " +
            m.addresses[0].State +
            " " +
            m.addresses[0].Zipcode;

        memberInfo.push(m.LastName, m.FirstName, m.Email, m.Phone, address);
        membersArr.push(memberInfo);
      });

      return membersArr;
    }
  },
  methods: {
    // GET a list of families
    getAllFamilies() {
      FamilyMemberServices.getFamilies()
        .then(response => {
          this.families = response.data;
        })
        .catch(err => {
          this.message = err.response.data.message;
        });
    },
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
    createFamilyPDF() {
      this.familiesArr.forEach(f => console.log(f[0]));

      console.log(this.familiesArr);

      const doc = new jsPDF();
      doc.autoTable({
        head: [
          ["Family Name", "Head of Family", "Street", "City", "State", "Phone"]
        ],
        body: this.familiesArr
      });

      doc.save("familys-report.pdf");
    },
    createMemberPDF() {
      const doc = new jsPDF();
      doc.autoTable({
        head: [["Last", "First", "Email", "Phone", "Address"]],
        body: this.membersArr
      });
      console.log(this.membersArr);

      doc.save("members-report.pdf");
    }
  }
};
</script>

<style lang="scss" scoped></style>

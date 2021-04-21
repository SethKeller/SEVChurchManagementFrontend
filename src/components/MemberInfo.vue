<template>
  <b-card no-body class="overflow-hidden shadow" style="max-width: 450px;">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img
          :src="this.picturePath() + member.Picture"
          :alt="'Picture of ' + member.FirstName + ' ' + member.LastName"
          class="rounded-right"
          style="width: 200px; max-height: 200px;"
        />
      </b-col>
      <b-col md="7" class="mx-auto" style="min-width: 248px; min-height: 200px">
        <b-card-body :title="member.FirstName + ' ' + member.LastName">
          <b-card-text>
            <i>Contact:</i><br />
            {{ member.Email }}<br />
            {{ member.Phone }}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import MemberInfoServices from "@/services/Member-InfoServices.js";

export default {
  name: "MemberInfo",
  props: {
    member: Object
  },
  methods: {
    picturePath: function() {
      return MemberInfoServices.getPictureRootPath();
    }
  },
  created() {
    // Test data if info card was not created with a member object
    if (this.member == undefined) {
      this.member = {
        Picture: "/pictures/member/default.png",
          // Old placeholder: https://i.pinimg.com/originals/78/e9/8d/78e98d6cf0e15e9993baf70717acfa73.jpg
        FirstName: "Carl",
        LastName: "Friedricksen",
        Phone: "405-425-5555",
        Email: "c.friedricksen@aol.com"
      };
    }
    // No phone number message
    else {
      if (this.member.Phone == undefined) {
        this.member.Phone = "Phone not available";
      }
    }
  }
};
</script>

<style scoped></style>

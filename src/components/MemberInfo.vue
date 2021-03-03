<template>
  <b-card no-body class="overflow-hidden shadow" style="max-width: 420px;">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img
          :src="member.Picture"
          :alt="'Picture of ' + member.FirstName + ' ' + member.LastName"
          class="rounded-right"
        />
      </b-col>
      <b-col md="7" class="mx-auto">
        <!-- TODO: replace placeholder with real info -->
        <b-card-body :title="member.FirstName + ' ' + member.LastName">
          <b-card-text>
            <i>Email:</i> {{ member.Email }}<br />
            <i>Phone:</i> {{ member.Phone }}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "MemberInfo",
  props: {
    member: Object
  },
  created() {
    // Test data if info card was not created with a member object
    if (this.member == undefined) {
      this.member = {
        Picture:
          "https://i.pinimg.com/originals/78/e9/8d/78e98d6cf0e15e9993baf70717acfa73.jpg",
        FirstName: "Carl",
        LastName: "Friedricksen",
        Phone: "405-425-5555",
        Email: "c.friedricksen@aol.com"
      };
    }
    // Default photo (until photos are implemented)
    else {
      if (this.member.Picture == undefined) {
        this.member.Picture =
          "https://qph.fs.quoracdn.net/main-thumb-247285578-200-hzqdjetzezpphiwkjnrnsynmdtylybjy.jpeg";
      }
      if (this.member.Phone == undefined) {
        this.member.Phone = "Not available";
      }
    }
  }
};
</script>

<style scoped></style>

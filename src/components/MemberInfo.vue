<template>
  <b-card no-body class="overflow-hidden shadow" style="max-width: 420px;">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img
          :src="member.PICTURE"
          :alt="'Picture of ' + member.FIRSTNAME + ' ' + member.LASTNAME"
          class="rounded-right"
        />
      </b-col>
      <b-col md="7" class="mx-auto">
        <!-- TODO: replace placeholder with real info -->
        <b-card-body :title="member.FIRSTNAME + ' ' + member.LASTNAME">
          <b-card-text>
            Member info goes here<br />
            Phone: {{ member.PHONE }}
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
        PICTURE:
          "https://i.pinimg.com/originals/78/e9/8d/78e98d6cf0e15e9993baf70717acfa73.jpg",
        FIRSTNAME: "Carl",
        LASTNAME: "Friedricksen",
        PHONE: "405-425-5555"
      };
    }
  }
};
</script>

<style scoped></style>

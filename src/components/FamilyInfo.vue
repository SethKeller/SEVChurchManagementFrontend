<template>
  <b-card no-body class="overflow-hidden shadow" style="max-width: 450px">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img
          :src="member.Picture"
          :alt="'Picture of ' + member.FirstName + ' ' + member.LastName"
          class="rounded-right"
          style="max-width: 250px"
        />
      </b-col>
      <b-col md="7" class="mx-auto" style="min-width: 248px">
        <!-- TODO: replace placeholder with real info -->
        <b-card-body :title="member.FirstName + ' ' + member.LastName">
          <b-card-text>
            <i>Contact:</i><br />
            {{ member.Email }}<br />
            {{ member.Phone }}
          </b-card-text>
          <b-card-text>
            <b-button v-b-toggle="`id-${member.id}`" variant="primary"> Edit</b-button>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
    <b-row md="12" class="mx-auto" style="min-width: 248px">
      <b-sidebar :id="`id-${member.id}`" title="Sidebar" right shadow>
        <div class="px-3 py-2">
          <div>
            <MemberEditInfo
              :member="member"
              v-on:formSubmitted="submitForm(member.id)"
            />
          </div>
        </div>
      </b-sidebar>
    </b-row>
  </b-card>
</template>
<script>
import MemberEditInfo from "../components/MemberEditInfo";
import MemberInfoServices from "../services/Member-InfoServices";

export default {
  name: "MemberInfo",
  components: {
    MemberEditInfo,
  },
  props: {
    member: Object,
  },
  methods: {
    submitForm(id) {
      MemberInfoServices.updatePeople(id, this.member)
        .then(() => {
          this.$router.go(this.$router.currentRoute);
          console.log("member updated!");
        })
        .catch((error) => {
          this.message = error.response;
        });
    },
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
        Email: "c.friedricksen@aol.com",
      };
    }
    // Default photo (until photos are implemented)
    else {
      if (this.member.Picture == undefined) {
        this.member.Picture =
          Math.random() > 0.5
            ? "https://qph.fs.quoracdn.net/main-thumb-247285578-200-hzqdjetzezpphiwkjnrnsynmdtylybjy.jpeg"
            : "https://images.squarespace-cdn.com/content/v1/588921712e69cfac18fe17a2/1510150601760-T6D3J73PH8NMMQMYXLIS/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/Jolie_020+Square.jpg";
      }
      if (this.member.Phone == undefined) {
        this.member.Phone = "Not available";
      }
    }
  },
};
</script>

<style scoped></style>

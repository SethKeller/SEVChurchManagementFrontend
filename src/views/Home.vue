<template>
  <div class="home">
    <h1 class="m-3">Welcome!</h1>
    <img class="m-3" alt="Wilshire logo" src="../assets/wilshire-logo.jpg" width="350px" />
    <div v-show="loggedIn">
      <h5 class="py-4">
        This system allows you to manage your member information and view the
        church member directory
      </h5>
      <h4>Please select an option from the menu above to get started</h4>
    </div>
    <div class="content" align-self="center" v-show="!loggedIn">
      <h4>Announcements</h4>
      <p>
        We are excited to return to in person worship beginning Sunday, February
        28th at 9:30am. We encourage everyone to practice safe distancing and
        wear a facemask if possible. You can also join our worship via
        Livestream by subscribing to the Wilshire Church of Christ YouTube
        channel.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  }
};
</script>

<style scoped></style>

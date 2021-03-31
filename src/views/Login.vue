<template>
  <div class="parent">
    <img class="" alt="Wilshire logo" src="../assets/wilshire-transparent.png" width="300px" />

    <b-card
      title=""
      img-src=""
      img-alt=""
      img-top
      style=""
      class="mr-5 ml-5 card"
    >
      <form name="form" @submit.prevent="handleLogin">
        <b-form-input
          id="input-email"
          v-model="user.email"
          type="email"
          placeholder="Email"
          class="mb-2"
          required
        ></b-form-input>

        <b-form-input
          id="input-password"
          v-model="user.password"
          type="password"
          placeholder="Password"
          class="mb-3"
          required
        ></b-form-input>

        <b-button block type="submit" variant="primary">Submit</b-button>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("home");
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    }
  }
};
</script>

<style scoped>
.parent {
  display: grid;
  place-items: center;
  margin-top: 75px;
}

.card {
  width: clamp(23ch, 50%, 46ch);
  display: flex;
  flex-direction: column;
  /* padding: 1rem; */
  /* max-width: 20rem; */
}

.parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

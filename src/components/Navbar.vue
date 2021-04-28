<template>
  <b-navbar type="dark" sticky class="bg-dark text-light px-4 py-3 mb-4">
    <!-- TODO: change this to current congregation name -->
      <h3 class="my-auto pr-4">
        <router-link to="/" style="color: inherit; text-decoration: none;">Wilshire Church of Christ</router-link>
      </h3>
    <b-navbar-nav class="nav-pills">
      <b-nav-item to="/" exact exact-active-class="active" v-if="loggedIn">
        Home
      </b-nav-item>
      <b-nav-item
        to="/directory"
        exact
        exact-active-class="active"
        v-if="loggedIn"
      >
        Church Directory
      </b-nav-item>
      <b-nav-item
        to="/messages"
        exact
        exact-active-class="active"
        v-if="loggedIn"
      >
        Messages
      </b-nav-item>
      <b-nav-item-dropdown
        text="My Info"
        toggle-class="nav-link-custom"
        left
        v-if="loggedIn"
      >
        <b-dropdown-item :to="'/family-info/'+currentFamilyId" exact exact-active-class="active">
          My Family
        </b-dropdown-item>
        <b-dropdown-item to="/groups" exact exact-active-class="active">
          My Groups
        </b-dropdown-item>
        <b-dropdown-item to="/Memberinfo" exact exact-active-class="active">
          Edit Member Information
        </b-dropdown-item>
       
      </b-nav-item-dropdown>
      <b-nav-item-dropdown
        text="Administration"
        toggle-class="nav-link-custom"
        left
        v-if="showAdminBoard"
      >
        <b-dropdown-item to="/member-list" exact exact-active-class="active">
          Full Member List
        </b-dropdown-item>
        <b-dropdown-item to="/group-list" exact exact-active-class="active">
          Full Group List
        </b-dropdown-item>
        <b-dropdown-item to="/FamiliesEdit" exact exact-active-class="active">
          Full Family List
        </b-dropdown-item>
        <b-dropdown-item to="/reports" exact exact-active-class="active">
          Reports
        </b-dropdown-item>
        
        <b-dropdown-item to="/congregation" exact exact-active-class="active">
          Edit Congregation Info
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item exact exact-active-class="active" to="login" v-if="!loggedIn">
        Log In
      </b-nav-item>
      <b-nav-item
        exact
        exact-active-class="active"
        href
        @click.prevent="logOut"
        v-if="loggedIn"
      >
        Log Out
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import MemberListServices from "@/services/MemberListServices.js";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  name: "Navbar",
  props: {},
  data() {
    return {
      currentFamilyId: ""
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    getCurrentFamilyId() {
      MemberListServices.getMember(this.currentUser.id)
        .then(res => {
          this.currentFamilyId = res.data.FamilyId;
        })
        .catch(() => {
          this.currentFamilyId = "";
        });
    }
  },
  created() {
    this.getCurrentFamilyId();
  }
};
</script>

<style scoped>
.navbar {
  z-index: 100;
  box-shadow: 0px -1px 4px 2px #555555;
}
.nav-link {
  padding-left: 12px !important;
  padding-right: 12px !important;
}
</style>

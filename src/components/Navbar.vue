<template>
  <b-navbar type="dark" sticky class="bg-dark text-light px-4 py-3 mb-4">
    <!-- TODO: change this to current congregation name -->
    <h3 class="my-auto pr-4">Wilshire Church of Christ</h3>
    <b-navbar-nav class="nav-pills">
      <b-nav-item to="/" exact exact-active-class="active">
        Home
      </b-nav-item>
      <b-nav-item to="/directory" exact exact-active-class="active">
        Church Directory
      </b-nav-item>
      <b-nav-item to="/messages" exact exact-active-class="active">
        Messages
      </b-nav-item>
      <b-nav-item to="/events" exact exact-active-class="active">
        Events
      </b-nav-item>
      <b-nav-item-dropdown text="My Info" toggle-class="nav-link-custom" left>
        <b-dropdown-item to="/family-info" exact exact-active-class="active">
          My Family
        </b-dropdown-item>
        <b-dropdown-item to="/groups" exact exact-active-class="active">
          My Groups
        </b-dropdown-item>
        <b-dropdown-item to="/member-info" exact exact-active-class="active">
          Edit Member Information
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown
        text="Administration"
        toggle-class="nav-link-custom"
        left
      >
        <b-dropdown-item to="/member-list" exact exact-active-class="active">
          Full Member List
        </b-dropdown-item>
        <b-dropdown-item to="/group-list" exact exact-active-class="active">
          Full Group List
        </b-dropdown-item>
        <b-dropdown-item to="/reports" exact exact-active-class="active">
          Reports
        </b-dropdown-item>
        <b-dropdown-item to="/congregation" exact exact-active-class="active">
          Edit Congregation Info
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  props: {}
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

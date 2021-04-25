<template>
  <div>
    <b-form @submit="onSubmit">
      <b-container>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-fname" class="pt-1">First Name:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-fname"
              v-model="member.FirstName"
              required
              placeholder="First Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-lname" class="pt-1">Last Name:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-lname"
              v-model="member.LastName"
              required
              placeholder="Last Name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-email" class="pt-1">Email:</label>
          </b-col>
          <b-col sm="8">
            <b-form-input
              id="input-group-email"
              v-model="member.Email"
              required
              placeholder="Email"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-family" class="pt-1">Family:</label>
          </b-col>
          <b-col sm="8">
            <b-form-group label-for="input-group-family" class="mb-0">
              <b-form-select
                id="input-group-family"
                v-model="selected"
                :options="families"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- beginning of collapse to create a family -->
        <b-collapse id="collapse-family" class="mt-2">
          <b-card>
            <b-form-input
              id="input-newFamilyName"
              placeholder="Family Name"
              v-model="newFamilyName"
            ></b-form-input>

            <b-button
              size="sm"
              @click="createFamily"
              class="m-2"
              variant="outline-success"
              >Save</b-button
            >
            <b-button
              size="sm"
              v-b-toggle.collapse-family
              class="m-2"
              variant=""
              >Hide</b-button
            >
          </b-card>
        </b-collapse>
        <!-- head of family -->
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-head" class="pt-1">Head of Family:</label>
          </b-col>
          <b-col sm="8">
            <b-form-group label-for="input-group-head" class="mb-0">
              <b-form-checkbox
                id="input-group-head"
                v-model="familyRole"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
              >
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- setting permissions -->
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-permissions" class="pt-1"
              >Permissions:</label
            >
          </b-col>
          <b-col sm="8">
            <b-form-checkbox-group
              v-model="selectedPermissions"
              :options="permissions"
              class="mb-3"
            ></b-form-checkbox-group>
          </b-col>
        </b-row>
        <!-- password field -->
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-password" class="pt-1"
              >Temporary Password:</label
            >
          </b-col>
          <b-col sm="8">
            <b-form-group
              label-for="input-group-password"
              description="Password is randomly generated."
              class="mb-0"
            >
              <b-form-input
                id="input-group-password"
                v-model="password"
                required
                placeholder="Please enter a password"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- submit form button -->
        <b-row>
          <b-col></b-col>
          <b-col style="place-items: center; display: grid;"
            ><b-button variant="outline-success" type="submit"
              >Submit</b-button
            ></b-col
          >
          <b-col></b-col>
        </b-row>
        <b-alert
          class="m-2"
          :show="successAlertCountdown"
          variant="success"
          dismissible
          @dismiss-count-down="successAlertChanged"
        >
          {{ this.alertMessage }}
        </b-alert>
        <b-alert
          class="m-2"
          :show="errorAlertCountdown"
          variant="danger"
          dismissible
          @dismiss-count-down="errorAlertChanged"
        >
          {{ this.alertMessage }}
        </b-alert>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import AuthServices from "../services/AuthServices.js";
import FamilyMemberServices from "../services/FamilyMemberServices.js";

export default {
  props: {
    member: Object
  },
  components: {},
  created() {
    // assign generated temp password to the member
    this.password = this.tempPass;
    // get families to populate selection list
    this.getFamilies();
  },
  data() {
    return {
      password: null,
      families: ["No Selection", "*Create Family"],
      selected: null,
      newFamilyName: "",
      familyRole: "",
      show: true,
      dateConverted: false,
      alertMessage: null,
      successAlertCountdown: 0,
      errorAlertCountdown: 0,
      newFamily: "",
      permissions: ["user", "admin"],
      selectedPermissions: []
    };
  },
  watch: {
    selected: function() {
      if (this.isCreateFamily)
        this.$root.$emit("bv::toggle::collapse", "collapse-family");
    }
  },
  computed: {
    // Randomly create a temporary password for the new user
    tempPass() {
      return (Math.floor(Math.random() * 8999) + 1000).toString();
    },
    isCreateFamily() {
      return this.selected == "*Create Family";
    }
  },
  methods: {
    createFamily() {
      this.newFamily = {
        FamilyName: this.newFamilyName,
        CongregationId: 1
      };
      FamilyMemberServices.addFamily(this.newFamily)
        .then(res => {
          // refresh our family selection list
          this.getFamilies();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      event.preventDefault();
      // initialize additional member data before sending to the backend
      // reset family role
      delete this.member.FamilyRole;
      if (this.familyRole == "true") this.member.FamilyRole = 1;
      this.member.Password = this.password;
      // set user family
      this.member.FamilyId = this.selected;
      // set user permissions for system
      this.member.Roles = this.permissions;

      AuthServices.register(this.member)
        .then(res => {
          this.successAlertCountdown = 10;
          this.alertMessage =
            res.data.message || "Member successfully registered!";
        })
        .catch(err => {
          this.errorAlertCountdown = 6;
          this.alertMessage =
            err.response.data.message || "There was a problem registering user";
        });

      this.$emit("formSubmitted");
    },
    successAlertChanged: function(countdown) {
      this.successAlertCountdown = countdown;
    },
    errorAlertChanged: function(countdown) {
      this.errorAlertCountdown = countdown;
    },
    getFamilies() {
      FamilyMemberServices.getFamilies()
        .then(res => {
          res.data.forEach(family => {
            // check if incoming family is already in selection list
            if (this.families.filter(e => e.value === family.id).length == 0)
              // put data into array of objects for dropdown list: {value: id, text: familyName}
              this.families.push({ value: family.id, text: family.FamilyName });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#input-group-head {
  width: 40px;
}
</style>

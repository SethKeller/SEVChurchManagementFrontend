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
              :state="verifyEmail()"
            ></b-form-input>
          </b-col>
        </b-row>
        <!-- address selection list -->
        <b-row class="my-3">
          <b-col sm="4">
            <label for="input-group-address" class="pt-1">Address:</label>
          </b-col>
          <b-col sm="8">
            <b-form-group label-for="input-group-address" class="mb-0">
              <b-form-select
                id="input-group-address"
                v-model="selectedAddress"
                :options="addresses"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- family selection list -->
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
              description="Password was randomly generated"
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
import AddressServices from "../services/AddressServices.js";

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
      families: [
        { value: null, text: "Please select an option" },
        "*Create Family"
      ],
      addresses: [{ value: null, text: "Please select an option" }],
      selectedAddress: null,
      selected: null,
      newFamilyName: "",
      familyRole: "",
      newFamily: "",
      permissions: ["user", "admin"],
      selectedPermissions: [],
      show: true,
      dateConverted: false,
      alertMessage: null,
      successAlertCountdown: 0,
      errorAlertCountdown: 0
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
    // Add a new fam
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
      // set password
      this.member.Password = this.password;
      // set user family
      this.member.FamilyId = this.selected;
      // set user permissions for system
      this.member.Roles = this.permissions;
      // set default date to change later
      this.member.DateofBirth = new Date();

      if (this.member.FamilyId === "*Create Family") {
        this.errorAlertCountdown = 6;
        this.alertMessage = "Please select a family";
        return 0;
      }

      // Submit new User to DB
      AuthServices.register(this.member)
        .then(res => {
          this.successAlertCountdown = 10;

          if (this.selectedAddress) {
            // add address for person to DB
            AddressServices.addAddress({
              City: this.selectedAddress.City,
              HouseNumber: this.selectedAddress.HouseNumber,
              Street: this.selectedAddress.Street,
              State: this.selectedAddress.State,
              Zipcode: this.selectedAddress.Zipcode,
              PersonId: res.data.person.id,
              Active: 1
            })
              .then(res => console.log(res))
              // handle error for adding address
              .catch(err => (this.alertMessage = err.response.data.message || "error with address"));
          }

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
            // get address from head of family
            if (this.getHeadAddress(family).text) {
              this.addresses.push(this.getHeadAddress(family));
            }

            // check if incoming family is already in selection list
            if (this.families.filter(e => e.value === family.id).length == 0)
              // put data into array of objects for dropdown list: {value: id, text: familyName}
              this.families.push({ value: family.id, text: family.FamilyName });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // searches through members in a family for head of family
    // returns: head of family address
    getHeadAddress(family) {
      let address = null;
      let addressStr = null;
      family.people.forEach(person => {
        if (person.FamilyRole == 1 && person.addresses[0])
          address = person.addresses[0];
      });
      if (address)
        addressStr = `${address.HouseNumber} ${address.Street} ${address.City} ${address.State}`;

      return {
        value: address,
        text: addressStr
      };
    },
    verifyEmail() {
      return (this.member.Email != undefined && this.member.Email != null) && (
        this.member.Email.includes("@") &&
        this.member.Email.indexOf("@") != this.member.Email.length-3 &&
        this.member.Email.indexOf(".") > this.member.Email.indexOf("@") &&
        this.member.Email.indexOf(".") != this.member.Email.length-1
      ) ? null : false;
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

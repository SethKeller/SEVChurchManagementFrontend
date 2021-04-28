<template>
  <div>
    <h3>Group Info:</h3>
    <b-alert
      dismissible
      style="width:70%;max-width:540px"
      class="mx-auto"
      :variant="alertType"
      :show="alertCountdown"
      @dismissed="dismissCountdown = 0"
      @dismiss-count-down="alertCountdownChanged"
    >
      {{ alertMessage }}
    </b-alert>

    <b-form @submit="onSubmit">
      <b-container fluid>
        <b-container style="width:70%;max-width:540px" class="mx-auto">
          <b-row class="my-3">
            <b-col sm="4">
              <label for="input-group-fname" class="pt-1"
                >Group Leader Name:</label
              >
            </b-col>
            <b-col sm="8">
              <b-form-input
                id="input-group-fname"
                v-model="Leader"
                required
                placeholder="Leader Name"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-container
            class="pb-4"
          >
            <hr />
            <h3>Group Members:</h3>

            <div
              v-for="(item, index) in members"
              :key="index"
            >
              <MemberEditInfo
                :member="item"
                v-on:formSubmitted="submitForm(member.id)"
              />
              <br/>
            </div>
          </b-container>

          <div>
            <b-button
              id="show-btn"
              variant="primary"
              style="margin-top:-8px;"
              @ok="proceedReq($event)"
              @click="$bvModal.show('bv-modal-example')"
            >
              Add Member</b-button
            >
            <br/><br/>

            <b-modal id="bv-modal-example" hide-backdrop @ok="addGroupPerson">
              <template #modal-title>
                Add New people to the group
              </template>
              <div class="d-block text-center">
                <select class="form-control" @change="changeJobTitle($event)">
                  <option value="" selected disabled>Choose</option>
                  <option v-for="p in people" :value="p.id" :key="p.id">
                    {{ p.FirstName }} {{ p.LastName }}
                  </option>
                </select>
              </div>
            </b-modal>
          </div>
        </b-container>
      </b-container>
    </b-form>
  </div>
</template>
<script>
import MemberEditInfo from "@/components/MemberInfo";
import GroupServices from "../services/GroupPersonServices";
import MemberServices from "../services/MemberListServices";
import GroupPersonServices from "../services/GroupPersonServices";
import Group from "../services/GroupListServices";

export default {
  name: "MemberInfo",
  components: {
    MemberEditInfo,
  },
  props: {
    groupId: String,
  },
  data() {
    return {
      selectedPeople: null,
      people: [],
      options: [],
      headOfFamily: null,
      Leader: null,
      groups: {},
      members: [],
      address: null,
      headAddress: null,
      show: true,
      alertMessage: "Member info updated!",
      alertType: "success",
      alertCountdown: 0,
      groupPerson: {}
    };
  },
  created() {
    // Get page number from URL
    // if (this.$route.query.page != undefined && this.$route.query.page != "")
    //   this.page = parseInt(this.$route.query.page);

    // // Fetch the correct family based on passed-in prop
    // if (this.familyId == "" || this.familyId == undefined)
    //     console.error("Error: Family ID not provided!");
    // else
    this.getGroupPersonbyGroups(this.groupId);
    this.getgroups(this.groupId);
    this.getMember();
  },

  methods: {
    changeJobTitle(event) {
      this.selectedPeople =
        event.target.options[event.target.options.selectedIndex].text;
      var data = this.people;
      for (var i = 0; i < data.length; i++) {
          var fn = data[i].FirstName + ' ' + data[i].LastName;
        if (fn === this.selectedPeople) {
          this.groupPerson = {
            Leader: "test",
            PersonId: data[i].id,
            GroupId: this.groupId,
          };
          break;
        }
      }
    },
    addGroupPerson() {
      GroupPersonServices.addGroupPerson(this.groupPerson)
        .then((response) => {
            console.log("Thank you!" + response);
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    getgroups(id) {
      Group.getGroupById(id)
        .then((response) => {
          this.groups = response.data;
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    getGroupPersonbyGroups(id) {
      GroupServices.getGroupPersonbyGroups(id)
        .then((response) => {
          var data = response.data;
          this.Leader = data[0].Leader;
          for (var i = 0; i < data.length; i++) {
            this.members.push(data[i].people);
            console.log("groups" + [i] + data[i].people);
          }
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    getMember() {
      MemberServices.getMembers()
        .then((response) => {
          this.people = response.data;
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
    onSubmit() {
},
    alertCountdownChanged(countdown) {
      this.alertCountdown = countdown;
    },
  },
};
</script>

<style lang="scss" scoped></style>

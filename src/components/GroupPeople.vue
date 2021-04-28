<template>
  <transition name="modal" role="dialog">
    <div class="modal" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"> Groups</h5>
          </div>
          <div class="modal-body">
            <div>
              <b-table striped hover :items="member" :fields="fields"></b-table>
            </div>
            <!-- <div>
              <MemberEditInfo
              :member="member"
               v-on:formSubmitted="submitForm(member.id)"
            /> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import GroupPersonServices from "../services/GroupPersonServices";
//import MemberEditInfo from "@/components/MemberEditInfo";

export default {
  //  components: {
  //   MemberEditInfo,
  // },
  props: {
    euser: {
      type: Object,
    },
    showEdit: {
      default: false,
    },
  },
  data() {
    return {
       fields: ['DisplayName','FirstName', 'LastName'],
      edit_user: [],
      member: [],
    };
  },
  created() {
    this.getGroupPersonbyGroups(this.euser.id);
  },
  methods: {
    closeModal() {
      this.$emit("update:showEdit");
    },
    getGroupPersonbyGroups(id) {
      GroupPersonServices.getGroupPersonbyGroups(id)
        .then((response) => {
          var groupsdata = response.data;
          for (var i = 0; i < groupsdata.length; i++) {
            this.member.push(groupsdata[i].people);
            console.log("groups" + [i] + groupsdata[i].people);
          }
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },
  },
};
</script>

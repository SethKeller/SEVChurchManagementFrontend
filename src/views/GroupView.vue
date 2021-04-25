<template>
  <div>
    <div class="form-group">
      <table
        class="table table-bordered table-stripped"
        v-if="users.length > 0"
      >
       
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index+1 }}</td>
            <td>{{ user.Name }}</td>
            <td>{{ user.Type }}</td>
            <td>
              <button
                type="button"
                class="btn btn-success btn-sm"
                @click="initEdit(user)"
                :euser="user"
              >
                Show
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-md-6">
      <GroupPeople
        v-if="showEdit"
        :showEdit.sync="showEdit"
        :euser="currUser"
      >
      </GroupPeople>
    </div>
  </div>
</template>

<script>
import GroupPeople from "@/components/GroupPeople";
import GroupPersonServices from "../services/GroupPersonServices";
export default {
  components: {
    GroupPeople,
  },
  data() {
    return {
      user: [],
      users: [],
      euser: {},
      groupPerson: {},
      showEdit: false,
    };
  },
  created() {
    this.getGroups(2);
  },
  methods: {
    initEdit(user) {
      this.currUser = user;
      this.showEdit = true;
    },
    getGroups(id) {
      GroupPersonServices.getGroupPersonbyPerson(id)
        .then((response) => {
          this.groupPerson = response.data;
          console.log("groupPerson" + this.groupPerson);
          for (var i = 0; i < this.groupPerson.length; i++) {
            this.users.push(this.groupPerson[i].groups);
            console.log("groupList" + [i] + this.groupList);
            //this.getGroupsinGroupPerson(this.groupPerson[i].GroupId);
          }
        })
        .catch((error) => {
          this.message = error;
        });
    },
  },
};
</script>

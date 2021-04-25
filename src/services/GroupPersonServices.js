
import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost:8080/api/";
} else {
  baseurl = "/api/";
}

const apiClient = axios.create({
  baseURL: baseurl
});

export default {
  getGroupPerson(groupPersonid) {
    return apiClient.get("groupPersons/" + groupPersonid);
  },
  getGroupPersonbyPerson(personid) {
    return apiClient.get("groupPersons/personId/" + personid);
  },
  getGroupPersonbyGroups(groupid) {
    return apiClient.get("groupPersons/groupId/" + groupid);
  },
  addGroupPerson(groupPerson) {
    return apiClient.post("groupPersons", groupPerson);
  },
  updateGroupPerson(groupPersonid, groupPerson) {
    return apiClient.put("groupPersons/" + groupPersonid, groupPerson);
  },
  deleteGroupPerson(groupPersonid) {
    return apiClient.delete("groupPersons/" + groupPersonid);
  },

};
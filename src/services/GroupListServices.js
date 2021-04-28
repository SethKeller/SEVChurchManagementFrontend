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
    getGroups(){
    return apiClient.get("groups")
    },
    getGroupById(groupid) {
    return apiClient.get("groups/" + groupid);
    },
    addGroup(group) {
    return apiClient.post("groups", group);
    },
    updateGroupPerson(groupid, group) {
    return apiClient.put("groups/" + groupid, group);
    },
    deleteGroupPerson(groupid) {
    return apiClient.delete("groups/" + groupid);
    },

};
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
  getPeople(personid) {
    return apiClient.get("persons/" + personid);
  },
  addPeople(person) {
    return apiClient.post("persons", person);
  },
  updatePeople(personid, person) {
    return apiClient.put("persons/" + personid, person);
  },
  deletePeople(personid) {
    return apiClient.delete("persons/" + personid);
  },

};
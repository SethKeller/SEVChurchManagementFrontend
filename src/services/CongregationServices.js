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
  getCongregation(congregationid) {
    return apiClient.get("congregations/" + congregationid);
  },
  addCongregation(congregation) {
    return apiClient.post("congregations", congregation);
  },
  updateCongregation(congregationid, congregation) {
    return apiClient.put("congregations/" + congregationid, congregation);
  },
  deleteCongregation(congregationid) {
    return apiClient.delete("congregations/" + congregationid);
  }
};

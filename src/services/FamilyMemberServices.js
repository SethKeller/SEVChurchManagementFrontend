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
  getFamily(familyid) {
    return apiClient.get("familys/" + familyid);
  },
  addFamily(family) {
    return apiClient.post("familys", family);
  },
  updateFamily(familyid, family) {
    return apiClient.put("familys/" + familyid, family);
  },
  deleteFamily(familyid) {
    return apiClient.delete("familys/" + familyid);
  },
  getAllFamilies() {
    return apiClient.get("familys/");
  }
};

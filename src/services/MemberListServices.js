import axios from "axios";

// API base request URL from environment
var baseURLforClient =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/"
    : "/api/";

const apiClient = axios.create({
  baseURL: baseURLforClient,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true
  },
  transformRequest: (data, headers) => {
    // Set authentication for request if user token is valid
    let token = localStorage.getItem("token");
    let authHeader = "";
    if (token != null && token != "") authHeader = "Bearer" + token;
    headers.common["Authorization"] = authHeader;
    return JSON.stringify(data);
  }
});

export default {
  getMembers() {
    return apiClient.get("persons");
  },
  getMember(memberid) {
    return apiClient.get("persons/" + memberid);
  },
  addMember(memberid) {
    return apiClient.post("persons", memberid);
  },
  updateMember(memberid, member) {
    return apiClient.put("persons/" + memberid, member);
  },
  deleteMember(memberid) {
    return apiClient.delete("persons/" + memberid);
  }
};

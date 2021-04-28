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
getAddress(addressid) {
    return apiClient.get("addresses/" + addressid);
  },
  getAddressByPerson(personid) {
    return apiClient.get("addresses/personId/" + personid);
  },
  addAddress(address) {
    return apiClient.post("addresses", address);
  },
  updateAddress(addressid, address) {
    return apiClient.put("addresses/" + addressid, address);
  },
  deleteAddress(addressid) {
    return apiClient.delete("addresses/" + addressid);
  },

};
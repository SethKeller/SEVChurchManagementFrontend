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
  getheadoFamily(){
    return apiClient.get("persons/gethead");
  },
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
  
  // Get the root path for image hosting based on environment
  getPictureRootPath() {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:8080";
    } else {
      return "";
    }
  }
};

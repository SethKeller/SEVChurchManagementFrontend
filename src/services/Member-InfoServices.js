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
  
  // Upload a new picture for a specific person
  uploadPicture(personid, file) {
    console.info("Uploading image: " + file.name);
    
    // Construct a FormData to hold the image file
    var formData = new FormData();
    formData.append("pictureFile", file);
    
    // Upload the image inside the FormData
    return apiClient.post("persons/" + personid + "/picture", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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

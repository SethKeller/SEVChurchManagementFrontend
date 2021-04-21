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
  getFamilies() {
    return apiClient.get("familys");
  },
  getFamily(familyid) {
    return apiClient.get("familys/" + familyid);
  },
  getAddressByPerson(personid) {
    return apiClient.get("familys/personId/" + personid);
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
  
  // Upload a new picture for a specific family
  uploadPicture(familyid, file) {
    console.info("Uploading image: " + file.name);
    
    // Construct a FormData to hold the image file
    var formData = new FormData();
    formData.append("pictureFile", file);
    
    // Upload the image inside the FormData
    return apiClient.post("familys/" + familyid + "/picture", formData, {
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
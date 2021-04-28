<template>
  <div>
    <b-img thumbnail class="display-picture shadow rounded" :src="previewImage == null ? this.picturePath() + entity.Picture : previewImage" />
    <div v-show="canEdit">
      <h5 class="pt-3">Upload new picture:</h5>
      <b-form-file
          v-model="pictureFile"
          :state="Boolean(pictureFile)"
          placeholder="Choose a picture file or drop it here..."
          drop-placeholder="Drop file here..."
          accept="image/jpeg, image/png"
          @change="updatePreview"
      ></b-form-file>
      <b-alert show v-if="pictureFile" class="pt-2">
          Confirm you would like to upload this picture:
          <br/>
          <b-button @click="uploadPicture">Save</b-button>&nbsp;
          <b-button @click="resetPreview">Cancel</b-button>
      </b-alert>
      <b-alert :show="successAlertCountdown" variant="success" dismissible @dismiss-count-down="successAlertChanged">
          Picture successfully changed!
      </b-alert>
      <b-alert :show="errorAlertCountdown" variant="danger" dismissible @dismiss-count-down="errorAlertChanged">
          There was a problem uploading the picture. Please try again later.
      </b-alert>
      <div style="color:#aaaaaa;font-size:10pt;">(Recommended: Square image, at least 200 x 200 pixels)</div>
    </div>
  </div>
</template>

<script>
import MemberInfoServices from "@/services/Member-InfoServices.js";
import FamilyMemberServices from "@/services/FamilyMemberServices.js";

export default {
  name: "PictureUpload",
  props: {
    // Only one (member or family) should be passed in, not both
    member: Object,
    family: Object,
    canEdit: Boolean
  },
  data() {
    return {
      entity: {},         // The picture-supporting entity
      service: {},        // The picture uploading service for the entity
      familyMode: false,  // The picture uploading mode
      pictureFile: null,
      previewImage: null,
      successAlertCountdown: 0,
      errorAlertCountdown: 0
    };
  },
  methods: {
    uploadPicture: function() {
      this.service.uploadPicture(this.entity.id, this.pictureFile)
        .then(response => {
          this.successAlertCountdown = 4;
          this.entity.Picture = response.data; // Save the returned picture URL in the data object
          this.pictureFile = null;
          console.info("Got upload response: ", response);
        })
        .catch(error => {
          this.errorAlertCountdown = 4;
          this.resetPreview();
          console.error(error);
        })
    },
    updatePreview: function(e) {
      this.previewImage = URL.createObjectURL(e.target.files[0]);
    },
    resetPreview: function() {
      this.previewImage = null;
      this.pictureFile = null;
    },
    successAlertChanged: function(countdown) {
      this.successAlertCountdown = countdown;
    },
    errorAlertChanged: function(countdown) {
      this.errorAlertCountdown = countdown;
    },
    picturePath: function() {
      return this.service.getPictureRootPath();
    }
  },
  created() {
    if (this.family != null && this.family != undefined) {
      // Run image uploader in family mode
      this.familyMode = true;
      this.entity = this.family;
      this.service = FamilyMemberServices;
    } else if (this.member != null && this.member != undefined) {
      // Run image uploader in member mode
      this.familyMode = false;
      this.entity = this.member;
      this.service = MemberInfoServices;
    }
  }
};
</script>

<style scoped>
.display-picture {
  min-width: 100px;
  max-width: 250px;
  height: auto;
}
</style>

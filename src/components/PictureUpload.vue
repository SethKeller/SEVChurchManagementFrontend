<template>
  <div>
    <b-img thumbnail class="display-picture shadow rounded" :src="previewImage == null ? this.picturePath() + member.Picture : previewImage" />
    <h5 class="pt-3">Upload new picture:</h5>
    <b-form-file
        v-model="pictureFile"
        :state="Boolean(pictureFile)"
        placeholder="Choose a picture file or drop it here..."
        drop-placeholder="Drop file here..."
        accept="image/jpeg, image/png"
        @change="updatePreview"
    ></b-form-file>
    <b-alert show v-if="pictureFile" class="py-2">
        Confirm you would like to upload this picture:
        <b-button @click="uploadPicture">Save</b-button>&nbsp;
        <b-button @click="resetPreview">Cancel</b-button>
    </b-alert>
    <b-alert :show="successAlertCountdown" variant="success" dismissible @dismiss-count-down="successAlertChanged">
        Picture successfully changed!
    </b-alert>
    <b-alert :show="errorAlertCountdown" variant="danger" dismissible @dismiss-count-down="errorAlertChanged">
        There was a problem uploading the picture. Please try again later.
    </b-alert>
  </div>
</template>

<script>
import MemberInfoServices from "@/services/Member-InfoServices.js";

export default {
  name: "PictureUpload",
  props: {
    member: Object
  },
  data() {
    return {
      pictureFile: null,
      previewImage: null,
      successAlertCountdown: 0,
      errorAlertCountdown: 0
    };
  },
  methods: {
    uploadPicture: function() {
      MemberInfoServices.uploadPicture(this.member.id, this.pictureFile)
        .then(response => {
          this.successAlertCountdown = 4;
          this.member.Picture = response.data; // Save the returned picture URL in the data object
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
      return MemberInfoServices.getPictureRootPath();
    }
  },
  created() {}
};
</script>

<style scoped>
.display-picture {
  min-width: 100px;
  max-width: 250px;
  height: auto;
}
</style>

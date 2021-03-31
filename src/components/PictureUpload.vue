<template>
  <div>
    <b-img class="display-picture" />
    <h5>Upload new picture:</h5>
    <!-- TODO: add file form -->
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
      //pictureFile: null
    };
  },
  methods: {
    uploadPicture: function(file) {
      MemberInfoServices.uploadPicture(file)
        .then(response => {
          // TODO
          console.info("Got upload response: "+response);
        })
        .catch(error => {
          console.error("Error: "+error);
        })
    }
  },
  created() {}
};
</script>

<style scoped>
.display-picture {
  width: 250px; /* TODO- upgrade to max-width */
  height: 250px;
  border: 1px dashed black;
}
</style>

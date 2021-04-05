<template>
  <div>
    <h2 class="mx-auto">Picture Upload Test:</h2>
    <PictureUpload :member="member" class="mx-auto" style="width:800px;" />
  </div>
</template>

<script>
import PictureUpload from "@/components/PictureUpload.vue";
import MemberInfoServices from "@/services/Member-InfoServices.js";

export default {
  name: "PictureTest",
  components: {
    PictureUpload
  },
  data() {
    return {
      member: Object
    };
  },
  methods: {
    getMember: function(id) {
      MemberInfoServices.getPeople(id)
        .then(response => {
          this.member = response.data;
          console.info("Got member data: " + this.member);
        })
        .catch(error => {
          console.error("Error: " + error);
        });
    }
  },
  created() {
    this.getMember(1);
  }
};
</script>

<style scoped></style>

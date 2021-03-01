<template>
  <div class="">
    <h1 class="pb-3">Church Directory</h1>
    <!-- TODO: add basic search bar -->
    <!-- TODO: build dynamic grid of info cards -->
    <MemberInfo class="mx-auto" />
  </div>
</template>

<script>
import MemberInfo from "@/components/MemberInfo.vue";

export default {
  name: "MemberDirectory",
  components: {
    MemberInfo
  },
  props: {}
};
</script>

<style scoped></style>

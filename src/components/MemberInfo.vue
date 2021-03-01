<template>
  <b-card no-body class="overflow-hidden shadow" style="max-width: 420px;">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img
          src="https://i.pinimg.com/originals/78/e9/8d/78e98d6cf0e15e9993baf70717acfa73.jpg"
          alt="Member Picture"
          class="rounded-0"
        />
      </b-col>
      <b-col md="7" class="mx-auto">
        <!-- TODO: replace placeholder with real info -->
        <b-card-body title="Carl Fredricksen">
          <b-card-text>
            Member info goes here<br />
            Phone: 405-425-5555
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "MemberInfo",
  props: {
    // memberId
  }
};
</script>

<style scoped></style>

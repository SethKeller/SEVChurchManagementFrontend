<template>
  <div>
    <Search v-on:search-submitted="doSomething"/>
    {{ displayData }}
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  components: {
    Search
  },
  data() {
    return {
      displayData: ":3"
    };
  },
  created() {},
  methods: {
    doSomething(result) {
      this.displayData = result;
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-name" label="Congregation Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="congregation.Name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-form-group id="input-group-address" label="Congregation Address:" label-for="input-address">
        <b-form-input
          id="input-address"
          v-model="congregation.Address"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-phone" label="Congregation Phone:" label-for="input-phone">
        <b-form-input
          id="input-phone"
          v-model="congregation.Phone"
          placeholder="Enter phone number"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

  </div>
</template>

<script>
  export default {
    name: "CongregationForm",
    props: {
      congregation: Object
    },
    data() {
      return {
        show: true,
      };
    },
    methods: {
      onSubmit() {
        this.$emit('formSubmitted');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

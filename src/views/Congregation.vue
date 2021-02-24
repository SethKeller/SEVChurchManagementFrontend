<template>
  <div>
    <CongregationForm :congregation="congregation" v-on:formSubmitted="submitForm"/>
  </div>
</template>

<script>
  import CongregationServices from '../services/CongregationServices.js';
  import CongregationForm from '../components/CongregationForm.vue';
  export default {
    components: {
      CongregationForm
    },
      data() {
        return {
          congregation: []
        };
      },
      created() {
        // need a way to select MY church; current API returns either a list of congregations or you can request a congregation by ID
        // defaulting congregation with id of 1 since the church admin will only manage their own church
        // maybe before this page, we should ask the user to choose a congregation
        this.getCongregation(1);
      },
      methods: {
        submitForm() {
          this.updateCongregation(1, this.congregation);
        },
        getCongregation(id) {
          CongregationServices.getCongregation(id)
            .then(response => {
              this.congregation = response.data;

              this.form.name = this.congregation.Name;
              this.form.address = this.congregation.Address;
              this.form.phone = this.congregation.Phone;
            })
            .catch(error => {
              this.message = error.response.data.message;
            })
        },
        updateCongregation(id, congregation) {
          CongregationServices.updateCongregation(id, congregation)
            .then(() => {
              this.$router.push('congregation');
            }) 
            .catch((error) => {
              this.message = error.response;
            })
        }
      }
  };
</script>

<style lang="scss" scoped>

</style>
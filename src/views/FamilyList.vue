<template>
   <div>
       <h3>Families</h3>
       <crud-table
               :endpoint="getEndpoint()"
               :columns="['FamilyName','action']"
               :form-fields="{
               name: ''
           }"
       >
           <!-- your form input fields in this slot-->
           <template v-slot:input-fields="{formdata}">
               <b-form-group id="input-group-2" label=" Name:" label-for="input-2">
                   <b-form-input
                           id="input-2"
                           v-model="formdata.FamilyName"
                           required
                           placeholder="Enter family name"
                   ></b-form-input>
                   
               </b-form-group>
                
           </template>
       </crud-table>

   </div>
</template>

<script>
   import CrudTable from '../components/crudTableFamily';
   

   export default {
       components: {CrudTable},
       methods: {
           // API base request URL from environment
           getEndpoint: function() {
            return (process.env.NODE_ENV === "development"
                ? "http://localhost:8080/api/familys/"
                : "/api/familys/");
           }
       }
   };
   
</script>

<style scoped>

</style>

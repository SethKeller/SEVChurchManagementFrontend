<template>
   <div>
       <h3>Groups</h3>
       <crud-table
               :endpoint="getEndpoint()"
               :columns="['Name','Type','action']"
               :form-fields="{
               name: ''
           }"
       >
           <!-- your form input fields in this slot-->
           <template v-slot:input-fields="{formdata}">
               <b-form-group id="input-group-2" label="  Group Name:" label-for="input-2">
                   <b-form-input
                           id="input-2"
                           v-model="formdata.Name"
                           required
                           placeholder="Enter group name"
                   ></b-form-input>
                   
               </b-form-group>
                <b-form-group id="input-group-3" label=" Group Type:" label-for="input-3">
                   <b-form-input
                           id="input-3"
                           v-model="formdata.Type"
                           required
                           placeholder="Enter group Type"
                   ></b-form-input>
                   
               </b-form-group>
           </template>
       </crud-table>

   </div>
</template>

<script>
   import CrudTable from '../components/crudTable';
   

   export default {
       components: {CrudTable},
       methods: {
           // API base request URL from environment
           getEndpoint: function() {
            return (process.env.NODE_ENV === "development"
                ? "http://localhost:8080/api/groups/"
                : "/api/groups/");
           }
       }
   };
   
</script>

<style scoped>

</style>

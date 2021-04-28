<template>
    <div>
        <b-card no-body class = "overflow-hidden shadow" style="min-width: 800px">
        <b-row no-gutters>
            <b-col md="6">
                <b-card-body :title="member.FirstName + ' ' + member.LastName" class = "text-left"> </b-card-body>               
            </b-col>  
            <b-col md="6" class="mt-3">
                <b-button v-b-modal="`id-${member.id}`" href="#" variant="primary" class = "mr-1" @click="onEdit">Edit</b-button>
                <b-button v-b-modal="`id-${member.id}-delete`" href="#" variant="primary">Delete</b-button>
                </b-col>
        </b-row>
        
        </b-card>
     <b-modal :id="`id-${member.id}`" :title='member.FirstName + " " + member.LastName' shadow hide-backdrop ok-only>
        <div class="px-3 py-2">
          <div>
            <MemberEditInfo
              :member="member"
               v-on:formSubmitted="submitForm(member.id)"
            />
          </div>
        </div>
      </b-modal>
      <b-modal :id="`id-${member.id}-delete`" title= "Are you sure?" shadow hide-backdrop @ok="onDelete()">
      </b-modal>  
    </div>
    
               
</template>

<script>
import MemberEditInfo from "@/components/MemberEditInfo.vue";

export default {
    name: "MemberInfo",
    components: {
    MemberEditInfo
    },
    props: {
        member: Object
    },

methods: {
        onEdit (event){  
            event.preventDefault();
            this.$emit("edit-pressed", this.member.id);
        },
        onDelete (){
            console.log("DELET THIS");
            this.$emit("delete-pressed", this.member.id);
        } 
    }
};
</script>

<style scoped></style>
<template>
    <b-card no-body class = "overflow-hidden shadow" style="min-width: 800px">
        <b-row no-gutters>
            <b-col md="6">
                <b-card-body :title="member.FirstName + ' ' + member.LastName" class = "text-left"> </b-card-body>               
            </b-col>  
            <b-col md="6" class="mt-3">
                <b-button href="#" variant="primary" class = "mr-1">Edit</b-button>
                <b-button href="#" variant="primary">Delete</b-button>
                </b-col>
        </b-row>
    </b-card>              
</template>

<script>
export default {
    name: "MemberInfo",
    props: {
        member: Object
    },
};
</script>

<style scoped></style>
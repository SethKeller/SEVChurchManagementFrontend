<template>
    <b-card no-body class = "overflow-hidden shadow" style="min-width: 800px">
        <b-row no-gutters>
            <b-col md="20">
                <b-card-body :title="member.FirstName + ' ' + member.LastName">
                <b-button href="#" variant="primary">Edit</b-button>
                <b-button href="#" variant="primary">Delete</b-button>
                </b-card-body>
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
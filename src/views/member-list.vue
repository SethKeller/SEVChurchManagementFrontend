<template>
<div>
    <h1> Member List</h1>
    <h3>{{ message }}</h3>
    <div id="page-buttons">
        <button v-on:click="prevPage">Prev</button>
        <button v-on:click="nextPage">Next</button>
    </div>
    <br/>
    <div id="search-bar">
        <input type="search" v-model="searchQuery" />
        <button v-on:click="runSearch">Search</button>
    </div>
    <br/>
    <table>
        <tr>
            
        </tr>   

    </table>
</div>
</template>

<script>
//import needed for components
export default {
    
}
</script>
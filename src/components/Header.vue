<!-- src/components/Header.vue -->
<template>
    <div>
        <p>{{title}}<p/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ['title'],
});
</script>

<style>
/* // .greeting {
//     font-size: 20px;
// } */
</style>

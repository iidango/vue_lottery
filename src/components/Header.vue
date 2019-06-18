<!-- src/components/Header.vue -->
<template>
    <div class="header">
        <h1>{{title}}</h1>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ['title'],
});
</script>

<style>
.header {
    font-weight: bold;
}
</style>

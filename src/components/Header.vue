<!-- src/components/Header.vue -->
<template>
    <div class="header">
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
.header {
    font-weight: bold;
}
</style>

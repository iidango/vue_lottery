<!-- src/components/Header.vue -->
<template>
    <div>
        <p>Vue Lottery!!<p/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            // return Array(this.enthusiasm + 1).join('!');
            return this.enthusiasm + '!';
        }
    }
});
</script>

<style>
/* // .greeting {
//     font-size: 20px;
// } */
</style>

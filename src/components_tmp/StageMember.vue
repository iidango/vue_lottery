<!-- src/components/StageMember.vue -->
<template>
    <div class="stageMember" v-bind:class="{ electedMember: elected, notElectedMember: notElected}">
        {{member.name}}
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Member} from "../model";

export default Vue.extend({
    props: {
        member: Member, 
    }, 
    data(): {}{
        return {
        }
    },
    methods: {
    },
    computed: {
        elected: function(): boolean{
            return this.$props.member.is_elected;
        }, 
        notElected: function(): boolean{
            return !this.$props.member.is_elected;
        }
    }
});
</script>

<style>
/* .stageMember {
    font-size: 20px;
} */
.electedMember {
    font-size: 20px;
    color: red;
}
.nonEelectedMember {
    font-size: 10px;
}
</style>
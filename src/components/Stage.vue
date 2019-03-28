<!-- src/components/Stage.vue -->
<template>
    <div id="stage">
        <p>Stage!!<p/>
        <ul>
            <div v-for="m in selectedMembers" v-bind:key="m.name">
                <stage-member-component :member="m"/>
                <!-- {{m.is_elected}}
                {{m.name}} -->
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import StageMemberComponent from "./StageMember.vue";
import {Member, Status} from "../model";

type Prop<T> = () => T;    // this line is necessary to use array as Vue Prop
export default Vue.extend({
    props: {
        members: Array as Prop<Member[]>, 
        status: Status
    }, 
    data(): {}{
        return {
        }
    },
    methods: {
        toggle_member(m: Member) { 
            console.log('TODO toggle member!!'); 
            console.log(m); 
        },
        toggle_group(g_name: string) { 
            console.log('TODO toggle group!!'); 
            console.log(g_name); 
        },
        fetch_groups(): Object { 
            console.log('fetch groups!!');
            let groups: {[index: string]: Array<Member>; } = {};
            let group_ids: Array<number> = [];
            for(const m of this.$props.members){
                if(group_ids.indexOf(m.group_id)  == -1){
                    group_ids.push(m.group_id);
                    groups[m.group] = [];
                }
                groups[m.group].push(m);
            }
            return groups;
        }, 
    },
    computed: {
        selectedMembers: function(): Array<Member>{
            let ret: Array<Member> = [];
            for(const m of this.$props.members){
                if(m.is_selected){
                    ret.push(m);
                }
            }
            return ret;
        }
    }, 
    components: {
        'stage-member-component': StageMemberComponent, 
    }
});
</script>

<style>
#stage {
    font-size: 20px;
}
</style>
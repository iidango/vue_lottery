<!-- src/components/MemberSelect.vue -->
<template>
    <div>
        <p>Select members!!<p/>
        <ul>
            <div v-for="(m_list, g_name) in groups" v-bind:key="g_name">
                <div class="group">
                    group: <button v-on:click="toggle_group(g_name)">{{g_name}}</button>
                    <div v-for="m in m_list" v-bind:key="m.name">
                        <button v-on:click="toggle_member(m)">{{m.name}}</button>
                    </div>
                </div>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Member, Status} from "../model";

type Prop<T> = () => T;    // this line is necessary to use array as Vue Prop
export default Vue.extend({
    props: {
        members: Array as Prop<Member[]>, 
        status: Status
    }, 
    data(): {groups: {[index: string]: Array<Member>; };} {
        return {
            groups: {},    // initialized by fetch groups
        }
    },
    created: function(){
        this.$data.groups = this.fetch_groups();
    }, 
    methods: {
        toggle_member(m: Member) { 
            m.toggle_selected();
        },
        toggle_group(g_name: string) { 
            let frag: boolean = false;
            for(const m of this.$data.groups[g_name]){
                frag = m.is_selected || frag;
            }

            for(const m of this.$data.groups[g_name]){
                m.is_selected = !frag;
            }
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
        add_group() { 
            const g_name: string = 'tmp_group';
            let g_id = Member.add_group_name(g_name);
            if(g_id != -1){
                Vue.set(this.$data.groups, g_name, [])
            }
        },
        add_member(name: string, g_id: number) { 
            const new_m = new Member(name, g_id);
            this.$props.members.push(new_m);
            this.groups[new_m.group].push(new_m);
        },
    },
    computed: {
    }
});
</script>

<style>
</style>

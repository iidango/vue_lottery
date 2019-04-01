<!-- src/components/MemberSelect.vue -->
<template>
    <div>
        <p>Select members!!<p/>
        <ul>
            <div v-for="(group, ml) in groupList" v-bind:key="group.id">
                <div class="group">
                    group: <button v-on:click="toggle_group(group)">{{group.name}}</button>
                    <div v-for="m in ml" v-bind:key="m.id">
                        <button v-on:click="toggle_member(m)">{{m.name}}</button>
                    </div>
                </div>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Member} from "../model/Member";
import {Status} from "../model/Status";
import { MemberList, GroupedMemberList } from "../model/MemberList";
import { MemberGroupList } from "../model/MemberGroupList";
import { GroupMemberSelector } from "../model/MemberSelector";
import { MemberGroup } from "../model/MemberGroup";

type Prop<T> = () => T;    // this line is necessary to use array as Vue Prop
export default Vue.extend({
    props: {
        memberList: {
            type: GroupedMemberList, 
        }, 
        status: Status
    }, 
    data(): {memberSelector: GroupMemberSelector} {
        return {
            memberSelector: new GroupMemberSelector(this.$props.memberList)
        }
    },
    created: function(){
        console.log(this.$props)
    }, 
    methods: {
        toggle_member(m: Member) { 
            this.$data.memberSelector.toggle(m);
        },
        toggle_group(mg: MemberGroup) { 
            this.$data.memberSelector.toggleGroup(mg);
        },
        /* 
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
        */
    },
    computed: {
        groupList: function(){
            return this.$props.memberList.fetchAllGroups()
        }
    }
});
</script>

<style>
</style>

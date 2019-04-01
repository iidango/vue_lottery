<!-- src/components/MemberSelect.vue -->
<template>
    <div id="lottery">
        <div id="member-select">
            <p>Select members!!<p/>
            <ul>
                <div v-for="[group, ml] of groupMap" v-bind:key="group.id">
                    <div class="group">
                        group: <button v-on:click="toggleGroup(group)">{{group.name}}</button>
                        <div v-for="m in ml" v-bind:key="m.id">
                            <button v-on:click="toggleMember(m)">{{m.name}}</button>
                        </div>
                    </div>
                </div>
                <!-- <div v-for="m in memberList" v-bind:key="m.id">
                    <button v-on:click="toggleMember(m)">{{m.name}}</button>
                </div> -->
                <button v-on:click="createNewMember()">new member</button>
            </ul>
        </div>
        <div id="setting">
            <p>Setting!!<p/>
            <button v-on:click="action()">{{currentStatus}}</button>
        </div>
        <div id="stage">
            <p>Selected Members!!<p/>
            <ul>
                <div v-for="m in selectedMemberList" v-bind:key="m.name">
                <!-- <div v-for="m in hoge" v-bind:key="m.name"> -->
                    {{m.name}}
                </div>
            </ul>
            <p>Winner!!<p/>
            <ul>
                <div v-for="m in winnerMemberList" v-bind:key="m.name">
                    {{m.name}}
                </div>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { MemberList, GroupedMemberList } from "../model/MemberList";
import { MemberGroupList } from "../model/MemberGroupList";
import { GroupMemberSelector } from "../model/MemberSelector";
import { MemberGroup } from "../model/MemberGroup";
import { Member } from "../model/Member";
import { Status, State } from "../model/Status";
import { TestDataLoader } from "../utils/DataLoader";
import { SimpleLottery } from "../model/Lottery";


type Prop<T> = () => T;    // this line is necessary to use array as Vue Prop
let ms: GroupMemberSelector
let ml: GroupedMemberList
let lottery: SimpleLottery
export default Vue.extend({
    props: {
    }, 
    data: (): {status: Status, memberList: Array<Member>, selectedMemberList: Array<Member>, winnerMemberList: Array<Member>, groupMap: Map<MemberGroup, Set<number>>} =>{
    // data: () =>{
        return {
            status: new Status(), 
            memberList: [], 
            selectedMemberList: [], 
            winnerMemberList: [], 
            groupMap: new Map<MemberGroup, Set<number>>(), 
        }
    }, 
    created: function() {
        console.log('lottery on created')
        const dl: TestDataLoader = new TestDataLoader()
        ml = dl.loadData()
        ms = new GroupMemberSelector(ml)

        lottery = new SimpleLottery(ml, this.$data.status)

        this.$data.memberList = ml.members
        this.$data.selectedMemberList = ms.selectedMemberList
        this.$data.winnerMemberList = lottery.winnerList
        this.$data.groupMap = ms.fetchGroupMap()
    }, 
    methods: {
        toggleMember(m: Member) { 
            ms.toggle(m);
        },
        toggleGroup(mg: MemberGroup) { 
            ms.toggleGroup(mg);
        },
        createNewMember(gName?: string, mName?: string) { 
            gName = gName? gName: ' no name group'
            mName = mName? mName: ' no name member'
            const m = new Member(gName)
            const g = new MemberGroup(gName)

            // TODO please use $set function to detect groupMap update
            ml.members.push(m)
            ml.setGroup(g, m)
            console.log(this.$data.groupMap)
        },
        action(): void{
            switch(this.$data.status.currentState){
                case State.Waiting:
                    lottery.run()
                    break;
                case State.Selecting:
                    break;
                case State.Selected:
                default:
            }
        }, 
    },
    computed: {
        currentStatus: function(): string{
            let s: string; 
            switch(this.$data.status.currentState){
                case State.Waiting:
                    s = 'Start!!';
                    break;
                case State.Selecting:
                    s = 'Selecting!!';
                    break;
                case State.Selected:
                    s = 'Reset!!';
                    break;
                default:
                    s = 'invalid state';
            }
            return s;
        }, 
    }
});
</script>

<style>
</style>

<!-- src/components/MemberSelect.vue -->
<template>
    <div id="lottery">
        <div id="member-select">
            <h1>Select members!!</h1>
            <v-layout columnß>
                <div v-for="[group, ml] of groupMap" v-bind:key="group.id">
                    <v-layout row>
                        <v-card>
                            <v-toolbar color="indigo" dark>
                                <!-- <v-btn color="info">{{group.name}}</v-btn> -->

                                <v-toolbar-title @click="toggleGroup(group)">{{group.name}}</v-toolbar-title>

                                <v-spacer></v-spacer>

                            </v-toolbar>
                            <v-list>
                                <v-list-tile
                                    v-for="m in ml"
                                    :key="m.id"
                                    avatar
                                    @click="toggleMember(m)"
                                >
                                    <v-list-tile-action>
                                        <v-icon v-show="isSelected(m)" color="pink">star</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                    <v-list-tile-title v-text="m.name"></v-list-tile-title>
                                    </v-list-tile-content>

                                    <!-- <v-list-tile-avatar>
                                    <img :src="item.avatar">
                                    </v-list-tile-avatar> -->
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-layout>
                    </div>
                </v-layout>
            <v-btn color="info" @click="createNewMember()">create new member</v-btn>
        </div>
        <div id="setting">
            <h1>Options</h1>
            <v-btn color="success" @click="action()">{{currentStatus}}</v-btn>
        </div>
        <div id="stage">
            <h1>Selected Members!!</h1>
            <ul>
                <div v-for="m in selectedMemberList" v-bind:key="m.name">
                <!-- <div v-for="m in hoge" v-bind:key="m.name"> -->
                    {{m.name}}
                </div>
            </ul>
            <h2>Winner!!</h2>
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
// import Vuetify from 'vuetify'
// // Vue.use(Vuetify)
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import { MemberList, GroupedMemberList } from "../model/MemberList";
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
        isSelected: function(value: Member): boolean{
            return this.$data.selectedMemberList.includes(value)
        }
    },
    filters: {
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
    }, 
});
</script>

<style>
</style>

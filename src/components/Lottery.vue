<!-- src/components/MemberSelect.vue -->
<template>
  <div id="lottery">
    <v-layout column align-start>
      <v-flex xs32>
        <v-layout row>
          <div class="member-selector">
            <h1>Member List</h1>
            <v-layout row>
              <div v-for="[group, ml] of groupMap" :key="group.id" class="group-panel">
                <v-layout column>
                  <v-card>
                    <v-toolbar color="indigo" @click="toggleGroup(group)" dark>
                      <v-toolbar-title>{{group.name}}</v-toolbar-title>

                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-list three-line>
                      <v-list-tile
                        v-for="m in ml"
                        :key="m.id"
                        avatar
                        @click="toggleMember(m)"
                        v-bind="memberStyle(m)"
                      >
                        <v-list-tile-action>
                          <v-icon v-show="isWinner(m)" color="pink">star</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                          <v-list-tile-title v-text="m.name" :class="{selected: isSelected(m)}"></v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile avatar>
                          <input type="number" v-model="m.weight" style="width: 40px">
                        </v-list-tile>

                        <!-- <v-list-tile-avatar>
                                        <img :src="item.avatar">
                        </v-list-tile-avatar>-->
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-layout>
              </div>
            </v-layout>
            <!-- <v-btn color="info" @click="createNewMember()">add new member(not available now)</v-btn> -->
          </div>
        </v-layout>
        <v-layout row>
          <div class="operator">
            <h1>Options</h1>
            <h2>
              Member Num:
              <input
                type="number"
                v-model="winnerNum"
                style="width: 50px"
                @change="updateLotterySetting"
              >
            </h2>
            <v-btn color="success" @click="action()">{{currentStatus}}</v-btn>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import Vuetify from 'vuetify'
// // Vue.use(Vuetify)
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import { MemberGroup } from "../model/MemberGroup";
import { Member } from "../model/Member";
import { Status, State } from "../model/Status";
import { TestDataLoader, YamlDataLoader } from "../utils/DataLoader";
import { Lottery, WeightedLottery } from "../model/Lottery";
import { GroupedList } from "../model/GroupedList";
import { GroupSelector, Selector } from "../model/Selector";

type Prop<T> = () => T; // this line is necessary to use array as Vue Prop
let gml: GroupedList;
let gms: GroupSelector;
// let lottery: SimpleLottery
let lottery: Lottery;
let timerId: any = undefined;
let timerInterval: number = 10;
export default Vue.extend({
  props: {},
  data: (): {
    status: Status;
    memberList: Array<object>;
    groupMap: Map<MemberGroup, Set<any>>;
    winnerNum: number;
  } => {
    // data: () =>{
    return {
      status: new Status(),
      memberList: [],
      groupMap: new Map<MemberGroup, Set<any>>(),
      winnerNum: 1
    };
  },
  created: function() {
    console.log("lottery on created");
    // const dl: TestDataLoader = new TestDataLoader()
    const dl: YamlDataLoader = new YamlDataLoader();
    gml = dl.loadData();

    gms = new GroupSelector(gml);

    // lottery = new Lottery(gml.members, this.$data.status);
    lottery = new WeightedLottery(
      gml.members,
      this.$data.winnerNum
    );

    this.$data.memberList = gml.members;
    this.$data.groupMap = gms.fetchGroupMap();

    this.setMemberProparty();
  },
  methods: {
    toggleMember(m: Member) {
      gms.toggle(m);
    },
    toggleGroup(mg: MemberGroup) {
      gms.toggleGroup(mg);
    },
    createNewMember(gName?: string, mName?: string) {
      gName = gName ? gName : " no name group";
      mName = mName ? mName : " no name member";
      const m = new Member(gName);
      const g = new MemberGroup(gName);

      // TODO please use $set function to detect groupMap update
      gml.members.push(m);
      gml.setGroup(g, m);
      console.log(this.$data.groupMap);
    },
    action(): void {
      switch (this.$data.status.currentState) {
        case State.Waiting:
          this.status.currentState = State.Selecting
          timerId = setInterval(this.runLottery, timerInterval);
          break;
        case State.Selecting:
          this.status.currentState = State.Waiting
          clearInterval(timerId)
          break;
        case State.Selected:
        default:
      }
    },
    runLottery: function() {
      console.log('run lottery!!')
      this.updateLotterySetting()
      lottery.run.bind(lottery, "this")()
    },
    isSelected: function(v: object): boolean {
      return gms.isSelected(v);
    },
    isWinner: function(v: Member): boolean {
      return lottery.isWinner(v);
    },
    setMemberProparty: function() {
      this.$data.memberList.forEach((m: object) => {
        this.$set(m, Selector.SELECTED, false);
        this.$set(m, Lottery.WINNER, false);
        this.$set(m, WeightedLottery.WEIGHT, 1.0);
        this.$set(m, WeightedLottery.RANK, 0.0);
      });
    },
    memberStyle: function(m: Member) {
      return {
        color: this.isSelected(m) ? "red" : ""
      };
    },
    updateLotterySetting() {
      (lottery as WeightedLottery).winnerNum = this.$data.winnerNum;
      lottery.candidates = this.selectedMemberList;
    }
  },
  filters: {},
  computed: {
    currentStatus: function(): string {
      let s: string;
      switch (this.$data.status.currentState) {
        case State.Waiting:
          s = "Start!!";
          break;
        case State.Selecting:
          s = "Selecting!!";
          break;
        case State.Selected:
          s = "Reset!!";
          break;
        default:
          s = "invalid state";
      }
      return s;
    },
    selectedMemberList: function(): Array<object> {
      return this.$data.memberList.filter(this.isSelected);
    }
  }
});
</script>

<style>
.operator {
  margin: 10px;
}
.member-selector {
  margin: 10px;
}
.group-panel {
  margin: 10px;
}
</style>

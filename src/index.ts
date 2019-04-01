import Vue from 'vue'

import HeaderComponent from './components/Header.vue'
import LotteryComponent from './components/Lottery.vue'
import MemberSelectComponent from './components/MemberSelect.vue'
import SettingComponent from './components/Setting.vue'
import StageComponent from './components/Stage.vue'

import { Member } from './model/Member'
import { MemberList, GroupedMemberList } from './model/MemberList'
import { MemberGroupList } from './model/MemberGroupList'
import { Status } from './model/Status'
import { MemberGroup } from './model/MemberGroup'

let v = new Vue({
  el: '#app',
  template: `
        <div>
            <header-component :title="title"/>
            <lottery-component />
        </div>
    `,
  data: () => {
    return{
      title: 'Vue lottery!!'
    }
  },
  components: {
    'header-component': HeaderComponent,
    'lottery-component': LotteryComponent
    // 'member-select-component': MemberSelectComponent
            // <setting-component :memberList="memberList" :memberGroupList="memberGroupList" :status="status"/>
            // <stage-component :memberList="memberList" :status="status"/>
    // 'setting-component': SettingComponent,
    // 'stage-component': StageComponent
  }
})

import Vue from "vue";

import HeaderComponent from "./components/Header.vue";
import MemberSelectComponent from "./components/MemberSelect.vue";
import SettingComponent from "./components/Setting.vue";
import StageComponent from "./components/Stage.vue";

import {Member, Status} from "./model";

// TODO
function load_members(): Array<Member>{
    let members: Array<Member> = [];

    Member.add_group_name("hoge");
    Member.add_group_name("fuga");

    members.push(new Member('test1', 1));
    members.push(new Member('test2', 1));
    members.push(new Member('test3', 2));
    members.push(new Member('test4', 2));

    return members
}

let data = { members: load_members(), status: new Status()};

let v = new Vue({
    el: "#app",
    template: `
        <div>
            <header-component :members="members" :status="status"/>
            <member-select-component :members="members" :status="status"/>
            <setting-component :members="members" :status="status"/>
            <stage-component :members="members" :status="status"/>
        </div>
    `,
    data: data,
    components: {
        'header-component': HeaderComponent, 
        'member-select-component': MemberSelectComponent, 
        'setting-component': SettingComponent, 
        'stage-component': StageComponent, 
    }
});

<!-- src/components/Stage.vue -->
<template>
    <div>
        <p>Setting!!<p/>
        <button v-on:click="action()">{{currentStatus}}</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Member, Status, State} from "../model";
import { Stats } from "fs";

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
        action() { 
            switch(this.$props.status.current_state){
                case State.Waiting:
                    this.start_selection();
                    break;
                case State.Selecting:
                    this.skip_select_animation();
                    break;
                case State.Selected:
                    this.reset_selection();
                default:
            }
        },
        start_selection() { 
            this.$props.status.current_state = State.Selecting;

            let candidates: Array<Member> = [];
            for(const m of this.$props.members){
                if(m.is_selected){
                    candidates.push(m);
                }
            }

            if(candidates.length != 0){
                // random selection
                for (let i = 0; i < this.$props.status.labels.length; i++){
                    const selected_idx = Math.floor(Math.random() * candidates.length)
                    const selected_m = candidates[selected_idx]
                    selected_m.is_elected = true;
                    selected_m.rank = i;
                    console.log(selected_m.name + 'is elected!!')

                    candidates = candidates.filter(m => m.id !== selected_m.id);    // remove selected_m from candidates
                }
                console.log(this.$props.members);
                this.$props.status.current_state = State.Selected;
            }else{
                console.log('No member selected!!');
            }
        },
        end_selection() { 
            this.$props.status.current_state = State.Selected;
        },
        skip_select_animation() { 
            console.log('TODO skip_select_animation!')
        },
        reset_selection() { 
            for(const m of this.$props.members){
                m.is_selected = false;
                m.is_elected = false;
            }
            this.$props.status.current_state = State.Waiting;
        },
    },
    computed: {
        currentStatus: function(): string{
            let s: string; 
            switch(this.$props.status.current_state){
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
        }
    }
});
</script>

<style>
</style>

import { Z_MEM_ERROR } from "zlib";

export class Member {
    private static group_name: Array<string> = ["None"];
    private static current_id: number = 0;

    private _name: string;
    private _id: number;
    private _group_id: number;
    private _is_selected: boolean;
    private _is_elected: boolean;
    private _rank: number;
    private _labels: Array<string>;

    constructor();
    constructor(name: string, group_id: number);
    constructor(name?: string, group_id?: number) {
        this._name = name? name: 'no name';
        this._id = Member.new_id();
        this._group_id = group_id? group_id: 0;
        this._is_selected = false;
        this._is_elected = false;
        this._rank = -1;
        this._labels = [];
    }

    get name(){
        return this._name;
    }
    get id(){
        return this._id;
    }
    get group_id(){
        return this._group_id;
    }
    get group(){
        return Member.group_name[this._group_id];
    }
    get is_selected(){
        return this._is_selected;
    }
    get is_elected(){
        return this._is_elected;
    }
    get rank(){
        return this._is_elected? this._rank: -1;
    }
    get labels(){
        return this._labels;
    }

    set is_selected(value: boolean){
        this._is_selected = value;
    }
    set is_elected(value: boolean){
        this._is_elected = value;
    }
    set rank(value: number){
        this._rank = value;
    }

    public toggle_selected(){
        this.is_selected = this.is_selected? false: true;
    }
    public toggle_elected(){
        this.is_elected = this.is_elected? false: true;
    }

    public label(idx: number): string{
        return this._labels[idx];
    }
    public add_label(val: string){
        this._labels.push(val);
    }

    public static add_group_name(gn: string): number{
        if(Member.group_name.indexOf(gn) != -1){
            console.log(gn + ' is already defined');
            return -1;
        }

        Member.group_name.push(gn);
        return Member.group_name.length - 1;
    }

    private static new_id(): number{
        return Member.current_id ++;
    }

}

export class Status {
    private _current_state: number;
    private _labels: Array<string>;

    constructor() {
        this._current_state = State.Waiting;
        this._labels = ['*'];
    }

    get current_state(){
        return this._current_state;
    }
    set current_state(value: number){
        this._current_state = value;
    }
    get labels(){
        return this._labels;
    }
    set labels(value: Array<string>){
        this._labels = value;
    }
    public label(ind: number){
        return this.labels[ind]
    }
    public add_label(val: string){
        if (this.labels.indexOf(val) != -1){
            this.labels.push(val);
        }else{
            console.log(val + ' is defined label')
        }
    }
}

export enum State{
    Waiting = 0, 
    Selecting = 1, 
    Selected = 2
};

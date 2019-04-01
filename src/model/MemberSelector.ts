import { MemberList, GroupedMemberList } from './MemberList'
import { Member } from './Member'
import { MemberGroupList } from './MemberGroupList'
import { MemberGroup } from './MemberGroup'

export class MemberSelector {
  protected _memberList: Array<Member>

  protected _selectedMemberList: Array<Member>

  public constructor (memberList: Array<Member>) {
    this._memberList = memberList
    this._selectedMemberList = []
  }

  public get selectedMemberList (): Array<Member> {
    return this._selectedMemberList
  }

  public get memberList (): Array<Member> {
    return this._memberList
  }

  public set memberList (value: Array<Member>) {
    this._memberList = value
  }

  public set selectedMemberList (value: Array<Member>) {
    this._selectedMemberList = value
  }

  public select (m: Member): boolean {
    if (this.memberList.includes(m) && !this.isSelectedMember(m)) {
      this._selectedMemberList.push(m)
      return true
    } else {
      return false
    }
  }

  public deSelect (m: Member): boolean {
    const idx = this.selectedMemberList.indexOf(m)
    if (idx > -1) {
      this._selectedMemberList.splice(idx, 1)
      return true
    } else {
      return false
    }
  }

  public toggle (m: Member): void {
    if (this.isSelectedMember(m)) {
      this.deSelect(m)
    } else {
      this.select(m)
    }
  }

  public selectMemberList (ml: Array<Member>) {
    ml.forEach(m => this.select(m))
  }

  public deSelectMemberList (ml: Array<Member>) {
    ml.forEach(m => this.deSelect(m))
  }

  public isSelectedMember (m: Member): boolean {
    return this.selectedMemberList.includes(m)
  }

  public resetSelectedMember (): void {
    this._selectedMemberList = []

  }
}

export class GroupMemberSelector extends MemberSelector {
  private _groupedMemberList: GroupedMemberList

  public constructor (memberList: GroupedMemberList) {
    super(memberList.members)
    this._groupedMemberList = memberList
  }

  public get groupedMemberList (): GroupedMemberList {
    return this._groupedMemberList
  }

  /*
  public get memberGroupList (): MemberGroupList {
    return this._memberGroupList
  }

  public set memberGroupList (value: MemberGroupList) {
    this._memberGroupList = value
  }
  */

  // public fetchGroupMap (): Map<MemberGroup, Set<Member>> {
  public fetchGroupMap () {
    return this.groupedMemberList.groupMap
  }

  public selectGroup (mg: MemberGroup) {
    // const ml = this.memberListFromMemberGroup(mg)
    const ml = this.groupedMemberList.getGroupMember(mg)
    this.selectMemberList(ml)
  }

  public deSelectGroup (mg: MemberGroup) {
    const ml = this.memberListFromMemberGroup(mg)
    this.deSelectMemberList(ml)
  }

  public toggleGroup (mg: MemberGroup) {
    const ml = this.memberListFromMemberGroup(mg)
    if (this.isSelectedGroup(mg)) {
      this.deSelectGroup(mg)
    } else {
      this.selectGroup(mg)
    }
  }

  public isSelectedGroup (mg: MemberGroup) {
    // return mg.memberList.every(x => this.isSelectedMember(x))
    return this.memberListFromMemberGroup(mg).every(x => this.isSelectedMember(x))
  }

  private memberListFromMemberGroup (mg: MemberGroup): Array<Member> {
    // return this.memberList.filter(m => mg.memberList.includes(m))
    return this.groupedMemberList.getGroupMember(mg)
  }
}

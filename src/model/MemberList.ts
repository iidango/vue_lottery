import { Member } from './Member'
import { MemberGroup } from './MemberGroup'

export abstract class MemberList {
  protected _members: Array<Member>
  constructor (members?: Array<Member>) {
    this._members = members ? members : []
  }

  public get members (): Array<Member> {
    return this._members
  }

}

// export class GroupedMemberList extends MemberList {
export class GroupedMemberList extends MemberList {
  private _groupMap: Map<MemberGroup, Set<Member>>    // <memberGroup, [member, ...]>

  constructor () {
    super()
    this._groupMap = new Map <MemberGroup, Set<Member>>()
  }

  public get groupMap (): Map<MemberGroup, Set<Member>> {
    return this._groupMap
  }

  public setGroup (mg: MemberGroup, m: Member) {
    if (!this.members.includes(m)) {
      this.members.push(m)
    }

    let mList = this.groupMap.get(mg)

    if (mList === undefined) {
      mList = new Set<Member>()
      this.groupMap.set(mg, mList)
    }

    mList.add(m)
  }

  public getGroupMember (mg: MemberGroup): Array<Member> {
    const memberList = this.groupMap.get(mg)
    // return memberList !== undefined ? new MemberList(this.members.filter(m => memberList.has(m))) : new MemberList()
    return memberList !== undefined ? this.members.filter(m => memberList.has(m)) : []
  }

}

export class GroupedList {
  private _members: Array<any>
  private _groupMap: Map<any, Set<any>>    // <memberGroup, [member, ...]>

  constructor () {
    this._members = []
    this._groupMap = new Map <any, Set<any>>()
  }

  public get members (): Array<any> {
    return this._members
  }

  public get groupMap (): Map<any, Set<any>> {
    return this._groupMap
  }

  public setGroup (g: any, m: any) {
    if (!this.members.includes(m)) {
      this.members.push(m)
    }

    let mList = this.groupMap.get(g)

    if (mList === undefined) {
      mList = new Set<any>()
      this.groupMap.set(g, mList)
    }

    mList.add(m)
  }

  public getGroupMember (g: any): Array<any> {
    const memberList = this.groupMap.get(g)
    return memberList !== undefined ? this.members.filter(m => memberList.has(m)) : []
  }

}

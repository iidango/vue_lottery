import { GroupedList } from './GroupedList'

export class Selector {
  static SELECTED = 'target'

  protected _members: Array<any>

  public constructor (members: Array<any>) {
    this._members = members
  }

  public get members (): Array<any> {
    return this._members
  }

  public set member (value: Array<any>) {
    this._members = value
  }

  public select (m: any): boolean {
    if (this.members.includes(m) && !this.isSelected(m)) {
      m[Selector.SELECTED] = true
      return true
    } else {
      return false
    }
  }

  public deSelect (m: any): boolean {
    const selecteds = this.getSlected()
    const mId = this.members.indexOf(m)
    if (selecteds.includes(m)) {
      m[Selector.SELECTED] = false
      return true
    } else {
      return false
    }
  }

  public getSlected (): Array<any> {
    return this.members.filter(m => m[Selector.SELECTED])
  }

  public toggle (m: any): void {
    if (this.isSelected(m)) {
      this.deSelect(m)
    } else {
      this.select(m)
    }
  }

  public selectMembers (ml: Array<any>) {
    ml.forEach(m => this.select(m))
  }

  public deSelectMembers (ml: Array<any>) {
    ml.forEach(m => this.deSelect(m))
  }

  public isSelected (m: any): boolean {
    return m[Selector.SELECTED]
  }

  public resetSelectedMember (): void {
    this.members.forEach(m => this.deSelect(m))

  }
}

// TODO this class might be not necessary
export class GroupSelector extends Selector {
  private _groupedList: GroupedList

  public constructor (groupedList: GroupedList) {
    super(groupedList.members)
    this._groupedList = groupedList
  }

  public get groupedList (): GroupedList {
    return this._groupedList
  }

  public fetchGroupMap () {
    return this.groupedList.groupMap
  }

  public selectGroup (g: any) {
    const members = this.groupedList.getGroupMember(g)
    this.selectMembers(members)
  }

  public deSelectGroup (g: any) {
    const members = this.groupedList.getGroupMember(g)
    this.deSelectMembers(members)
  }

  public toggleGroup (g: any) {
    const members = this.groupedList.getGroupMember(g)
    if (this.isSelectedGroup(g)) {
      this.deSelectGroup(g)
    } else {
      this.selectGroup(g)
    }
  }

  public isSelectedGroup (g: any) {
    return this.groupedList.getGroupMember(g).every(x => this.isSelected(x))
  }
}

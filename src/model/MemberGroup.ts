
export class MemberGroup {
  private static CURRENT_ID: number = 0

  private static new_id (): number {
    return MemberGroup.CURRENT_ID ++
  }

  private _name: string
  private _id: number
  // private _memberList: Set<Member>

  constructor (name?: string) {
    this._name = name ? name : 'no name'
    this._id = MemberGroup.new_id()
    // this._memberList = new Set<Member>()
  }

  get name () {
    return this._name
  }
  get id () {
    return this._id
  }
  // get memberList () {
  //   return this._memberList
  // }
}


export class Member {
  private static CURRENT_ID: number = 0

  private static new_id (): number {
    return Member.CURRENT_ID ++
  }

  private _name: string
  private _id: number

  constructor (name?: string) {
    this._name = name ? name : 'no name'
    this._id = Member.new_id()
  }

  get name () {
    return this._name
  }
  get id () {
    return this._id
  }

}

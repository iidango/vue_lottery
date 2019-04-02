import { Member } from './Member'
import { MemberList } from './MemberList'
import { Status, State } from './Status'

export class SimpleLottery {
  protected _candidates: Array<Member>
  protected _status: Status
  protected _winnerList: Array<Member>

  constructor (memberList?: Array<Member>, status?: Status) {
    this._candidates = memberList ? memberList : []
    this._winnerList = []
    this._status = status ? status : new Status()
  }

  protected get status (): Status {
    return this._status
  }

  public get candidates (): Array<Member> {
    return this._candidates
  }

  public get winnerList (): Array<Member> {
    return this._winnerList
  }

  public set candidates (v: Array<Member>) {
    this._candidates = v
  }

  protected setRunningState () {
    this.status.currentState = State.Selecting
  }

  protected setFinishState () {
    this.status.currentState = State.Waiting
  }

  private setWinner (m: Member) {
    while (this.winnerList.length !== 0) {
      this.winnerList.pop()
    }
    this.winnerList.push(m)
  }

  // random selection
  public run (): void {
    this.setRunningState()
    if (this.candidates.length !== 0) {
      const winInd = Math.floor(Math.random() * this.candidates.length)
      const winMem = this.candidates[winInd]

      this.setWinner(winMem)
    } else {
      console.log('No member selected!!')
    }
    this.setFinishState()
  }
}

export class LabeledLottery extends SimpleLottery {
  private _labels: Array<string>

  constructor (memberList?: Array<Member>, status?: Status) {
    super(memberList, status)
    this._labels = []
    this._winnerList = []
  }

  public get labels (): Array<string> {
    return this._labels
  }

  public get winnerList (): Array<Member> {
    return this._winnerList
  }

  // random selection
  public run (): void {
    this.setRunningState()
    if (this.candidates.length !== 0) {
      for (let i = 0; i < this.labels.length; i++) {
        const winInd = Math.floor(Math.random() * this.candidates.length)
        const winMem = this.candidates[winInd]

        this._winnerList.push(winMem)

        this.candidates = this.candidates.filter(m => m.id !== winMem.id)    // remove selected_m from candidates

        if (this.candidates.length === 0) {
          break
        }
      }
    } else {
      console.log('No member selected!!')
    }
    this.setFinishState()
  }
}

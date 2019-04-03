import { Status, State } from './Status'

export class Lottery {
  static WINNER = 'winner'

  protected _candidates: Array<any>
  protected _status: Status

  constructor (candidates?: Array<any>, status?: Status) {
    this._candidates = candidates ? candidates : []
    this._status = status ? status : new Status()
  }

  protected get status (): Status {
    return this._status
  }

  public get candidates (): Array<any> {
    return this._candidates
  }

  public set candidates (v: Array<any>) {
    this._candidates = v
  }

  protected setRunningState () {
    this.status.currentState = State.Selecting
  }

  protected setFinishState () {
    this.status.currentState = State.Waiting
  }

  public isWinner (m: any): boolean {
    return m[Lottery.WINNER]
  }

  public runOnce () {
    this.setRunningState()
    this.run()
    this.setFinishState()
  }

  // random selection
  public run (): void {
    if (this.candidates.length !== 0) {
      const winnerId = Math.floor(Math.random() * this.candidates.length)
      const winner = this.candidates[winnerId]

      this.candidates.forEach((m, i) => m[Lottery.WINNER] = (i === winnerId))
    } else {
      console.log('No member selected!!')
    }
  }
}

// TOOD
export class WeightedLottery extends Lottery {
  static WEIGHT = 'weight'
  static RANK = 'rank'

  constructor (candidates?: Array<any>, status?: Status) {
    super(candidates, status)

    this.candidates.forEach(m => {
      if (m[WeightedLottery.WEIGHT] === undefined) {
        console.log('please set weight')
      }
      if (m[WeightedLottery.RANK] === undefined) {
        console.log('please set rank')
      }
    })
  }

  public run (): void {
    this.setRunningState()
    if (this.candidates.length !== 0) {
      const winnerId = Math.floor(Math.random() * this.candidates.length)
      const winner = this.candidates[winnerId]

      winner.winner = true
    } else {
      console.log('No member selected!!')
    }
    this.setFinishState()
  }
}

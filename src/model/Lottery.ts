import { Status, State } from './Status'

export class Lottery {
  static WINNER = 'winner'

  protected _candidates: Array<any>
  protected _status: Status
  protected _timerId: any
  protected _timerInterval: number

  constructor (candidates?: Array<any>, status?: Status) {
    this._candidates = candidates ? candidates : []
    this._status = status ? status : new Status()
    this._timerId = undefined
    this._timerInterval = 10
  }

  protected get status (): Status {
    return this._status
  }

  public get candidates (): Array<any> {
    return this._candidates
  }

  protected get timerId (): any | undefined {
    return this._timerId
  }

  protected get timerInterval (): number {
    return this._timerInterval
  }

  public set candidates (v: Array<any>) {
    this._candidates = v
  }

  protected set timerId (v: any | undefined) {
    this._timerId = v
  }

  protected set timerInterval (v: number) {
    this._timerInterval = v
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

  public start () {
    this.setRunningState()
    this.timerId = setInterval(this.run.bind(this, 'this'), this.timerInterval)
  }

  public stop () {
    clearInterval(this.timerId)
    this.status.currentState = State.Waiting
  }

  public isRunning (): boolean {
    return this.status.currentState === State.Selecting
  }

  // random selection
  public run (): void {
    if (this.isRunning()) {
      if (this.candidates.length !== 0) {
        const winnerId = Math.floor(Math.random() * this.candidates.length)
        const winner = this.candidates[winnerId]

        this.candidates.forEach((m, i) => m[Lottery.WINNER] = (i === winnerId))
      } else {
        console.log('No member selected!!')
      }
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

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

        this.setWinner(winnerId)
      } else {
        console.log('No member selected!!')
      }
    }
  }

  protected setWinner (idx: number) {
    this.candidates.forEach((m, i) => m[Lottery.WINNER] = (i === idx))
  }

  protected setWinners (idxs: Array<number>) {
    this.candidates.forEach((m, i) => m[Lottery.WINNER] = (idxs.includes(i)))
  }
}

// TOOD
export class WeightedLottery extends Lottery {
  static WEIGHT = 'weight'
  static RANK = 'rank'

  private _winnerNum: number

  constructor (candidates?: Array<any>, status?: Status, winnerNum?: number) {
    super(candidates, status)

    this.candidates.forEach(m => {
      if (m[WeightedLottery.WEIGHT] === undefined) {
        console.log('please set weight')
      }
      if (m[WeightedLottery.RANK] === undefined) {
        console.log('please set rank')
      }
    })

    this._winnerNum = winnerNum ? winnerNum : 1
  }

  private get winnerNum (): number {
    return this._winnerNum
  }

  public run (): void {
    if (this.isRunning()) {
      if (this.hasCandidate()) {
        let order = []

        this.candidates.forEach((m, i) => {
          m[WeightedLottery.RANK] = Math.random() * m[WeightedLottery.WEIGHT]
          order.push([m[WeightedLottery.RANK], i])
        })

      } else {
        console.log('No member selected!!')
      }
    }
  }

  protected setWinner (arg: number | Array<any>) {
    if (typeof arg === 'number') {
      super.setWinner(arg)
    } else {
      arg.sort((a, b) => a[0] - b[0])
      console.log(arg)
      let winners = []
      for (let i = 0; i < this.winnerNum; i++) {
        winners.push(i)
      }
      super.setWinners(winners)
    }
  }

  private hasCandidate () {
    return !this.candidates.every(m => m.weight === 0)
  }

  private normalize () {
    let weightSum = 0
    this.candidates.forEach(m => weightSum += m[WeightedLottery.WEIGHT])
    if (weightSum !== 0) {
      this.candidates.forEach(m => m[WeightedLottery.WEIGHT] /= weightSum)
    }

    let rankSum = 0
    this.candidates.forEach(m => rankSum += m[WeightedLottery.RANK])
    if (rankSum !== 0) {
      this.candidates.forEach(m => m[WeightedLottery.RANK] /= rankSum)
    }
  }
}

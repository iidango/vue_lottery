import { Status, State } from './Status'

export class Lottery {
  static WINNER = 'winner'

  protected _candidates: Array<any>

  constructor (candidates?: Array<any>) {
    this._candidates = candidates ? candidates : []
  }

  public get candidates (): Array<any> {
    return this._candidates
  }

  public set candidates (v: Array<any>) {
    this._candidates = v
  }

  public isWinner (m: any): boolean {
    return m[Lottery.WINNER]
  }

  // random selection
  public run (): void {
    if (this.candidates.length !== 0) {
      const winnerId = Math.floor(Math.random() * this.candidates.length)
      const winner = this.candidates[winnerId]

      this.setWinner(winnerId)
    } else {
      console.log('No member selected!!')
    }
  }

  protected setWinner (idx: number) {
    this.candidates.forEach((m, i) => m[Lottery.WINNER] = (i === idx))
  }

  protected setWinners (idxs: Array<number>) {
    this.candidates.forEach((m, i) => m[Lottery.WINNER] = (idxs.includes(i)))
  }
}

export class WeightedLottery extends Lottery {
  static WEIGHT = 'weight'
  static RANK = 'rank'

  private _winnerNum: number

  constructor (candidates?: Array<any>, winnerNum?: number) {
    super(candidates)
    this._winnerNum = winnerNum ? winnerNum : 1

    this.candidates.forEach(m => {
      if (m[WeightedLottery.WEIGHT] === undefined) {
        console.log('please set weight')
      }
      if (m[WeightedLottery.RANK] === undefined) {
        console.log('please set rank')
      }
    })
  }

  public get winnerNum (): number {
    return this._winnerNum
  }

  public set winnerNum (v: number) {
    this._winnerNum = v
  }

  public run (): void {
    if (this.candidates.length !== 0) {
      let order: Array<any> = []

      this.candidates.forEach((m, i) => {
        m[WeightedLottery.RANK] = Math.random() * m[WeightedLottery.WEIGHT]
        order.push([m[WeightedLottery.RANK], i])
      })

      this.setWinner(order)

    } else {
      console.log('No member selected!!')
    }
  }

  protected setWinner (arg: number | Array<any>) {
    if (typeof arg === 'number') {
      super.setWinner(arg)
    } else {
      arg.sort((a, b) => - (a[0] - b[0]))
      let winners = []
      for (let i = 0; (i < this.winnerNum) && i < arg.length; i++) {
        winners.push(arg[i][1])
      }
      super.setWinners(winners)
    }
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

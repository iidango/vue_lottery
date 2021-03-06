
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
  /*
  choose multiple(winnerNum) users based on their weights
  */
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

      // find top winnerNum scored users
      order.sort((a, b) => - (a[0] - b[0]))
      let winners = []
      for (let i = 0; (i < this.winnerNum) && i < order.length; i++) {
        winners.push(order[i][1])
      }
      super.setWinners(winners)

    } else {
      console.log('No member selected!!')
    }
  }
}

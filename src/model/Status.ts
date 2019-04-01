
export class Status {
  private _currentState: number
  private _labels: Array<string>

  constructor () {
    this._currentState = State.Waiting
    this._labels = ['*']
  }

  get currentState () {
    return this._currentState
  }
  set currentState (value: number) {
    this._currentState = value
  }
  get labels () {
    return this._labels
  }
  set labels (value: Array<string>) {
    this._labels = value
  }
  public label (ind: number) {
    return this.labels[ind]
  }
  public addLabel (val: string) {
    if (this.labels.indexOf(val) !== -1) {
      this.labels.push(val)
    } else {
      console.log(val + ' is defined label')
    }
  }
}

export enum State {
    Waiting = 0,
    Selecting = 1,
    Selected = 2
}

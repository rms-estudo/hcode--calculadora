class CalcController {
  constructor() {
    // this._  Indica atributo privado
    this._displayCalc = '0'
    this._currentDate
    this.initialize()
  }

  get displayCalc() {
    return this._displayCalc
  }

  set displayCalc(value) {
    this._displayCalc = value
  }

  get currentDate() {
    return this._currentDate
  }

  set currentDate(value) {
    this._currentDate = value
  }

  initialize() {
    let calcDisplayEl = document.querySelector('#display')
    let calcDateEl = document.querySelector('#data')
    let calcTimeEl = document.querySelector('#hora')

    calcDisplayEl.innerHTML = '1234'
    calcDateEl.innerHTML = '02/02/0220'
    calcTimeEl.innerHTML = '17:00'
  }
}
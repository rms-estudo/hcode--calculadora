class CalcController {
  constructor() {
    // this._  Indica atributo privado
    this._calcDisplayEl = document.querySelector('#display')
    this._calcDateEl = document.querySelector('#data')
    this._calcTimeEl = document.querySelector('#hora')

    this.locale = 'pt-BR'
    this._currentDate
    this.initialize()
    this.initButtonsEvent()
  }

  get displayCalc() {
    return this._calcDisplayEl.innerHTML
  }

  set displayCalc(value) {
    this._calcDisplayEl.innerHTML = value
  }

  get currentDate() {
    return new Date()
  }

  set currentDate(value) {
    this._currentDate = value
  }

  get displayTime() {
    return this._calcTimeEl.innerHTML
  }

  set displayTime(value) {
    this._calcTimeEl.innerHTML = value
  }

  get displayDate() {
    return this._calcDateEl.innerHTML
  }

  set displayDate(value) {
    this._calcDateEl.innerHTML = value
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    this.displayTime = this.currentDate.toLocaleTimeString(this.locale)
  }

  addEventListenerAll(element, events, fn) {
    // separando os eventos
    events.split(' ').forEach(event => {
      element.addEventListener(event, fn, false)
    })
  }

  initButtonsEvent() {
    let buttons = document.querySelectorAll('#buttons > g, #parts > g')

    buttons.forEach(button => {
      this.addEventListenerAll(button, 'click drag', e => {
        console.log(button.className.baseVal.replace('btn-', ''))
      })

      this.addEventListenerAll(button, 'mouseover mouseup mousedown', e => {
        button.style.cursor = 'pointer'
      })

    })
  }

  initialize() {
    this.setDisplayDateTime()

    setInterval(() => {
      this.setDisplayDateTime()
    }, 1000)
  }
}
class CalcController {
  constructor() {
    // this._  Indica atributo privado
    this._calcDisplayEl = document.querySelector('#display')
    this._calcDateEl = document.querySelector('#data')
    this._calcTimeEl = document.querySelector('#hora')

    this.locale = 'pt-BR'
    this._operation = []
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

  getLastButtonClicked() {
    return this._operation[this._operation.length - 1]
  }

  isOperator(value) {
    if (value === '+' || value === '-' || value === '*' || value === '%' || value === '/') {
      return true
    }

    return false
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value
  }

  calc() {
    let last = this._operation.pop()
    let result = eval(this._operation.join(''))
    this._operation = [result, last]
  }

  pushOperation(value) {
    this._operation.push(value)

    if (this._operation.length > 3) {
      this.calc()
    }
  }

  setLastNumberToDisplay() {

  }

  addOperation(value) {

    // Verifica se não é um numero
    if (isNaN(this.getLastButtonClicked())) {

      if (this.isOperator(value)) {
        // troca o operador
        this.setLastOperation(value)

      } else if (isNaN(value)) {


      } else {
        this.pushOperation(value)
      }

    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value)

      } else {
        let newValue = this.getLastButtonClicked().toString() + value.toString()
        this.setLastOperation(parseInt(newValue))

        this.setLastNumberToDisplay()
      }

    }

  }

  clearAll() {
    this._operation = []
  }

  clearEntry() {
    this._operation.pop()
  }


  setError() {
    this.displayCalc = 'Error'
  }

  execBtn(value) {
    switch (value) {
      case 'ac':
        this.clearAll()
        break;
      case 'ce':
        this.clearEntry()
        break;
      case 'porcento':
        this.addOperation('%')
        break;
      case 'divisao':
        this.addOperation('/')
        break;
      case 'multiplicacao':
        this.addOperation('*')
        break;
      case 'soma':
        this.addOperation('+')
        break;
      case 'subtracao':
        this.addOperation('-')
        break;
      case 'igual':
        break;
      case 'ponto':
        this.addOperation('.')
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value))
        break;
      default:
        this.setError()
        break;
    }
  }

  initButtonsEvent() {
    let buttons = document.querySelectorAll('#buttons > g, #parts > g')

    buttons.forEach(button => {
      this.addEventListenerAll(button, 'click drag', e => {
        let buttonValue = button.className.baseVal.replace('btn-', '')
        this.execBtn(buttonValue)
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
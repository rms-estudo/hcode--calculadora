class CalcController {
  constructor() {
    // this._  Indica atributo privado
    this._calcDisplayEl = document.querySelector('#display')
    this._calcDateEl = document.querySelector('#data')
    this._calcTimeEl = document.querySelector('#hora')

    this.locale = 'pt-BR'
    this._operation = []
    this._lastOperator = ''
    this._lastNumber = ''
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

  getResult() {
    return eval(this._operation.join(''))
  }

  calc() {
    let last = ''
    this._lastOperator = this.getLastItem()

    if (this._operation.length < 3) {
      let firstItem = this._operation[0]
      this._operation = [firstItem, this._lastOperator, this._lastNumber]
    }

    if (this._operation.length > 3) {
      last = this._operation.pop()
      this._lastNumber = this.getResult()

    } else if (this._operation.length === 3) {
      this._lastNumber = this.getResult(false)
    }

    console.log(this._lastOperator)
    console.log(this._lastNumber)

    let result = this.getResult()

    if (last === '%') {
      result /= 100
      this._operation = [result]

    } else {
      this._operation = [result]

      if (last) {
        this._operation.push(last)
      }
    }
    this.setLastNumberToDisplay()
  }

  pushOperation(value) {
    this._operation.push(value)

    if (this._operation.length > 3) {
      this.calc()
    }
  }

  getLastItem(isOperator = true) {
    let lastItem

    for (let i = this._operation.length - 1; i >= 0; i--) {

      if (this.isOperator(this._operation[i]) == isOperator) {
        lastItem = this._operation[i]
        break
      }

      if (!lastItem) {
        lastItem = (isOperator) ? this._lastOperator : this.lastNumber
      }

    }
    return lastItem
  }

  setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false)

    if (!lastNumber) {
      lastNumber = 0
    }

    this.displayCalc = lastNumber
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
        this.setLastNumberToDisplay()
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
    this.setLastNumberToDisplay()
  }

  clearEntry() {
    this._operation.pop()
    this.setLastNumberToDisplay()
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
        this.calc()
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

    this.setLastNumberToDisplay()
  }
}
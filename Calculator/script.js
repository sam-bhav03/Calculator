class Calculator{ //oop class just like in java
    constructor(previousOperandTextElement, currentOperandTextElement) { 
        // the constructors
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    // from here on, all these methods to be used in the calculator


    clear()
    {
        this.currentOperand  = ''
        this.previousOperand  = ''
        this.operation = undefined
    }

    delete(){
       this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    // this takes the parameter number(1-9)
    // the if makes sure the calculator doesnt take more than 1 '.'
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
         this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // we check if the strings are empty, if they are
    // we return nothing, which cancels the whole thing
    chooseOperation(operation)
    {
      if(this.currentOperand === '') return
      if (this.previousOperand !== '')
      {
        this.compute()
      }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand  = ''
    }


    compute()
    {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch(this.operation)
      {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '÷':
          computation = prev / current
          break
        case '*':
          computation = prev * current
          break
        default: 
        return 
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''

    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        
        this.previousOperandTextElement.innerText = this.previousOperand
    }    
}

//here the constant takes all the values from out HTML doc
// for e.g. numberButtons will take all the [data-number] from its attributes
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
//here we create an instance of our class with the pOTE and cOTE. 
// note that the values of pOTE and cOTe are recevied from the document.querySelector

//the forEach loop will ensure that all the numbers are selected
// addEventListener('click') will use the click function
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
      //just calling our methods
    })
  })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })


allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
        
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
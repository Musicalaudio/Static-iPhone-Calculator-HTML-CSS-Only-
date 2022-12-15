let buttons = document.querySelector(".calc__buttons");

buttons.addEventListener("click", event =>{
  const value = event.target.value;
  // console.log(value)
  if(!event.target.matches('button')){  
    return;
  }else{
    calculator.parseInput(value);
  }
});

/*the following is a calculator object which keeps track of the state of the calculator and it's encapsulates it's behaviour through methods*/
const calculator = {
  displayValue: "0",
  operator: "",
  firstVal: "",
  secondVal: "",

  parseInput(value){
    if(this.displayValue === "0"){
      this.displayValue = "";
    }
    switch(value){
      case "AC":
        this.clearAll();
        break;
      case "=":
        this.calcAnswer(this.displayValue);
        break;
      case "+/-":
        this.changeSign();
        break;
      default:
        this.addText(value);
    }
  }, 

  
  clearAll(){
    /*this sets the display value to 0, clears the total that kept track of the expression and set the output to 0 using the displayOutput method*/
    this.displayValue = "0";
    this.expression = "";
    this.displayOutput(this.displayValue)
  },

  addText(value){
    /*if value is a number*/
    // console.log("display val: " + this.displayValue)
    if(!isNaN(value)){
      this.displayValue += value;
      // console.log(this.displayValue.slice(-1))
      if(isNaN(this.displayValue.slice(-2))){
        this.firstVal = this.displayValue.slice(0, -2);  
        console.log(`first val: ${this.firstVal}`)
        this.displayValue
      }
    }
    else if(value === "%"){
      if(!isNaN(this.displayValue.slice(-1))){
        this.displayValue += value;
      }else{
        let valueWithNewOperand = this.displayValue.slice(0, -1) + value;
        this.displayValue = valueWithNewOperand;
      }
    }else{
      /*this will be used if value is an operand*/
        if(isNaN(this.displayValue.slice(-1)) && this.displayValue.slice(-1) !== "." && this.displayValue.slice(-1) !== "%"){
          let valueWithNewOperand = this.displayValue.slice(0, -1) + value;
          this.displayValue = valueWithNewOperand;
        }else{
          this.displayValue += value;
        }
    }
    this.displayOutput(this.displayValue);
  },
  
  
  addText(value){
    /*if value is a number*/
    if(!isNaN(value)){
      this.displayValue += value;
    /*if value is a decimal point*/
    }else if(value === "."){
      if(!isNaN(this.displayValue.slice(-1))){
        this.displayValue += value;
      }else{
        this.displayValue += "0."
      }
    }
    else if(value === "%"){
      if(!isNaN(this.displayValue.slice(-1))){
        this.displayValue += value;
      }else{
        let valueWithNewOperand = this.displayValue.slice(0, -1) + value;
        this.displayValue = valueWithNewOperand;
    }
    }else{
    /*this will be used if value is an operand*/
      if(isNaN(this.displayValue.slice(-1)) && this.displayValue.slice(-1) !== "." && this.displayValue.slice(-1) !== "%"){
        let valueWithNewOperand = this.displayValue.slice(0, -1) + value;
        this.displayValue = valueWithNewOperand;
      }else{
        this.displayValue += value;
      }
    }
    // console.log(this.displayValue);
    this.displayOutput(this.displayValue);
  },

  changeSign(){
    /*this is for when we click the "+/-" button and which means we want to change the change the sign for the display value*/
    this.displayValue *= -1;
    this.displayOutput(this.displayValue);
  },

  calcAnswer(equation){
    /*this Function constructor is an alternative to eval() which is deemed dangerous by the MDN*/
    let result = Function("return " + equation)();
    !(this.displayValue == 0) && this.displayOutput(result);
    this.prevTotal = result;
  },

  displayOutput(value){
    /*this just takes a value and sets the value attribute of the calc screen to that value argument*/
    document.querySelector(".calc__screen").value = value;
  },


}
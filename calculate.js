const display=document.querySelector('.calculator-screen');
const keys=document.querySelector('.calculator-keys');

let displayValue='0';/*görunen deger*/
let firstValue=null;/*ilk deger*/
let operator=null;
let waitingForSecondValue=false;/*ikinci deger için bekleniyor mu*/
const updateDisplay=()=>{
    display.value=displayValue;
}
keys.addEventListener('click',function(e){
    const element=e.target;
    let value=null;
    if(element.dataset.number){
      value=element.dataset.number;
    }else{
      value=element.dataset.event;
    }
    const valueNumber=element.dataset.number;
    const valueEvent=element.dataset.event;
    if(!element.matches('button')) return;/*element button değilse bundan sonraki kodlar çalışmaz return o demek*/
    switch(value){
        case '+':
        case '-':
        case '*': 
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
          case 'clear':
              clear();
              break;
          default:
              inputNumber(value);
    }
    updateDisplay();
    
});
const handleOperator=(nextOperator)=>{
    const value=parseFloat(displayValue);
    if(operator && waitingForSecondValue){
        operator=nextOperator;
        return;
    }
    if(firstValue===null){
        firstValue=value;

    }else if(operator){
        const result=calculate(firstValue,value,operator);
        displayValue=`${parseFloat(result.toFixed(7))}`;
        firstValue=result;
    }
    waitingForSecondValue=true;
    operator=nextOperator;
    console.log(displayValue,firstValue,operator,waitingForSecondValue)

}
const calculate=(first,second,operator)=>{
    if(operator==='+'){
        return first + second;
    }else if(operator ==='-'){
        return first - second;
    }else if(operator==='*'){
        return first * second
    }
    else if(operator ==='/'){
        return first / second
    }
}
const inputNumber=(num)=>{
    if(waitingForSecondValue){
        displayValue=num;
        waitingForSecondValue=false;
    }else{
      displayValue = displayValue ==='0' ? num : displayValue + num;
    }
    console.log(displayValue,firstValue,operator,waitingForSecondValue)
}
const inputDecimal=()=>{
    if(!displayValue.includes('.')){
        displayValue +='.';
    }
}
const clear=()=>{
    displayValue='0';
}

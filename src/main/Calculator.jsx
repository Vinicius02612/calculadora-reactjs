import React , {Component} from 'react'

import './Calculator.css'

import Button from '../Components/Button'
import Display from '../Components/Display'


//estado inicial do display
const initialState ={
       display: '0',
       clearDisplay: false,
       operation: null,
       value:[0,0],
       current: 0  
}   

export default class Calculator extends Component{

   state ={...initialState}

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOparation = this.setOparation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
       this.setState({...initialState}) 
       
    }

    setOparation(operation){
       if(this.state.current === 0){
           this.setState({operation, current: 1, clearDisplay : true})
       }else{
           const equals = operation === '0'
           const currentOperation = this.state.operation

           const values = [...this.state.values]
        

           try{
            values[0] = eval(`${values} ${currentOperation} ${values[1]}`)
           }catch{
               values[0] = this.state.values[0]
           }         
           values[1] = 0

           this.setState({
               display:values[0],
               operation:equals ? null : operation,
               current: equals? 0:1,
               clearDisplay: !equals,
               values

           })
       }
    }
    
    addDigit(n){
        //evitando que o user digite mais de um ponto (.) na calc

        if(n === '.' && this.state.display.includes('.')){
            return
        }

        //limpar o display pra  adicionar um novo digito ou quando ele tiver um digite diferente de 0
        const clear = this.state.display ==='0' || this.state.clearDisplay

        //se o display for limpo pegar o  valor '' se nao for recebe o valor atual do display
        
        const currentValue  = clear ?'':this.state.display

        //alterando o valor do display
        const display = currentValue + n
        this.setState({display, clearDisplay:false})

        // se for digitado algo diferente do '.'jogue-o no Array de values
        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(display)
            const values = [...this.state.value]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }

        

    }

    render(){       
        return(
            
            <div className = "calculator">
                    <Display value = {this.state.display}/>
                    <Button label = "AC" click ={this.clearMemory} triple/>
                    <Button label = "/" click ={this.setOparation} operation/>
                    <Button label = "7" click ={this.addDigit}/>
                    <Button label = "8" click ={this.addDigit}/>
                    <Button label = "9" click ={this.addDigit}/>

                    <Button label = "*" click ={this.setOparation} operation/>

                    <Button label = "4" click ={this.addDigit}/>
                    <Button label = "5" click ={this.addDigit}/>
                    <Button label = "6" click ={this.addDigit}/>

                    <Button label = "-" click ={this.setOparation} operation/>

                    <Button label = "1" click ={this.addDigit}/>
                    <Button label = "2" click ={this.addDigit}/>
                    <Button label = "3" click ={this.addDigit}/>

                    <Button label = "+" click ={this.setOparation} operation/>

                    <Button label = "0" click ={this.addDigit} double/>

                    <Button label = "." click ={this.addDigit}  />
                    <Button label = "=" click ={this.setOparation} operation/>
            </div>

        )
    }
     
    
}
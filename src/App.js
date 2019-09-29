import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import './App.css'
class Loan extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      loanamount:500,
      month:6,   
    }
    this.changeLoanAmount=this.changeLoanAmount.bind(this)
    this.changeMonth=this.changeMonth.bind(this)
  }// end constructor
  changeLoanAmount(amount){
    console.log(amount)
    this.setState(
    {
      loanamount:amount
    })
  }
  changeMonth(month){
    this.setState(
    {
      month:month
    })
  }
    

  render()
  { console.log(this.state.loanamount)
      return(
        <div>
          <InputPart loanamount={this.state.loanamount} 
            month={this.state.month}
            changeLoanAmount={this.changeLoanAmount}
            changeMonth={this.changeMonth}>
          </InputPart>
          <OutputPart loanamount={this.state.loanamount} 
            month={this.state.month}
            changeLoanAmount={this.changeLoanAmount}
            changeMonth={this.changeMonth}>
          </OutputPart>
          <Sidebar loanamount={this.state.loanamount} 
            month={this.state.month}
            changeLoanAmount={this.changeLoanAmount}
            changeMonth={this.changeMonth}>
          </Sidebar>
        </div>
      )
  }
}

class InputPart extends React.Component{
    constructor(props){
    super(props);
    this.handleAmountSliderChange=this.handleAmountSliderChange.bind(this)
    this.handleMonthSliderChange=this.handleMonthSliderChange.bind(this)
        this.handleAmountSliderValue=this.handleAmountSliderValue.bind(this)
    this.handleMonthSliderValue=this.handleMonthSliderValue.bind(this)
    this.state={sliderLoanAmount:500,sliderMonth:6}

  }

  handleAmountSliderChange(event,value){
    console.log(value)
    this.props.changeLoanAmount(value)

}
handleMonthSliderChange(event,value){
    this.props.changeMonth(value)

}
handleAmountSliderValue(event,value){
    this.setState({sliderLoanAmount:value}) 

}
handleMonthSliderValue(event,value){

    this.setState({sliderMonth:value}) 

}
componentDidUpdate(prevProps){
    if(this.props.loanamount !== prevProps.loanamount || this.props.month !== prevProps.month)
    {
      this.setState({sliderLoanAmount:this.props.loanamount,sliderMonth:this.props.month}) 
    }

  }

  render(){
    return(
      <div className="root">
      <Typography id="input-slider" gutterBottom>
        Loan Amount
      </Typography>
      <Slider className="slider" valueLabelDisplay="on" value={this.state.sliderLoanAmount} onChange={this.handleAmountSliderValue}   onChangeCommitted={this.handleAmountSliderChange} defaultValue={500} max={5000} min ={500}/>
      <Typography id="input-slider" gutterBottom>
        Number of months
      </Typography>
      <Slider className="slider" valueLabelDisplay="on" value={this.state.sliderMonth} onChange={this.handleMonthSliderValue} onChangeCommitted={this.handleMonthSliderChange} defaultValue={6} max={24} min ={6}/>
      
    </div>)
  }
  
}


class OutputPart extends React.Component{
    constructor(props){
    super(props);
    this.state={result:{}}


  }
  
  componentDidUpdate(prevProps){
    if(this.props.loanamount !== prevProps.loanamount || this.props.month !== prevProps.month)
    {
    fetch("https://ftl-frontend-test.herokuapp.com/interest?amount="+this.props.loanamount+"&numMonths="+this.props.month)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({result:result})
          console.log(this.state)
        }
      );
    }

  }
  componentDidMount(){
  
    fetch("https://ftl-frontend-test.herokuapp.com/interest?amount="+this.props.loanamount+"&numMonths="+this.props.month)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({result:result})
          console.log(this.state)
        }
      );
    

  }



  render(){
    return(
      <div className="root">
      <p>{this.state.result.numPayments}</p>
      <p>{this.state.result.interestRate}</p>

    </div>)
  }
  
}
class Sidebar extends React.Component{
    constructor(props){
    super(props);

    console.log(this.props)
    this.state={oldvalues:{},keyofdic:[]}
    console.log(this.state)
    this.changeInput=this.changeInput.bind(this)


  }
  changeInput(loanamount,month)
  {
    this.props.changeLoanAmount(loanamount);
    this.props.changeMonth(month)
  }
  
  componentDidUpdate(prevProps){
    if(this.props.loanamount !== prevProps.loanamount || this.props.month !== prevProps.month)
    { if(!this.state.keyofdic.includes(prevProps.loanamount))
      {
        this.state.keyofdic.push(prevProps.loanamount)
        this.state.keyofdic.sort(function(a, b){return a-b})
        console.log(this.state.keyofdic)
        var tempObj={}
        tempObj[prevProps.loanamount]=[]
        Object.assign(this.state.oldvalues,tempObj)
        this.state.oldvalues[prevProps.loanamount].push(prevProps.month)
          this.state.oldvalues[prevProps.loanamount].sort(function(a, b){return a-b})
          this.forceUpdate()
      }
      else
      {
        if(!this.state.oldvalues[prevProps.loanamount].includes(prevProps.month))
        {
          this.state.oldvalues[prevProps.loanamount].push(prevProps.month)
          this.state.oldvalues[prevProps.loanamount].sort(function(a, b){return a-b})
          this.forceUpdate()
        }
      }
      console.log(this.state.oldvalues)
    }


  }
  


  render(){
    console.log(this.state.keyofdic)

    return(
     <div> 
        {this.state.keyofdic.map(item => <SomeComponent key={item} id={item} items={this.state.oldvalues[item]} changeInput={this.changeInput}/> )}
    </div>)
  }
  
}
class SomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.buttonclick=this.buttonclick.bind(this)
  }
  buttonclick(month){
    this.props.changeInput(this.props.id,month)
  }
  render() {
    var listItems = this.props.items.map(item => {
      return (
        
          <Fab color="secondary" aria-label="edit"  onClick={e => this.buttonclick(item)}>
        {item}
      </Fab>
        
      );
    });

    return(
    <div>
    <div>{this.props.id}</div>
    <ul>
          {listItems}
        </ul></div>)
  }
}
export default Loan
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
  constructor(props) {
    super(props);
    this.state = {
      loanamount: 500,
      month: 6,
    }
    this.changeLoanAmount = this.changeLoanAmount.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
  }// end constructor
  changeLoanAmount(amount) {
    console.log(amount)
    this.setState(
      {
        loanamount: amount
      })
  }
  changeMonth(month) {
    this.setState(
      {
        month: month
      })
  }


  render() {
    console.log(this.state.loanamount)
    return (
      <div>

        <div class="main">
          <div class="panel panel-default">
            <div class="panel-body-content">
              <InputPart loanamount={this.state.loanamount}
                month={this.state.month}
                changeLoanAmount={this.changeLoanAmount}
                changeMonth={this.changeMonth}>
              </InputPart>
            </div>
          </div>

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
      </div>
    )
  }
}

class InputPart extends React.Component {
  constructor(props) {
    super(props);
    this.handleAmountSliderChange = this.handleAmountSliderChange.bind(this)
    this.handleMonthSliderChange = this.handleMonthSliderChange.bind(this)
    this.handleAmountSliderValue = this.handleAmountSliderValue.bind(this)
    this.handleMonthSliderValue = this.handleMonthSliderValue.bind(this)
    this.state = { sliderLoanAmount: 500, sliderMonth: 6 }

  }

  handleAmountSliderChange(event, value) {
    console.log(value)
    this.props.changeLoanAmount(value)

  }
  handleMonthSliderChange(event, value) {
    this.props.changeMonth(value)

  }
  handleAmountSliderValue(event, value) {
    this.setState({ sliderLoanAmount: value })

  }
  handleMonthSliderValue(event, value) {

    this.setState({ sliderMonth: value })

  }
  componentDidUpdate(prevProps) {
    if (this.props.loanamount !== prevProps.loanamount || this.props.month !== prevProps.month) {
      this.setState({ sliderLoanAmount: this.props.loanamount, sliderMonth: this.props.month })
    }

  }

  render() {
    return (
      <div>
        <div class="panel-container">
          <table>
            <body>
              <tr>
                <td>
                  <div class="labelStyle">Select Loan amount</div>
                </td>
                <td class="tdStyles">
                  <Slider className="slider" valueLabelDisplay="on" value={this.state.sliderLoanAmount} onChange={this.handleAmountSliderValue} onChangeCommitted={this.handleAmountSliderChange} defaultValue={500} max={5000} min={500} />
                </td>
              </tr>
              <tr>
                <td>
                  <div class="labelStyle">Number of months</div>
                </td>
                <td class="tdStyles">
                  <Slider className="slider" valueLabelDisplay="on" value={this.state.sliderMonth} onChange={this.handleMonthSliderValue} onChangeCommitted={this.handleMonthSliderChange} defaultValue={6} max={24} min={6} />
                </td>
              </tr>
            </body>
          </table>
          <div>
          </div>

        </div>
      </div>
    )
  }

}


class OutputPart extends React.Component {
  constructor(props) {
    super(props);
    this.state={loanamount:null,interestRate:null,duration:null,monthlyPayment:null}


  }
  
  componentDidUpdate(prevProps){
    if(this.props.loanamount !== prevProps.loanamount || this.props.month !== prevProps.month)
    {
    fetch("https://ftl-frontend-test.herokuapp.com/interest?amount="+this.props.loanamount+"&numMonths="+this.props.month)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({loanamount:result.principal.amount,interestRate:result.interestRate,duration:result.numPayments,monthlyPayment:result.monthlyPayment.amount })

        }
      );
    }

  }
  componentDidMount(){
  
    fetch("https://ftl-frontend-test.herokuapp.com/interest?amount="+this.props.loanamount+"&numMonths="+this.props.month)
      .then(res => res.json())
      .then(
        (result) => {
           this.setState({loanamount:result.principal.amount,interestRate:result.interestRate,duration:result.numPayments,monthlyPayment:result.monthlyPayment.amount })

        }
      );
    

  }



  render(){
    return(
      <div className="root">
      <p>{this.state.duration}</p>
      <p>{this.state.interestRate}</p>
      <p>{this.state.loanamount}</p>
      <p>{this.state.monthlyPayment}</p>

    </div>)
  }

  render() {
    return (
      <div >
        <div class="panel panel-default">
          <div class="panel-body-content">
            <div class="panel-container">
              <table>
                <body>
                  <tr>
                    <td>
                      <div class="labelStyle">Number of Payments</div>
                    </td>
                    <td class="tdStyles">
                      {this.state.duration}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="labelStyle">Interest Rate</div>
                    </td>
                    <td class="tdStyles">
                      {this.state.interestRate}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="labelStyle">Loan Amount</div>
                    </td>
                    <td class="tdStyles">
                      {this.state.loanamount}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="labelStyle">Monthly Payments</div>
                    </td>
                    <td class="tdStyles">
                      {this.state.monthlyPayment}
                    </td>
                  </tr>
                </body>
              </table>
              <div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props)
    this.state = { oldvalues: {}, keyofdic: [] }
    console.log(this.state)
    this.changeInput = this.changeInput.bind(this)


  }
  changeInput(loanamount, month) {
    this.props.changeLoanAmount(loanamount);
    this.props.changeMonth(month)
  }

  componentDidUpdate(prevProps) {
    if (this.props.loanamount !== prevProps.loanamount || this.props.month !== prevProps.month) {
      if (!this.state.keyofdic.includes(prevProps.loanamount)) {
        this.state.keyofdic.push(prevProps.loanamount)
        this.state.keyofdic.sort(function (a, b) { return a - b })
        console.log(this.state.keyofdic)
        var tempObj = {}
        tempObj[prevProps.loanamount] = []
        Object.assign(this.state.oldvalues, tempObj)
        this.state.oldvalues[prevProps.loanamount].push(prevProps.month)
        this.state.oldvalues[prevProps.loanamount].sort(function (a, b) { return a - b })
        this.forceUpdate()
      }
      else {
        if (!this.state.oldvalues[prevProps.loanamount].includes(prevProps.month)) {
          this.state.oldvalues[prevProps.loanamount].push(prevProps.month)
          this.state.oldvalues[prevProps.loanamount].sort(function (a, b) { return a - b })
          this.forceUpdate()
        }
      }
      console.log(this.state.oldvalues)
    }


  }



  render() {
    console.log(this.state.keyofdic)

    return (
      <div class="sidenav">

        {this.state.keyofdic.map(item => <SomeComponent key={item} id={item} items={this.state.oldvalues[item]} changeInput={this.changeInput} />)}
      </div>)
  }

}
class SomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.buttonclick = this.buttonclick.bind(this)
  }
  buttonclick(month) {
    this.props.changeInput(this.props.id, month)
  }
  render() {
    var listItems = this.props.items.map(item => {
      return (

        <Fab color="secondary" className="button-margin" aria-label="edit" onClick={e => this.buttonclick(item)}>
          {item}
        </Fab>

      );
    });

    return (
        <div class="card">
          <div class="container">
            <h4><b>Loan Amount:{this.props.id}</b></h4>
            <p>Other info</p>
            {listItems}
          </div>


      </div>
    )
  }
}
export default Loan

import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class Main extends React.Component {

  constructor(props) {
    super();
    this.state = {
      savings: 0,
      interestRate: 0,
      interestEarned: 0,
    }
    this.calculate = this.calculate.bind(this);
    this.updateSavings = this.updateSavings.bind(this);
    this.updateInterest = this.updateInterest.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.getExchangeRate = this.getExchangeRate.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    console.log('component did mount');
    this.getCurrencies();
  }

  calculate() {

    let interestEarnedvar = (this.state.interestRate / 100) * this.state.savings;

    this.setState({
      interestEarned: interestEarnedvar,
      interestEarnedPerMonth: interestEarnedvar / 12
    })

    this.state.currency ? this.getExchangeRate(this.state.currency) : null;


  };

  changeCurrency(event) {
    console.log(event.target.value, " is this peoacjdicjadc");

    let currency = event.target.value;

    this.getExchangeRate(currency);


  }
  getExchangeRate(currency) {
    axios.get("http://reactappserver.herokuapp.com/convert?to=" + currency + "&amount=" + this.state.savings).then( res => {
      console.log(res);

      this.setState({
        currency: currency,
        amountInCurrency: res.data.rate * this.state.interestEarned,
        amountInCurrencyPerMonth: this.state.amountInCurrency / 12
      })
    });
  }

  getCurrencies() {
    axios.get("http://reactappserver.herokuapp.com/getAllCurrencies").then( res => {
      console.log(res, "currencies");
      this.setState({
          allCurrencies: res.data.countries
      });
    });
  }

  updateSavings(event) {
    this.setState({savings: event.target.value});
  }
  updateInterest(event) {
    this.setState({
      interestRate: event.target.value
    })
  }


  render() {
    return (
      <div>
        <form>
          Please Enter Total Savings <input type="text" name="savings"
                                            onChange={this.updateSavings}/>
          <br/>
          Please Enter Interest Rate <input type="text" name="interest"
            onChange={this.updateInterest}
        />
        </form>
        <button onClick={this.calculate}>
          Calculate Interest
        </button>
        <div className="firstRowDiv">Total Interest earned {this.state.interestEarned} / Year</div>
        <div className="firstRowDiv">Total Interest earned {this.state.interestEarnedPerMonth} / Month</div>
        <select name="currencies" onChange={this.changeCurrency}>
          <option value="Select">Select Currency</option>
          {this.state.allCurrencies ?
            this.state.allCurrencies.map(curr => {
              return(<option key={curr}> {curr} </option>)
            }
          ) : null}
        </select>
        {this.state.currency ?
          <div className="secondRowDiv">
             <div>Total Interest earned in {this.state.currency} are {this.state.amountInCurrency ? this.state.amountInCurrency : 0 } / Year</div>
             <div>Total Interest earned in {this.state.currency} are {this.state.amountInCurrency ? this.state.amountInCurrency/12 : 0} / Month</div>
          </div>
           : null}

      </div>
    )
  }
}




ReactDOM.render(<Main />, document.getElementById('root'))

import React, { Component } from 'react';
import {decorate, observable} from "mobx";
import {observer} from "mobx-react"
import {configure} from "mobx"
import {action} from "mobx"
import {computed} from "mobx"

configure({enforceActions: "observed"})

class LocalData {
  /*
   Expense format
   { detail: "", value: 0}
   */
  expenseList = []

  clearList() {
    this.expenseList = []    
  }

  pushExpense(e) {
    this.expenseList.push(e)
  }

  get totalExpenses() {
    let sum=0
    this.expenseList.map(e => sum=parseFloat(sum)+parseFloat(e.value))
    return parseFloat(sum).toFixed(2)
  }  
}

decorate(LocalData, {
  expenseList: observable,
  clearList: action,
  pushExpense: action,
  totalExpenses: computed
})

const appLocalData = new LocalData()

const Row = props => {
  return (
    <tr>
      <td>{props.data.detail}</td>
      <td>{props.data.value}</td>
    </tr>
  )
}

class Table extends Component {
  render() {
    const { localData } = this.props
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Detail:</td>
              <td>Value:</td>
            </tr>
          </thead>
          <tbody>
            {localData.expenseList.map((e,i) =>
              <Row
                key={i}
                data={e}
              />
            )}
          </tbody>
          <tfoot>
            <tr>
              <td>TOTAL EXPENSES:</td>
              <td>{localData.totalExpenses}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

Table = observer(Table)

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      detail:'',
      value:''
    }      
    this.handleDetailChange = this.handleDetailChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleDetailChange(event) {
    this.setState({detail: event.target.value})
  }

  handleValueChange(event) {
    this.setState({value: event.target.value})
  }

  handleSave(event) {
    const detail = this.state.detail
    const value = parseFloat(this.state.value).toFixed(2)
    //alert('Detail: ' + detail + '\nValue: ' + value)
    this.props.dataHandler.pushExpense( {detail, value} )
    event.preventDefault()
  }

  handleClear() {
    this.props.dataHandler.clearList()
  }
    
  render() {
    const style = {
      margin: '10px',
      padding: '10px',
      border: '2px solid #ccc',
      borderCollapse: 'collapsed',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px'
    }
    return (
      <div style={style}>
        <form>
          <div>
            <div>
              <label>
                Detail:
                <input type="text" 
                      value={this.state.detail} 
                      onChange={this.handleDetailChange} />
              </label>
            </div>
            <div>
              <label>
                Value:
                <input type="text" 
                      value={this.state.value} 
                      onChange={this.handleValueChange} />
              </label>
            </div>
            <button onClick={this.handleSave}>Save</button>
            <button onClick={this.handleClear}>Clear</button>
          </div>
        </form>
      </div>
    )
  }   
}

class App extends Component {
  render() {
    const divLeft = {
      width: '25%',
      //height: '200px',
      float: 'left'
    }
    const divRight = {
      marginLeft: '25%'
      //height: '200px',
      //background: 'black'
    }
    return (
      <div>
        <h1>My Mobx Tables</h1>
        <section>
          <div style={divLeft}>
          <Form dataHandler={appLocalData}/>
          </div>
          <div style={divRight}>
          <Table localData={appLocalData}/>        
          </div>
        </section>
      </div>
    )
  }
}

export default App;
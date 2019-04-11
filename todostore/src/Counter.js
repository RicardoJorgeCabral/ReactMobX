import React, { Component } from 'react';
import {decorate, observable} from "mobx";
import {observer} from "mobx-react"
import {configure} from "mobx"
import {action} from "mobx"

configure({enforceActions: true})

class Counter {
  count = 0

  inc = () => {
    this.count++
  }

  dec = () => {
    this.count--
  }
}

decorate(Counter, {
  count: observable,
  inc: action,
  dec: action
})

const appCounter = new Counter()

class CounterComponent extends Component  {
  render() {
    const { counter } = this.props
    return (
      <div>
        Counter: {counter.count}<br />
        <button onClick={counter.dec}>-</button>
        <button onClick={counter.inc}>+</button>
      </div>
    )
  }
}

CounterComponent = observer(CounterComponent)

class App extends Component {
  render() {
    return (
      <div>        
        <CounterComponent counter={appCounter}/>
      </div>
    );
  }
}


export default App;
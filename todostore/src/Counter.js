import React from 'react';
import {decorate, observable} from "mobx";


class Counter extends React.Component {
  count = 0;

  handleDec = () => {
    this.count--;
  }

  handleInc = () => {
    this.count++;

  }
  render() {
    return (
      <div>
        Counter: {this.count}<br />
        <button onClick={this.handleDec}>-</button>
        <button onClick={this.handleInc}>+</button>
      </div>
    )
  }  
}

decorate(Counter, {
  count: observable
})

export default Counter;
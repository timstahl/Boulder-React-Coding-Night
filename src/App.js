import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Button from './Button.js';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {count: 0, index: 0, sequence: [0,1,3], playersTurn: false}
  }
  
  youLose(){
    this.setState({count: 0, index: 0, sequence: [], playersTurn: false})
  }

  nextSeq() {
    //increment count and seq and lightup
  }

  onButtonClick(btn){
    if (btn == this.state.sequence[this.state.index]){
      let index = this.state.index + 1
      this.setState({index: index})
      if(index == this.state.sequence.length) {
        nextSeq()
      }
    } 
    else{
      youLose()
    }
  }

  render() {
    return (
      <div className="App">
        <Button onClick={()=>this.onButtonCLick(0)} />
        <Button onClick={()=>this.onButtonCLick(1)} />
        <Button onClick={()=>this.onButtonCLick(2)} />
        <Button onClick={()=>this.onButtonCLick(3)} />
        <Start />
        <Counter />
      </div>
    );
  }
}
check index vs sequence, light up
need an onclick tht passes down to button, checks sequence, start that init sequence
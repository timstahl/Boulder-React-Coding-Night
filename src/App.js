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
    let x = Math.ceil(4*Math.random());
    let nextSequence = this.state.sequence.push(x);
    this.setState({count: 0, index: 0, sequence: nextSequence, playersTurn: false});
    startComputerPlay();
  }

  startComputerPlay() {
    setTimeout(()=>{ incrementCount(); },500);
  }

  incrementCount() {
    if(this.state.count < this.state.sequence.length*2) {
      this.setState({count: this.state.count+1});
      setTimeout(()=>{ incrementCount(); },500);
    }
    
  }
  
  onButtonClick(btn){
    if (btn == this.state.sequence[this.state.index]){
      let index = this.state.index + 1
      this.setState({index: index})
      if(index == this.state.sequence.length) {
        nextSeq();
      }
    } 
    else{
      youLose()
    }
  }

  render() {
    let activeButton = -1;
    if(this.state.count%2 ==0 && this.state.count < this.state.sequence.length*2 )
      activeButton = this.state.sequence[this.state.count/2];
    return (
      <div className="App">
        <Button id={activeButton == 0 ? 'B1_on' : 'B1_off'} onClick={()=>this.onButtonCLick(0)} />
        <Button id={activeButton == 1 ? 'B1_on' : 'B1_off'} onClick={()=>this.onButtonCLick(1)} />
        <Button id={activeButton == 2 ? 'B1_on' : 'B1_off'} onClick={()=>this.onButtonCLick(2)} />
        <Button id={activeButton == 3 ? 'B1_on' : 'B1_off'} onClick={()=>this.onButtonCLick(3)} />
        <Start />
        <Counter />
      </div>
    );
  }
}
// check index vs sequence, light up
// need an onclick tht passes down to button, checks sequence, start that init sequence
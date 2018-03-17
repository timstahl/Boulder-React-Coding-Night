import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Button from './Button.js';

export default class App extends Component {

	constructor(props){
		super(props);
		this.state = {count: -1, index: 0, sequence: [], playersTurn: false, buttonPressed: -1}

		// create web audio api context
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	}

	playTone(f) {
		let oscillator = this.audioCtx.createOscillator();
		oscillator.connect(this.audioCtx.destination);
		oscillator.frequency.setValueAtTime(f, this.audioCtx.currentTime);
		oscillator.start();
		setTimeout(()=>{ oscillator.stop(); },250);
	}


  youLose(){
    this.setState({count: -1, index: 0, sequence: [], playersTurn: false})
	  let oscillator = this.audioCtx.createOscillator();
	  oscillator.connect(this.audioCtx.destination);
	  oscillator.frequency.value = 880;
		  setTimeout(()=>{ oscillator.start();} ,400);
		  for(let i = 1; i < 6; ++i)
			  setTimeout(()=>{ oscillator.frequency.value = 800-100*i;} ,400+100*i);
	  setTimeout(()=>{ oscillator.stop(); },1000);
  }

  nextSeq() {
    //increment count and seq and lightup
    let x = Math.floor(4*Math.random());
    this.state.sequence.push(x);
    this.setState({count: 0, index: 0, sequence: this.state.sequence, playersTurn: false});
    this.startComputerPlay();
  }

  startComputerPlay() {
    setTimeout(()=>{ this.incrementCount(); },500);
  }

  incrementCount() {
    if(this.state.count < this.state.sequence.length*2) {
      this.setState({count: this.state.count+1});
      setTimeout(()=>{ this.incrementCount(); },500);
    }

  }

	onButtonClick(btn){
    this.setState({buttonPressed: btn});
    setTimeout(() => {this.setState({buttonPressed:-1});}, 500);

    if (btn == this.state.sequence[this.state.index]){
      let index = this.state.index + 1
      this.setState({index: index})
      if(index == this.state.sequence.length) {
        // We can start the next play, after a small delay.
        setTimeout(() =>this.nextSeq(), 1500);
      }
    }
    else{
      console.log('bad');
      this.youLose()
    }
  }

  render() {
    let count = this.state.sequence.length;
	  let activeButton = -1;
	  if(this.state.count%2 === 0 && this.state.count < this.state.sequence.length*2 )
		  activeButton = this.state.sequence[this.state.count/2];
		if(activeButton >= 0)
		  this.playTone(110*(4+activeButton));
		if(this.state.buttonPressed >= 0)
			this.playTone(110*(4+this.state.buttonPressed));
	  return (
		  <div>
        <div className="controls">
          <button className="controls-start" onClick={() => {this.nextSeq()}}>Start</button>
          <span className="controls-count">{count}</span>
        </div>

			  <div className="app">
				  <Button id="a" isActive={activeButton === 0 || this.state.buttonPressed === 0} onClick={()=>this.onButtonClick(0)} />
				  <Button id="b" isActive={activeButton === 1 || this.state.buttonPressed === 1} onClick={()=>this.onButtonClick(1)} />
				  <Button id="c" isActive={activeButton === 2 || this.state.buttonPressed === 2} onClick={()=>this.onButtonClick(2)} />
				  <Button id="d" isActive={activeButton === 3 || this.state.buttonPressed === 3} onClick={()=>this.onButtonClick(3)} />

				  {/*<Start />*/}
			  </div>
		  </div>
    );
  }
}
// check index vs sequence, light up
// need an onclick tht passes down to button, checks sequence, start that init sequence
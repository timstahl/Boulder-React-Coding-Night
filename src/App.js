import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Button from './Button.js';

const tones = [
  '/audio/tone-0.mp3',
  '/audio/tone-1.mp3',
  '/audio/tone-2.mp3',
  '/audio/tone-3.mp3'
];

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {count: -1, index: 0, sequence: [], playersTurn: false, buttonPressed: -1}
  }

  componentDidMount() {
    this.tones = tones.map(src => {
      const audio = document.createElement('audio');
      audio.src = src;
      return audio;
    });
  }

  youLose(){
    this.setState({count: -1, index: 0, sequence: [], playersTurn: false})
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
    this.tones[btn].play();
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
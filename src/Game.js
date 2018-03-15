import React, { Component } from 'react';
import './Game.css';
import _ from 'lodash';


const Stars = ({ numberOfStars }) => {
  let starArr = [];

  for (let i = 0; i < numberOfStars; i++) {
    starArr.push(<i key={i} className="fa fa-star"></i>);
  }

  return (
    <div>
      {starArr}
    </div>
  )
}

const Button = ({ selectedNumbers, checkAnswer, answerIsCorrect, acceptAnswer, redraw, redrawsRemaining }) => {
  let button;
  switch (answerIsCorrect) {
    case true:
      button = <button onClick={acceptAnswer}><i className="fa fa-check"></i></button>
      break;
    case false:
      button = <button><i className="fa fa-times"></i></button>
      break;
    default:
      button = <button
        disabled={selectedNumbers.length === 0}
        onClick={checkAnswer}
      >
        =
      </button>
  }
  return (
    <div className="buttons">
      {button}
      <button onClick={redraw}>
        <i className="fa fa-refresh"></i> {redrawsRemaining}
      </button>
    </div>
  )
}

const Answer = ({ selectedNumbers, unselectNumber }) => {
  return (
    <div>
      {selectedNumbers.map((number, i) =>
        <span
          key={i}
          onClick={() => unselectNumber(number)}
        >
          {number}
        </span>
      )}
    </div>
  )
}

const Numbers = ({ selectedNumbers, selectNumber, usedNumbers }) => {
  const numberClassName = (number) => {
    if (selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
    if (usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
  }
  return (
    <div>
      <div>
        {Numbers.list.map((number, i) =>
          <span
            key={i}
            className={numberClassName(number)}
            onClick={() => selectNumber(number)}
          >
            {number}
          </span>
        )}
      </div>
    </div>
  )
}
Numbers.list = _.range(1, 10);

const DoneFrame = ({ doneStatus }) => {
 return (
   <div>
     <h3>{doneStatus}</h3>
   </div>
 )
}


class Game extends Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random()*9),
    answerIsCorrect: null,
    usedNumbers: [],
    redrawsRemaining: 5,
    doneStatus: null
  }

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
      answerIsCorrect: null
    }));
  }

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clickedNumber
      )
    }));
  }

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce(
        (accumulator, num) => accumulator + num, 0
      )
    }));
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      answerIsCorrect: null,
      selectedNumbers: [],
      numberOfStars: 1 + Math.floor(Math.random()*9)
    }), this.updateDoneStatus);
  }

  redraw = () => {
    if (this.state.redrawsRemaining === 0) { return; }
    this.setState(prevState => ({
      numberOfStars: 1 + Math.floor(Math.random()*9),
      answerIsCorrect: null,
      selectedNumbers: [],
      redrawsRemaining: prevState.redrawsRemaining - 1
    }), this.updateDoneStatus);
  }

  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );

    const possibleCombinationSum = function(arr, n) {
      if (arr.indexOf(n) >= 0) { return true; }
      if (arr[0] > n) { return false; }
      if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
      }
      var listSize = arr.length, combinationsCount = (1 << listSize)
      for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
          if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
      }
      return false;
    };

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (this.state.usedNumbers.length === 9) {
        return { doneStatus: 'You win!' };
      }
      if (this.state.redrawsRemaining === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game over' };
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Play 9 Game</h1>
        <div className="row">
          <Stars numberOfStars={this.state.numberOfStars} />
          <Button
            selectedNumbers={this.state.selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={this.state.answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redrawsRemaining={this.state.redrawsRemaining}
          />
          <Answer
            selectedNumbers={this.state.selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <Numbers
          selectedNumbers={this.state.selectedNumbers}
          selectNumber={this.selectNumber}
          usedNumbers={this.state.usedNumbers}
        />
        <DoneFrame doneStatus={this.state.doneStatus} />
      </div>
    );
  }
}

export default Game;

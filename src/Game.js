import React, { Component } from 'react';
import _ from 'lodash';


const Stars = (props) => {
  const numberOfStars = 1 + Math.floor(Math.random()*9);
  let starArr = [];

  for (let i = 0; i < numberOfStars; i++) {
    starArr.push(<i className="fa fa-star"></i>);
  }

  return (
    <div>
      {starArr}
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button>=</button>
    </div>
  )
}

const Answer = (props) => {
  return (
    <div>
      ...
    </div>
  )
}

const Numbers = (props) => {
  const numberArray = _.range(1, 10);
  console.log(numberArray);
  return (
    <div>
      <div>
        <span className="selected">1</span>
        <span className="used">2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
    </div>
  )
}

class Game extends Component {
  render() {
    return (
      <div className="container">
        <h1>Play 9 Game</h1>
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <Numbers />
      </div>
    );
  }
}

export default Game;

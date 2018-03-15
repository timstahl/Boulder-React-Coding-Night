# Start
* CLONE REPO
* OPEN CODE
* RUN PROJECT
* OPEN BROWSER
* Open src/App.js
* Import Font Awesome: `import 'font-awesome/css/font-awesome.min.css';`
* Remove everything inside the <div>
* Add a <Game /> component inside the <div>
* Import the <Game /> component: `import Game from './Game';`


# Make a Game component
* Create a new file called Game.js
* Import React: `import React, { Component } from 'react';`
* Export the Game: `export default Game;`
* Add a Game class: `class Game extends Component {}`
* Inside the curly braces, add a render method: `render() {}`
* Inside those curly braces, return a <div>: `return (<div></div>)`
* Give the <div> a className of container: `<div className=”container”>`
* Add a heading to the <div>: `<h3>Play 9 Game</h3>`
* Check the browser


# Make some functional components
* Above the Game, create a Stars functional component: `const Stars = () => {}`
* Add props as a parameter (props)
* Return a <div>: `return (<div></div>)`
* Add some temporary text inside the <div>
* Add <Stars /> under the <h3> heading inside the Game component
* Make a Button component just like Stars
* Give its <div> a className of buttons: `<div className=”buttons”>`
* Make an Answer component just like Stars
* Add <Button />, <Answer />, & <Numbers /> under <Stars /> inside the Game component
* Check the browser
* Wrap first 3 functional components in a <div>
* Give the <div> a className of row: `<div className=”row”>`


# Fill in the functional components
* Inside the Stars component:
* Replace the text with a star icon: `<i className="fa fa-star"></i>`
* Make a few more star icons
* Inside the Button component:
* Add a <button> element: `<button></button>`
* Give it a value of =
* Inside the Numbers component:
* Add a new <div>
* Add <span>s inside this <div> for numbers 1 through 9: `<span>1</span>`


# Give the stars a random value
* Inside the Stars component (before return):
* Add a numberOfStars: `const numberOfStars = 5;`
* Add an empty stars array: `let starArr = [];`
* Use a for loop to iterate numberOfStars times: `for (let i = 0; i < numberOfStars; i++) {}`
* Use the push method on the starArr: `starArr.push();`
* Add a star icon element inside the push method: `<i className="fa fa-star"></i>`
* Add a key of i to the element: `<i key={i}`
* In the returned <div>, remove the star icons and add the starArr: `{starArr}`
* Set the value of numberOfStars to a random number (1-9): `1 + Math.floor(Math.random() * 9)`


# Give Numbers an array of numbers
* Immediately after the Numbers component:
* Add a list of numbers to the component as a property: `Numbers.list = `
* Set the list equal to a range of numbers (1-9) using lodash: `= _.range(1, 10);`
* Inside the Numbers component:
* In the returned <div>, remove the spans and map over the list: `{Numbers.list.map((number, i) => )}`
* In the block of the arrow function, add a <span> and pass in the number: `<span>{number}</span>`
* Give the <span> a key of i: `<span key={i}>`


# Add selected numbers
* Inside the Game component (above render):
* Add state: `state = {}`
* Give state a selectedNumbers property as an empty array: `selectedNumbers: []`
* Add some numbers to the array for dummy data: `[4, 2]`
* Pass the selectedNumbers into the <Answer /> component: `<Answer selectedNumbers={this.state.selectedNumbers} />`
* Inside the Answer component:
* Pass in selectedNumbers as a destructured prop: `({ selectedNumbers })`
* Remove the dummy text inside the returned <div>
* Map over the selectedNumbers: `{selectedNumbers.map((number, i) => )}`
* Return a <span> with a key and a number: `<span key={i}>{number}</span>`
* In Game, pass selectedNumbers to the <Numbers /> component (as above)
* Inside the Numbers component:
* Pass in selectedNumbers as a destructured prop: `({ selectedNumbers })`
* Give the <span> a className equal to a code block: `classname={}`
* Pass in a function called numberClassName, and pass a number into that: `{numberClassName(number)}`
* Above the return, declare this function (remember to pass in the number): `const numberClassName = (number) => {}`
* Inside the function, add conditional logic to see if the number is included in the selectedNumbers: `if (selectedNumbers.indexOf(number) >= 0) {}`
* If so, return ‘selected’ as the class: `return ‘selected’;`
* In Game, below state, add a selectNumber method: `selectNumber = () => {}`
* Pass in a clickedNumber: `(clickedNumber)`
* In the code block, set state: `this.setState()`
* Add a an arrow function, passing in prevState: `prevState =>`
* Return a selectedNumbers property and set the value by concatenating the previous selectedNumbers with the clickedNumber: `({ selectedNumbers: prevState.selectedNumbers.concat(clickedNumber); })`
* Add a selectNumber prop to <Numbers /> and pass in the method: `selectNumber={this.selectNumber}`
* In the Numbers component:
* Add selectNumber to the destructured props: `({ selectedNumbers, selectNumber })`
* Add an onClick method to the <span> with an arrow funciton inside: `onClick={() => }`
* Return selectNumber with number passed in: `=> selectNumber(number)`
* Check your browser. If you see the used numbers, you can remove the dummy data from selectedNumbers in state


# We have 2 problems. What are they?
* Stars rerenders when selecting a number
* Able to select a number multiple times


# Don’t rerender stars on select number
* Pass numberOfStars into the Stars component as a destructured prop: `({ numberOfStars })`
* Move the numberOfStars to the state of the Game component (using object property syntax): numberOfStars: `1 + Math.floor(Math.random()*9)`
* Pass numberOfStars into the <Stars /> component as a prop: `numberOfStar={this.state.numberOfStars}`


# Don’t allow numbers to be selected multiple times
* In Game, add conditional logic at the top selectNumber method: `if () {}`
* Check if selectedNumbers already contains the clickedNumber: `this.state.selectedNumbers.indexOf(clickedNumber) >= 0`
* If so, return out of the method: `return;`


# Allow user to unselect numbers
* In Game, add unselectNumber method: `unselectNumber = () => {}`
* Pass in a clickedNumber: `(clickedNumber)`
* Set State: `this.setState();`
* Pass in an arrow function taking prevState as a parameter and returning a new state object: `prevState => ({})`
* Set selectedNumbers to the previous selectedNumber and add a filter: `selectedNumbers: prevState.selectedNumbers.filter()`
* Return only the numbers that don’t match the clickedNumber: `number => number !== clickedNumber`
* Pass the unselectNumber into the <Answer /> component:
* Inside the Answer component:
* Add unselectNumber to the destructured props: `({ selectedNumbers, unselectNumber })`
* Give the <span> an onClick prop: `onClick={}`
* Pass in an arrow function returning unselectNumber with number as an argument: `() => unselectNumber(number)`


# Deactivate the Button component until there are numbers
* Pass selectedNumbers into the <Button /> component: `selectedNumbers={this.state.selectedNumbers}`
* Pass in as a destructured prop: `({ selectedNumbers })`
* Give <button> a disabled prop: `disabled={}`
* Disable if there are no selectedNumbers: `selectedNumbers.length === 0`


# Add game logic for checking answers
* In the Game component:
* Create a checkAnswer method: `checkAnswer = () => {}`
* Set the state, passing in an arrow function with a prevState argument and answerIsCorrect key: `this.setState(prevState => ({ answerIsCorrect: }))`
* Set the value of answer is correct to the following boolean evaluation: `prevState.numberOfStars === prevState.selectedNumbers.reduce((accumulator, num) => accumulator + num, 0)`
* Set the initial state value of answerIsCorrect to null
* Pass checkAnswer as a prop to <Button />: `checkAnswer={this.checkAnswer}`
* Pass answerIsCorrect into <Button />: `answerIsCorrect={this.state.answerIsCorrect}`
* Inside the Button component:
* Destructure these new props
* Add a button variable at the top: `let button;`
* Add a switch statement accepting answer is correct as an argument: `switch (answerIsCorrect) {}`
* Add cases for true and false, and add a default
* Copy the <button> from inside the <div> into the default case and assign it to button: `button = <button>...`
* Copy this button assignment into the true case
* Delete the disabled prop
* Change the = to a check icon: `<i className="fa fa-check"></i>`
* Copy this into the false case
* Change the className to: `"fa fa-times"`
* Add an onClick to the default button passing in checkAnswer: `onClick={checkAnswer}`
* Inside the selectNumber method, add to setState to nullify answerIsCorrect if player adds more numbers: `answerIsCorrect: null`

# Add game logic for accepting answers
* Add a new property to state and give it some dummy data: `usedNumbers: [1, 5]`
* Pass usedNumbers into <Numbers />: `usedNumbers={this.state.usedNumbers}`
* Inside the Numbers component
* Add usedNumbers to the destructured props
* In the numberClassName function, add conditional logic to check if the number is used. Just duplicate the exiting if(), check usedNumbers rather than selectedNumbers, and return ‘used’
* Check your browser. If you see the used numbers, you can remove the dummy data from usedNumbers in state
* Add an acceptAnswer method to Game
* Add a setState with prevState
* Set usedNumbers usedNumbers & selectedNumbers: `usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers)`
* Also set answerIsCorrect to null
* Set selectedNumbers to []
* And set numberOfStars using the randomizer from the initial state
* Pass acceptAnswer into the <Button /> as a prop
* Add acceptAnswer to the Button component as a destructured prop
* In only the true case, add an onClick to the <button> and pass in acceptAnswer
* Duplicate the conditional logic in the selectNumber method and change selectedNumbers to usedNumbers


# Allow redraws
* Inside the Button component:
* Add a new <button> under the existing {button}
* Add an <i> inside the <button> with a className of “fa fa-refresh”
* Give the new button an onClick prop that invokes redraw (then work backwards)
* Add redraw do the destructured props
* In Game, pass redraw into the <Button /> as a prop
* Then create the redraw method
* Inside the method, setState
* Set numberOfStars to the randomizer
* Set answerIsCorrect to null
* Set selectedNumbers to an empty array
* Set a limit on redrawsRemaining on state: `redraws: 5`
* Pass redrawsRemaining into <Button /> as a prop
* Add redrawsRemaining to props on Button
* Add it into the refresh button after the <i />
* In the redraw method add redrawsRemaining to state (make sure you have prevState)
* Set the value to `prevState.redrawsRemaining - 1`
* At the top of redraw, add a conditional to check if redrawsRemaining has reached 0. If so, return.


# Winning and losing
* Add doneStatus to state and set it to null
* Add a <DoneFrame /> following the rest of the components, with doneStatus as a prop
* Create DoneFrame as a functional component (like the others)
* Pass in doneStatus as a destructured prop
* Return a <div> with an <h3> inside, and add doneStatus as its value
* Add an updateDoneStatus method to Game
* Set state and include `prevState => {}`
* Inside the curly braces, add a conditional to check if usedNumbers.length is 9
* If so, return doneStatus as a win: `{ doneStatus: 'You win!' }`
* Add another conditional to check for a loss
* Check if redrawsRemaining has reached zero: `this.state.redrawsRemaining === 0`
* Also check opposite of the result of the function possibleSolutions, passing in prevState: `&& !this.possibleSolutions(prevState)`
* If both of these evaluate to true, return 'Game over'
* Now create the possibleSolutions function
* Destructure numberOfStars and usedNumbers
* Add a possibleNumbers variable, which will find out what numbers are remaining
* Set it equal to a `_.range()` of 1, 10
* Chain on a .filter() and pass in an arrow function taking number as a parameter
* Return usedNumbers.indexOf(number) === -1 (eg. it’s not there
* Copy in the possibleCombinationSum function from below
* Return the result of possibleCombinationSum, passing in possibleNumbers and numberOfStars
* Finally, invoke updateDoneStatus. But be careful with async!
* Add it at the end of acceptAnswer AND redraw methods as a callback: `}), this.updateDoneStatus);`



```
var possibleCombinationSum = function(arr, n) {
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
```

import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let className = `button button--${this.props.id}`;
    if (this.props.isActive) className += " active";
    return (
      <button className={className}>A</button>
    );
  }
}

export default Button;

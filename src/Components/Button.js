import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
       <button className='departures' >DEPARTURES</button>
       <button className='arrivals' onClick={this.props.onClick}>ARRIVALS</button>
      </React.Fragment>
    )
  }
}

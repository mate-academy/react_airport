import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <button className='departures' 
          onClick={() => this.props.updateDisplayMode('departure')}>DEPARTURES
        </button>
        <button className='arrivals' 
          onClick={() => this.props.updateDisplayMode('arrival')}>ARRIVALS
        </button>
      </React.Fragment>
    )
  }
}

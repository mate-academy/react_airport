import React, { Component } from 'react';
import '../css/BoardHeader.css';

class BoardHeader extends Component {
  constructor(props) {
    super(props);

    this.departure = React.createRef();
    this.arrival = React.createRef();
    this.changeView = this.changeView.bind(this);
  }

  changeView(event) {
    if (event.target.classList.contains('active')) {
      return;
    }

    const buttons = [this.departure.current, this.arrival.current];
    buttons.forEach((item) => {
      item.classList.toggle('active');
      item.classList.toggle('unactive');
    });

    this.props.changeStatus(event);
  }

  render() {
    return (
      <section className="header_wrapper_section">
        <div
          ref={this.departure}
          className={`header_wrapper departure active`}
          onClick={this.changeView}>
            <svg width={40} height={28} {...this.props}>
              <path
                d="M39.855 11.9a2.946 2.946 0 0 0-3.772-1.888l-10.251 3.603L11.339 1.577 7.612 2.872l9.166 13.913-9.592 3.373-4.1-2.837-2.798.988 4.03 6.136 1.704 2.578 3.085-1.089 10.25-3.601 8.399-2.944 10.255-3.606a3.092 3.092 0 0 0 1.844-3.883z"
                fill="#fff"
                fillRule="nonzero"
              />
            </svg>
            <span>Departures</span>
        </div>
        <div ref={this.arrival} className ="header_wrapper arrival unactive" onClick={this.changeView}><span>
          <svg width={40} height={28} {...this.props}>
            <g fill="none" fillRule="evenodd">
              <path
                d="M37.67 22.643a2.944 2.944 0 0 0-2.199-3.597l-10.597-2.374-5.912-17.875-3.844-.876.404 16.646-9.916-2.22-1.973-4.574-2.896-.645.169 7.335.078 3.088 3.192.71 10.595 2.374 8.678 1.95 10.6 2.373a3.09 3.09 0 0 0 3.62-2.315z"
                fill="#fff"
                fillRule="nonzero"
              />
            </g>
          </svg>
          </span>
          <span>Arrivals</span>
        </div>
      </section>
    );
  }
}

export default BoardHeader;
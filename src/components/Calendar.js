import React, { Component } from 'react';
import '../css/Calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className='calendar'>
        <table>
          <tbody>
            <tr>
              {['Yestarday', 'Today', 'Tomorrow'].map((item) => <td key={item} className={this.props.dayActive === item ? 'active' : ''}
              onClick={() => this.props.changeCalendarStatus(item)}>{item}</td>)}
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Calendar;

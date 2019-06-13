import React from 'react';
import '../css/TableRow.css'

class TableRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayClass: 'unvisible'
    }

    this.showLink = this.showLink.bind(this)
  }

  showLink(event) {
    this.setState((state) => {
      return {
        displayClass: state.displayClass === 'unvisible' ? 'visible' : 'unvisible'}
    })
  }

  render() {
    return (
      <tr className="row" onMouseEnter={this.showLink} onMouseLeave={this.showLink}>
        <td className= 'terminal'>
          <div className={this.props.terminal === 'A' ? 'green' : 'blue'}>{this.props.terminal}</div>
        </td>
        <td className={this.props.gateClass}>{this.props.gateNo}</td>
        <td>{this.props.localTime}</td>
        <td>{this.props.destination}</td>
        <td>{this.props.status}</td>
        <td>  
          <span className = "image">
            <img src = {this.props.logo}/>
          </span>
          <span>
            {this.props.airline}
          </span>
        </td>
        <td>{this.props.flight} <a onClick={(event) => {
          alert('A этого нам не задавали');
          event.preventDefault();
        }
      } className={this.state.displayClass} href="#"> Flight details</a></td>
      </tr>
    )
  }
}

export default TableRow;
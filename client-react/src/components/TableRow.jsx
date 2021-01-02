import React from 'react';
import {
  Link
} from 'react-router-dom';
import axios from '../axios'

class TableRow extends React.Component{
  constructor(props) {
    super(props);
    this.doneTask = this.doneTask.bind(this)
  }
  doneTask(){
    axios({
      url: `/todos/${this.props.item.id}`,
      method: 'PATCH',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(_=>{
        this.props.onGetTask()
      })
      .catch(err =>{
        console.log(err);
      })
  }
  render () {
    return (
      <tr>
        <th scope="row">{this.props.item.title}</th>
        <td>{this.props.item.description}</td>
        <td>{this.props.item.status}</td>
        <td>{this.props.item.due_date.split('T')[0]}</td>
        <td><Link to={`/home/edit/${this.props.item.id}`}><button className="btn">edit</button></Link><button className="btn" onClick={this.doneTask}>done</button></td>
      </tr>
    )
  }
}

export default TableRow
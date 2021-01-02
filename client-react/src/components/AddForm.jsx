import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import axios from '../axios'

class AddForm extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      title: '',
      description: '',
      due_date: '',
      error: ''
    }
    this.postTask = this.postTask.bind(this)
    this.cancelAdd = this.cancelAdd.bind(this)
  }
  postTask(){
    axios({
      url: '/todos',
      method: 'POST',
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        title: this.state.title,
        description: this.state.description,
        due_date: this.state.due_date
      }
    })
      .then( res =>{
        this.props.onGetTask()
        this.props.history.push('/home')
      })
      .catch( err =>{
        console.log(err.response);
        if(err.response){
          this.setState({
            error: err.response.data.msg.split(',')[0].split('Validation error:')[1]
          })
        }else{
          console.log(err);
        }
      })
  }
  cancelAdd() {
    this.props.onCancelAdd()
  }
  render() {
    return(
      <>
        <label>title:</label>
        <input type="text" onChange={(event)=>{
          this.setState({title: event.target.value})
        }}  id="add-title" placeholder="title"/>
        <label>description:</label>
        <input type="text" onChange={(event) =>{
          this.setState({description: event.target.value})
        }}  id="add-description" placeholder="description"/>
        <label>due date:</label>
        <input type="date"  id="add-due_date" onChange={ event =>{
          this.setState({due_date: event.target.value})
        }}/>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={this.postTask}>submit</button>
          <button className="btn btn-danger" onClick={this.cancelAdd}>cancel</button>
        </div>
        <div id="add-error">
          <p className="text-danger">{this.state.error}</p>
        </div>
      </>
    )
  }
}

export default withRouter(AddForm)

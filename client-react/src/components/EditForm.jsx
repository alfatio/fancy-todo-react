import React from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import axios from '../axios'

class EditForm extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      title: '',
      description: '',
      status: '',
      due_date: '',
      error: '',
      id: this.props.match.params.id
    }
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }
  componentDidMount(){
    axios({
      url: `todos/${this.state.id}`,
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({data}) =>{
        this.setState({
          title: data.title,
          description: data.description,
          status: data.status,
          due_date: data.due_date
        })
      })
      .catch(err =>{
        console.log(err.response);
      })
  }

  editTask(e){
    e.preventDefault()
    axios({
      url: `todos/${this.state.id}`,
      method: 'PUT',
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        due_date: this.state.due_date,
      }
    })
      .then(_=>{
        this.props.onGetTask()
        this.props.history.push('/home')
      })
      .catch(err =>{
        if(err.response){
          this.setState({
            error: err.response.data.msg.split(',')[0].split('Validation error:')[1]
          })
        }else{
          console.log(err);
        }
      })
  }
  deleteTask(){
    axios({
      url: `todos/${this.state.id}`,
      method: 'DELETE',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(_=>{
        this.props.onGetTask()
        this.props.history.push('/home')
      })
      .catch(err =>{
        console.log(err);
      })
  }
  render() {
    return (
      <div className="card col-5">
          <div className="card-body" id="edit-muncul">
              <div  className="col justify-content-center">
                  <p className="text-danger">{this.state.error}</p>
                  <form onSubmit={this.editTask} className="d-flex flex-column justify-content-center">
                      <label >title:</label>
                      <input type="text" id="edit-title" placeholder="title" value={this.state.title} onChange={(event)=>{
                        this.setState({
                          title: event.target.value
                        })
                      }}/>
                      <label >description:</label>
                      <input type="text" id="edit-description" placeholder="description" value={this.state.description} onChange={(event)=>{
                        this.setState({
                          description: event.target.value
                        })
                      }}/>
                      <label >status</label>
                      <select  id="edit-status" value={this.state.status} onChange={(event)=>{
                        this.setState({
                          status: event.target.value
                        })
                      }}>
                          <option>done</option>
                          <option>not done</option>
                      </select>
                      <label >due date:</label>
                      <input type="date" id="edit-due_date" value={this.state.due_date.split('T')[0]} onChange={(event)=>{
                        this.setState({
                          due_date: event.target.value
                        })
                      }}/>
                      <div className="row justify-content-between">
                        <div>
                        <input className="btn btn-primary" type="submit" value="submit"/>
                        <button className="btn btn-danger" type="button" onClick={this.deleteTask}>delete</button>
                        <Link to="/home"><button className="btn btn-info" type="button">cancel</button></Link>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
  }
}

export default withRouter(EditForm)

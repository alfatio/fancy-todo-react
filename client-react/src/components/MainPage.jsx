import React from 'react';
import {
  Route,
  // Link
} from 'react-router-dom';
import axios from '../axios'
import AddForm from './AddForm'
import WeatherCard from './WeatherCard'
import TableRow from './TableRow'
import EditForm from './EditForm'


class MainPage extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      tasks: [],
      taskReturned: false
    }
    this.initiate = this.isLogin()
    this.getTask = this.getTask.bind(this)
  }

  isLogin(){
    if(!localStorage.getItem('token')){
      this.props.history.push('/')
    }
  }
  logout = () =>{
    localStorage.removeItem('token')
    this.props.history.push('/')
  }
  componentDidMount(){
    this.getTask()
  }
  cancelAdd = ()=>{
    this.props.history.push('/home')
  }
  getTask() {
    axios({
      url: 'todos',
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({data}) =>{
        this.setState({
          tasks: data
        })
        this.setState({
          taskReturned: true
        })
      })
      .catch(err =>{
        console.log(err.response);
      })
  }

  render(){
    return (
      <section id="main-page" className="bg-secondary bg-gradient" style={{
        minHeight: "100vh"
      }}>
          <ul className="nav justify-content-center align-items-center" style={{
            backgroundColor: "white",
            color: "blue"
          }}>
              <li className="nav-item ">
                <p>FANCY TO DO</p>
              </li>
              <li className="nav-item" style={{
                marginLeft: "500px"
              }}>
                <button className="btn btn-danger" onClick={this.logout}>logout</button>
              </li>
            </ul>
            <div id="weather" className="p-3">
              <WeatherCard/>
            </div>
            <div className="container" >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">title</th>
                      <th scope="col">description</th>
                      <th scope="col">status</th>
                      <th scope="col">due date</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  <tbody id="table-body">
                    {this.state.tasks.map(item => {
                      return <TableRow onGetTask={this.getTask} item={item} key={item.id}/>
                    })}
                  </tbody>
                </table>
                <button className="btn" style={{
                  color: "blue"
                }} onClick={() => {
                  this.props.history.push('/home/add')
                }}>+ add task</button>
                <div id="add-task" className="container col-4 d-flex flex-column">
                  <Route path="/home/add" >
                    <AddForm onGetTask={this.getTask} onCancelAdd={this.cancelAdd}/>
                  </Route>
                </div>
              <div id="edit-form">
                <Route path="/home/edit/:id">
                  <EditForm onGetTask={this.getTask}/>
                </Route>
              </div>
            </div>
      </section>
    )
  }
}

export default MainPage

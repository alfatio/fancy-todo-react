import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
// import axios from './axios'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.initiate = this.isLogin()
  }

  isLogin(){
    if(localStorage.getItem('token')){
      this.props.history.push('/home')
    }
  }

  render(){
    return <section style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1517783999520-f068d7431a60?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)',
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <ul className="nav" style={{
        backgroundColor: 'white',
        color: 'blue'
      }}>
          <li className="nav-item me-auto">
            <button className="btn"><h3>FANCY TO DO</h3></button>
          </li>
          <li className="nav-item align-self-center">
            <Link to="/login"><button className="btn">Login</button></Link>
          </li>
          <li className="nav-item align-self-center">
            <Link to="/register"><button className="btn">Register</button></Link>
          </li>
        </ul>
      <Route path="/login" component={LoginForm}>
      </Route>
      <Route path="/register" component={RegisterForm}>
      </Route>
    </section>
  }
}

export default LandingPage
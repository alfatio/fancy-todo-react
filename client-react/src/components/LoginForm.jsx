import React from 'react';
import axios from '../axios'


class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password: '',
      error: ''
    }

    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.login = this.login.bind(this)
  }

  changeEmail(e){
    this.setState({
      email: e.target.value
    })
  }
  changePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  changeError(e){
    this.setState({
      error: e
    })
  }

  login(e){
    e.preventDefault()
    axios({
      url: '/login',
      method: 'POST',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res =>{
        localStorage.setItem('token', res.data.token)
        this.props.history.push('/home')
      })
      .catch(err =>{
        this.changeError(err.response.data.msg)
      })
  }
  render(){
    return <>
    <div className="container d-flex align-items-center justify-content-center col-4" style={{
      height: "80%"
    }}>
        <div className="w-100">
            <div className="row justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <div>
                          <p>Login:</p>
                            <form action="" onSubmit={this.login} className="col-9 d-flex flex-column" >
                                <label className="p-1">email:</label>
                                <input className="p-1" type="email" placeholder="email" onChange={this.changeEmail}/>
                                <label className="p-1">password:</label>
                                <input className="p-1" type="password" placeholder="password" onChange={this.changePassword}/>
                                <input type="submit" className="btn btn-primary mt-2" value="login"></input>
                            </form>
                            <div className="row">
                            </div>
                        </div>
                        <p>OR SIGN IN WITH:</p>
                        <div id="google-sign-in" >
                            <div className="g-signin2" data-onsuccess="onSignIn"></div>
                        </div>
                        <div id="login-error">
                          <p className="text-danger">{this.state.error}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
  }
}

export default LoginForm
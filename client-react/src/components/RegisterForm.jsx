import React from 'react';
import axios from '../axios'



class RegisterForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.register = this.register.bind(this)
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

  register(e){
    e.preventDefault()
    axios({
      url: '/register',
      method: 'POST',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res =>{
        this.props.history.push('/login')
      })
      .catch(err =>{
        this.changeError(err.response.data.msg)
      })
  }
  render() {
    return <>
    <div className="container d-flex align-items-center justify-content-center col-4" style={{
      height: "80%"
    }}>
        <div className="w-100">
            <div className="row justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <div>
                          <p>Register:</p>
                            <form action="" onSubmit={this.register} className="col-9 d-flex flex-column" >
                                <label className="p-1">email:</label>
                                <input className="p-1" type="email" placeholder="email" onChange={this.changeEmail}/>
                                <label className="p-1">password:</label>
                                <input className="p-1" type="password" placeholder="password" onChange={this.changePassword}/>
                                <input type="submit" className="btn btn-primary mt-2" value="register"></input>
                            </form>
                            <div>
                              <p className="text-danger">{this.state.error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
  }
}

export default RegisterForm
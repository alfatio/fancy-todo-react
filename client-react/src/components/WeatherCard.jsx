import React from 'react';
// import {
//   Route,
//   Link
// } from 'react-router-dom';
import axios from '../axios'

class WeatherCard extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      data: {},
      dataIsReturn: false
    }

    this.setData = this.setData.bind(this)
  }
  setData (payload) {
    this.setState({
      data : payload
    })
  }
  componentDidMount(){
    axios({
      url: '/todos/weather',
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(async ({data}) => {
        this.setState({
          data: data.data
        })
        this.setState({dataIsReturn : true});
      })
      .catch((err) => {
        console.log(err, 'error')
      })
  }
  render() {
    if(this.state.dataIsReturn){
      return (
        <div className="row justify-content-center w-100" onLoadStart={this.getWeather}>
          <div id="weather-card" className="card" style={{
              width: "18rem"
            }}>
            <img src="https://spacenews.com/wp-content/uploads/2018/05/24359364107_152b0152ff_k.jpg" className="card-img-top" alt="weather icon"/>
            <div id="weather-card-body" className="card-body">
              <h5 className="card-title">{this.state.data.request.query}</h5>
              <p className="card-text">{this.state.data.current.observation_time} {this.state.data.current.temperature}°C</p>
              <p className="card-text">{this.state.data.location.localtime.split(' ')[0]} </p>
            </div>
          </div>
        </div>)
    }else{
      return <p>Loading...</p>
    }
  }
}

export default WeatherCard

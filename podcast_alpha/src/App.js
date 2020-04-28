import React, { Component } from 'react';

import Library from './components/Library'
import Search from './components/Search'
import AuthContainer from './containers/AuthContainer'
import Header from './components/Header'


const AUTO_LOGIN_URL = `http://localhost:3001/auto_login`
const USER_AUTHED_URL = `http://localhost:3001/user_is_authed`
export default class App extends Component {

  state = {
    user: null,
    form: ""
  }

  setUser = (user) => {
    this.setState({
      user: user
    })
  }

  setForm = (form) => {
    this.setState({
      form: form
    })
  }
  loggedInHeader = () => {
    if (this.state.user.username) {
      return <h5>Logged in as {this.state.user.username}</h5>

    } else {
      return <h3>Welcome to podcast alpha!</h3>
    }
  }



  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch(AUTO_LOGIN_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.setUser(data)
          console.log(data)
        })
    }
  }

  handleLogin = user => {
    this.setUser(user)
  }


  // handleAuthClick = () => {
  //   const token = localStorage.getItem("token")
  //   fetch(USER_AUTHED_URL, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //     .then(resp => resp.json())
  //     .then(data => console.log(data))
  // }


  render() {
    return (
      <div className="App" >
        <div className="container">
          {this.state.user ? <Search user={this.state.user} /> : < AuthContainer handleLogin={this.handleLogin} form={this.state.form} setForm={this.setForm} />}


          {/* <Library user={this.state.user} /> */}

        </div>
      </div>

    )
  }
}



    // return this.state.user
// ? <MainApplicationContainer />
// //: <AuthContainer />
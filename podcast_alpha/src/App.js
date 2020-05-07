import React, { Component } from 'react';

import AuthContainer from './containers/AuthContainer'
import Header from './components/Header'
import { Redirect, Link } from 'react-router-dom';

import MainApp from './components/MainApp'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './css/main.css'
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


  handleLogout = () => {
    localStorage.clear("token")
    this.setState({ user: null })
    return <Redirect to="/" />
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


  render() {
    return (
      <div className="App" >
        <div className="layout-container layout-top-medium">

          {
            this.state.user
              ? <>
                <MainApp user={this.state.user} handleLogout={this.handleLogout} />
              </>
              : < AuthContainer handleLogin={this.handleLogin} form={this.state.form} setForm={this.setForm} />
          }
        </div>
      </div >

    )
  }
}

// App
//   | ___ AuthContainer
//     | ___ MainApp
//       | ___ NavBar
//         | ___ < Switch >

//          </Switch >




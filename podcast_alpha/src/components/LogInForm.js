import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


const LOGIN_URL = 'http://localhost:3001/login'

export default class LogInForm extends Component {

    // props = this.props

    state = {
        username: "",
        password: ""
    }

    // handleUsernameChange = event => {
    //     this.setUsername(event.target.value)
    // }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // setUsername = (event) => {
    //     this.setState({
    //         username: event.target.value
    //     })
    // }

    // setPassword = (event) => {
    //     this.setState({
    //         password: event.target.value
    //     })
    // }

    handleSubmit = event => {

        event.preventDefault()
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                localStorage.setItem("token", data.jwt)
                this.props.handleLogin(data.user)
                return < Redirect to="/" />
            })
        this.setState({
            username: "",
            password: ""
        })


    }

    render() {
        return (
            <div>
                <h2>Log in</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input name="username" value={this.state.username} onChange={this.handleInputChange} type="text" />

                    <label>Password</label>
                    <input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" />

                    <button type="submit"> Submit</button>
                </form>
            </div>
        )
    }
}



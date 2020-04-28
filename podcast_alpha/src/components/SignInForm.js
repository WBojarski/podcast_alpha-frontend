import React, { Component } from 'react'

const USERS_URL = 'https://localhost:3001/users'

export default class SignInForm extends Component {


    state = {
        username: "",
        password: ""
    }

    handleUsernameChange = (event) => {
        this.setUsername(event)
    }

    handlePasswordChange = (event) => {
        this.setPassword(event)
    }

    setUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    setPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()
        fetch(USERS_URL, {
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
            })
        this.setUsername("")
        this.setPassword("")
    }


    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input value={this.state.username} onChange={this.handleUsernameChange} type="text" />

                    <label>Password</label>
                    <input value={this.state.password} onChange={this.handlePasswordChange} type="text" />

                    <button type="submit"> Submit</button>
                </form>
            </div>
        )
    }
}



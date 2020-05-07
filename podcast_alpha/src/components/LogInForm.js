import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';




const LOGIN_URL = 'http://localhost:3001/login'

export default class LogInForm extends Component {

    // props = this.props

    state = {
        username: "",
        password: ""
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }


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
                <form>

                    <span className="p-float-label">
                        <InputText id="in" name="username" value={this.state.username} onChange={this.handleInputChange} />
                        <label htmlFor="in">Username</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="in" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                        <label htmlFor="in">Password</label>
                    </span>
                    <Button onClick={this.handleSubmit} label="Login" className="p-button-raised " />

                </form>
            </div>
        )
    }
}



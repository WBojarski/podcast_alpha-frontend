import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import LoginForm from '../components/LogInForm'

export default class AuthContainer extends Component {

    handleFormSwitch = input => {
        this.props.setForm(input)
    }


    renderForm = () => {
        switch (this.props.form) {
            case "login":
                return <LoginForm handleLogin={this.props.handleLogin} />
            default:
                return <SignInForm handleLogin={this.props.handleLogin} />
        }
    }

    render() {
        return (
            <div>

                <button onClick={() => this.handleFormSwitch("login")}>Login</button>
                <button onClick={() => this.handleFormSwitch("signup")}>Signup</button>
                {
                    this.renderForm()
                }
            </div>
        )
    }
}

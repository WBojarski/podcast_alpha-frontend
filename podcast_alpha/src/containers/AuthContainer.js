import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import LoginForm from '../components/LogInForm'
import { Button } from 'primereact/button';
import '../css/authContainer.css'


export default class AuthContainer extends Component {

    handleFormSwitch = input => {
        this.props.setForm(input)
    }


    renderForm = () => {
        switch (this.props.form) {
            case "signup":
                return <SignInForm handleLogin={this.props.handleLogin} />

            default:
                return <LoginForm handleLogin={this.props.handleLogin} />

        }
    }

    render() {
        return (
            <div className="main">
                <h3 style={{ "text-align": "center" }}>Welcome to Podcast Alpha!</h3>
                <Button style={{ "width": "45%" }} onClick={() => this.handleFormSwitch("login")} label="login" className="p-button-raised " />
                <Button style={{ "width": "45%", "margin-left": "10%" }} onClick={() => this.handleFormSwitch("signup")} label="signup" className="p-button-raised " />

                {
                    this.renderForm()
                }
            </div >
        )
    }
}

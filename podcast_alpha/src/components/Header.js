import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Podcast Alpha</h1>

                <button onClick={() => this.props.handleFormSwitch("signup")}>Sign up</button>
                <button onClick={() => this.props.handleFormSwitch("login")}>Log in </button>
            </div>
        )
    }
}

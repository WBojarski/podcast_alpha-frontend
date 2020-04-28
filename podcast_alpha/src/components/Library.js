import React, { Component } from 'react'

const PLAYLISTS_URL = "http://localhost:3001/playlists"


export default class Library extends Component {

    state = {
        name: "",
        description: "",
        user_id: this.props.user.id
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(PLAYLISTS_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.state.name, description: this.state.description, user_id: this.props.user })
        })
            .then(resp => resp.json())
            .then(data => console.log(data))

    }

    componentDidMount() {
        fetch(`http://localhost:3001/users/${this.props.user.id}`, {
            method: "GET"
        })
            .then(resp => resp.json())
            // .then(data => this.renderPlaylists(data.playlists))
            .then(data => console.log(data))
    }

    // renderPlaylists = playlists => {
    //     return playlists.forEach(playlist =>
    //         <div>
    //             <h4>{playlist.name}</h4>
    //             <h5>{playlist.description}</h5>
    //         </div>
    //     )
    // }
    render() {
        return (
            <div>
                <h3>Library</h3>

                <h4>Playlist</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter playlist name</label>
                    <input type="text" name="playlistName" onChange={this.handleInputChange} />

                    <label>Enter playlist description</label>
                    <input type="text" name="playlistDescription" onChange={this.handleInputChange} />
                    <button type="submit"> Create Playlist</button>
                </form>
            </div >
        )
    }
}

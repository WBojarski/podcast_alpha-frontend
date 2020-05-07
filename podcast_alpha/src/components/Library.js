import React, { Component } from 'react'
import PlaylistContainer from '../containers/PlaylistContainer'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import '../css/library.css'

const PLAYLISTS_URL = "http://localhost:3001/playlists"


export default class Library extends Component {

    state = {
        name: "",
        description: "",
        playlists: [],
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
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name: this.state.name, description: this.state.description, user_id: this.props.user.id })
        })
            .then(resp => resp.json())
            .then(data => this.setState({ playlists: [data, ...this.state.playlists], name: "", description: "" }))

    }

    componentDidMount() {
        fetch(`http://localhost:3001/users/${this.props.user.id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(resp => resp.json())
            .then(data => this.setState({ playlists: data.playlists }))
    }


    render() {
        return (
            <div>
                <div className="createPlaylistHeaders">
                    <h3>Library</h3>

                    <h5>Create a playlist</h5>
                </div>
                <div className="createPlaylist">
                    <form>

                        <span className="p-float-label">
                            <InputText style={{ "width": "100%", "margin-bottom": "15px" }} id="in" value={this.state.name} name="name" onChange={this.handleInputChange} />
                            <label htmlFor="in">Enter playlist name</label>
                        </span>
                        <span className="p-float-label">
                            <InputText style={{ "width": "100%", "margin-bottom": "15px" }} id="in" value={this.state.description} name="description" onChange={this.handleInputChange} />
                            <label htmlFor="in">Enter playlist description</label>
                        </span>
                        <Button style={{ "width": "100%" }} onClick={this.handleSubmit} label="Create playlist" className="p-button-raised " />

                    </form>
                </div>
                <div className="playlists">
                    <PlaylistContainer playlists={this.state.playlists} />
                </div>
            </div >
        )
    }
}

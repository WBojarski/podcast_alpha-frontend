import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import '../css/library.css'

export default class PlaylistItem extends Component {
    render() {
        return (

            <div className="cardItem">
                <Link to={`/playlists/${this.props.playlist.id}`}>
                    <h4>{this.props.playlist.name}</h4>
                </Link>
                <h5>{this.props.playlist.description}</h5>
                <div className="deleteButton">
                    <Button icon="pi pi-trash" className="p-button-danger" />
                </div>
            </div >

        )
    }
}


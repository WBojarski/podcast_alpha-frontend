import React, { Component } from 'react'
import PlaylistItem from '../components/PlaylistItem'
import { Route } from 'react-router-dom'

export default class PlaylistContainer extends Component {

    renderPlaylists() {
        return this.props.playlists.map(playlist => <PlaylistItem playlist={playlist} />)
    }


    render() {
        return (
            <div>
                <h3>My playlists</h3>
                {this.renderPlaylists()}
            </div>
        )
    }
}

import React, { Component } from 'react'
import PlaylistItem from '../components/PlaylistItem'
import { Route } from 'react-router-dom'
import '../css/library.css'
import { Grid } from 'semantic-ui-react'


export default class PlaylistContainer extends Component {

    renderPlaylists() {
        return this.props.playlists.map(playlist => <PlaylistItem playlist={playlist} deletePlaylist={this.props.deletePlaylist} />)
    }


    render() {
        return (
            <div>
                <div className="createPlaylistHeaders">
                    <h3 style={{ "margin-top": "10px", "margin-bottom": "10px", "text-align": "center" }}>My playlists</h3>
                </div>
                <div className="playlistEpisodes"></div>
                <Grid>
                    {this.renderPlaylists()}

                </Grid>
            </div>
        )
    }
}

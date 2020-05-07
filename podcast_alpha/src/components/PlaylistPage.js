import React, { Component } from 'react'
import PlaylistItem from './PlaylistItem'
import EpisodeCard from './EpisodeCard'

export default class PlaylistPage extends Component {

    state = {
        id: 0,
        name: "",
        episodeIds: [],
        playlistEpisodes: [],
        description: "",

    }

    componentDidMount() {

        const playlistId = this.props.match.params.playlistId

        fetch(`http://localhost:3001/playlists/${playlistId}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(resp => resp.json())
            .then(playlist => this.setState({
                id: playlist.id,
                name: playlist.name,
                episodeIds: playlist.episode_ids,
                playlistEpisodes: playlist.playlist_episodes,
                description: playlist.description
            }))

    }

    removeEpisodeFromPlaylist = (episodeId) => {

        fetch(`http://localhost:3001/playlist_episodes/:id/`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ episode_id: episodeId, playlist_id: this.state.id })
        })
            .then(resp => resp.json())
            .then(data => this.setState({ episodeIds: this.state.episodeIds.filter(episode => episode != data.episode_id) }))
    }


    render() {

        return (
            <div>
                <div className="playlistHeaders">
                    <h3>{this.state.name}</h3>
                    <h5>{this.state.description}</h5>
                </div>
                {this.state.episodeIds.map(id => <EpisodeCard episodeId={id} removeEpisodeFromPlaylist={this.removeEpisodeFromPlaylist} />)}
            </div>
        )
    }
}

import React, { Component } from 'react'
import PlaylistEpisode from '../components/PlaylistEpisode'
export default class PlaylistEpisodeContainer extends Component {

    state = {
        plyalist: null,
    }

    renderEpisodes() {
        this.state.episodes.map(episode => <PlaylistEpisode episode={episode} />)

    }

    componentDidMount() {
        this.props.playlist.playlist_episodes.forEach(episode => {
            fetch(`https://listen-api.listennotes.com/api/v2/episodes/${episode.id}` {
                method: "GET",
                headers: {
                    'X-ListenAPI-Key': 'c8cef5b74ff7458ebcffe9fc99957f84'
                }
            })
                .then(resp => resp.json())
                .then(data => this.setState({ episodes: data }))
        })
    }

    render() {
        return (
            <div>
                {this.renderEpisodes()}
            </div>
        )
    }
}




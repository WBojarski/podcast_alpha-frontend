import React, { Component } from 'react'

export default class PlaylistEpisode extends Component {


    render() {
        return (
            <div>
                <h3>Title: </h3><p>{this.props.episode.podcast_title_original}</p>
                <img src={this.props.episode.thumbnail} />
                <audio controls>
                    <source src={this.props.episode.audio} type="audio/ogg" />
                </audio>
                <button> Remove from playlist</button>
            </div>
        )
    }
}

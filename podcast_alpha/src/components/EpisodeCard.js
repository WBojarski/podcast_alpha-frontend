import React, { Component } from 'react'
// import { Card } from 'primereact/card';
import { Button } from 'primereact/button'
import '../css/card.css'

import { Card, Icon, Grid } from 'semantic-ui-react'

export default class EpisodeCard extends Component {

    state = {
        episode: {}
    }

    componentDidMount() {
        fetch(`https://listen-api.listennotes.com/api/v2/episodes/${this.props.episodeId}`, {
            headers: { "X-ListenAPI-Key": "c8cef5b74ff7458ebcffe9fc99957f84" }
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ episode: data })
            })

    }

    renderEpisode() {
        return <div className="cardWide">
            <Card
                image={this.state.episode.thumbnail}
                header={this.state.episode.title}
                description={<div style={{ "word-wrap": "break-word" }}>{this.state.episode.description}</div>}
                extra={<div style={{ "width": "100%" }}>
                    <audio controls style={{ "width": "100%" }}>
                        <source src={this.state.episode.audio} type="audio/ogg" />
                    </audio>
                    <Button style={{ "float": "right", "width": "100%" }} onClick={() => this.props.removeEpisodeFromPlaylist(this.state.episode.id)} icon="pi pi-trash" className="p-button-danger" />
                </div>}
            />



            {/* <Card className="card" title={<h4>{this.state.episode.title}</h4>} footer={
                <div><img className="cardImage" src={this.state.episode.thumbnail} />

                    <h5> {this.state.episode.description}</h5>
                    <div className="cardFooter">
                        <audio controls>
                            <source src={this.state.episode.audio} type="audio/ogg" />
                        </audio>
                        <Button onClick={() => this.props.removeEpisodeFromPlaylist(this.state.episode.id)} icon="pi pi-trash" className="p-button-danger" />
                    </div>
                </div>
            } >
            </Card> */}

        </div >
    }

    render() {
        return (
            <div>
                {this.renderEpisode()}
            </div>
        )
    }
}

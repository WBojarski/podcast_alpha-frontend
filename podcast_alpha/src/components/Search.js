import React, { Component } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
// import { Card } from 'primereact/card';
import { Card, Icon } from 'semantic-ui-react'

import '../css/search.css'

// import { Card, Avatar } from 'antd';

const PLAYLIST_EPISODE_URL = `http://localhost:3001/playlist_episodes`
export default class Search extends Component {

    state = {
        searchQuery: "",
        results: [],
        playlists: [],
        dropdownValue: 0,
        randomEpisode: null
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    playlistDropdown = () => {
        return this.state.playlists.map(playlist => ({ label: playlist.name, value: playlist.id }))
    }

    addToPlaylist = (event, episode_id) => {
        event.preventDefault()

        const playlistId = event.target.playlistId.value

        fetch(PLAYLIST_EPISODE_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ playlist_id: playlistId, episode_id })
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
    }

    listenToRandom = (event) => {
        event.preventDefault()
        fetch('https://listen-api.listennotes.com/api/v2/just_listen', {
            method: "GET",
            headers: {
                'X-ListenAPI-Key': 'c8cef5b74ff7458ebcffe9fc99957f84'
            }
        })
            .then(resp => resp.json())
            .then(data => this.setState({ randomEpisode: data }))


    }

    renderRandomEpisode() {

        return (
            <div className="searchCard">
                <Card
                    image={this.state.randomEpisode.thumbnail}
                    header={this.state.randomEpisode.podcast_title}
                    description={<div style={{ "word-wrap": "break-word" }}> {this.state.randomEpisode.description}</div >}
                    extra={< div style={{ "width": "100%" }}>
                        <audio controls style={{ "width": "100%" }}>
                            <source src={this.state.randomEpisode.audio} type="audio/ogg" />
                        </audio>
                        <form onSubmit={(event) => this.addToPlaylist(event, this.state.randomEpisode.id)}>
                            <Dropdown style={{ "width": "100%" }} name="playlistId" value={this.state.dropdownValue} options={this.playlistDropdown()} onChange={(e) => { this.setState({ dropdownValue: e.value }) }} placeholder="Select a playlist" />
                            <Button style={{ "width": "100%" }} label="Add to playlist" className="p-button-primary" />
                        </form>
                    </div >}
                />
            </div>
        )
    }
    componentDidMount() {
        fetch(`http://localhost:3001/users/${this.props.user.id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },

        })
            .then(resp => resp.json())
            .then(data => this.setState({ playlists: data.playlists }))
    }

    renderResults = () => {


        return this.state.results.map(result =>
            <div className="searchCard">
                <Card
                    image={result.thumbnail}
                    header={result.podcast_title_original}
                    description={<div style={{ "word-wrap": "break-word" }}> {result.description_original}</div >}
                    extra={< div style={{ "width": "100%" }}>
                        <audio controls style={{ "width": "100%" }}>
                            <source src={result.audio} type="audio/ogg" />
                        </audio>
                        <form onSubmit={(event) => this.addToPlaylist(event, result.id)}>
                            <Dropdown style={{ "width": "100%" }} name="playlistId" value={this.state.dropdownValue} options={this.playlistDropdown()} onChange={(e) => { this.setState({ dropdownValue: e.value }) }} placeholder="Select a playlist" />
                            <Button style={{ "width": "100%" }} label="Add to playlist" className="p-button-primary" />
                        </form>
                    </div >}
                />
            </div>



        )
    }

    handleSearch = (event) => {
        const SEARCH_URL = `https://listen-api.listennotes.com/api/v2/search?q=${this.state.searchQuery}&sort_by_date=1&type=episode&offset=0&len_min=10&len_max=99999&language=English&safe_mode=0`
        event.preventDefault()
        fetch(SEARCH_URL, {
            method: "GET",
            headers: {
                'X-ListenAPI-Key': 'c8cef5b74ff7458ebcffe9fc99957f84'
            }
        })
            .then(resp => resp.json())
            .then(data => this.setState({ results: data.results, searchQuery: "" }))
    }


    render() {
        return (
            <div>
                <div className="searchHeader">
                    <h3 style={{ "text-align": "center" }}>Search</h3>
                </div>
                <div className="searchForm">
                    <form>
                        <span className="p-float-label">
                            <InputText style={{ "width": "100%" }} id="in" name="searchQuery" value={this.state.searchQuery} onChange={this.handleInputChange} />
                            <label htmlFor="in">Enter search term</label>
                        </span>
                        <Button style={{ "width": "100%", "margin-top": "5px" }} onClick={this.handleSearch} label="Search" className="p-button-raised " />
                        <Button onClick={this.listenToRandom} style={{ "width": "100%", "margin-top": "5px" }} label="Listen to a random podcast" className="p-button-warning" />

                    </form>
                </div>
                {this.state.randomEpisode ? this.renderRandomEpisode() : null}
                {this.renderResults()}

            </div>
        )
    }
}


        // audio: "https://www.listennotes.com/e/p/dca42fd7882c452aa57e2825e927c43f/"
        // audio_length_sec: 729
        // rss: "https://www.listennotes.com/c/r/b30f0c450baf4681b21637b20cb5647f"
// description_highlighted: "...<span class="ln-search-highlight">Rogan</span> Interview (09.10.18) appeared first on TechCast Daily."
                // description_original: "– Tesla’s new Chief Accounting Officer resigns – More executive shakeups – Discussion of Joe Rogan’s interview of Elon Musk Links: Email &gt; tesladailypodcast@gmail.com Twitter &gt; @teslapodcast Patreon &gt; patreon.com/tesladailypodcast Executive producer Jerome Jorden Executive producer Rob Gill Music by Evan Schaeffer Disclosure: Rob Maurer is long TSLA stock The post  Chief Accounting Officer Resigns, Executive Shakeups, Impressions of the Joe Rogan Interview (09.10.18) appeared first on TechCast Daily."
// title_highlighted: "Chief Accounting Officer Resigns, Executive Shakeups, Impressions of the <span class="ln-search-highlight">Joe</span> <span class="ln-search-highlight">Rogan</span> Interview (09.10.18)"
                // title_original: "Chief Accounting Officer Resigns, Executive Shakeups, Impressions of the Joe Rogan Interview (09.10.18)"
                // podcast_title_highlighted: "Tesla Daily: Tesla News & Analysis"
                // podcast_title_original: "Tesla Daily: Tesla News & Analysis"
                // publisher_highlighted: "Rob Maurer"
                // publisher_original: "Rob Maurer"
                // transcripts_highlighted: []
                // image: "https://cdn-images-1.listennotes.com/podcasts/tesla-daily-tesla-news-analysis-rob-maurer-GjbyLIfZvxY-5Cbag3XfNvA.300x300.jpg"
                // thumbnail: "https://cdn-images-1.listennotes.com/podcasts/tesla-daily-tesla-news-analysis-rob-maurer-GjbyLIfZvxY-5Cbag3XfNvA.300x300.jpg"
                // itunes_id: 1273643094
                // pub_date_ms: 1536545295285
                // id: "dca42fd7882c452aa57e2825e927c43f"
                // podcast_id: "b30f0c450baf4681b21637b20cb5647f"
                // genre_ids: (6) [84, 82, 93, 98, 127, 131]
                // listennotes_url: "https://www.listennotes.com/e/dca42fd7882c452aa57e2825e927c43f/"
                // podcast_listennotes_url: "https://www.listennotes.com/c/b30f0c450baf4681b21637b20cb5647f/"
                // explicit_content: false
// link: "http://techcastdaily.com/2018/09/09/chief-accounting-officer-resigns-executive-shakeups-impressions-joe-rogan-interview-09-10-18/?utm_source=listennote

//random episode

// audio
// "https://www.listennotes.com/e/p/1fc4c94f562b4dfdaf2ddebc96f7cdc3/"
// audio_length_sec
// 2934
// description
// "Steve Bannon, Jack Maxey, Jason Miller, and Raheem Kassam discuss the latest on the coronavirus pandemic as the rolling re-opening of the nation is in full effect. Eliot Rabin calls in to discuss his experience opening up his small business."
// explicit_content
// false
// id
// "1fc4c94f562b4dfdaf2ddebc96f7cdc3"
// image
// "https://cdn-images-1.listennotes.com/podcasts/bannons-war-room-warroomorg-RL680QF59Ef-JVtBzDmHe8I.300x300.jpg"
// link
// "https://listen.warroom.org/e/ep-161-pandemic-the-rolling-re-opening-w-eliot-rabin/?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website"
// listennotes_edit_url
// "https://www.listennotes.com/e/1fc4c94f562b4dfdaf2ddebc96f7cdc3/#edit"
// listennotes_url
// "https://www.listennotes.com/e/1fc4c94f562b4dfdaf2ddebc96f7cdc3/"
// maybe_audio_invalid
// false
// podcast_id
// "fa4a5d80ca30481c9e1c68c8e56680cb"
// podcast_title
// "Bannon's War Room"
// pub_date_ms
// 1588782281001
// publisher
// "WarRoom.org"
// thumbnail
// "https://cdn-images-1.listennotes.com/podcasts/bannons-war-room-warroomorg-RL680QF59Ef-JVtBzDmHe8I.300x300.jpg"
// title
// "Ep 161- Pandemic: The Rolling Re-Opening (w/ Eliot Rabin)"

import React, { Component } from 'react'


export default class Search extends Component {

    state = {
        searchQuery: "",
        results: [],
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    renderResults = () => {
        return this.state.results.map(result =>
            <div>
                <h2>Title: </h2><p>{result.podcast_title_original}</p>
            </div>)
    }

    handleSearch = (event) => {
        const SEARCH_URL = `https://listen-api.listennotes.com/api/v2/search?q=${this.state.searchQuery}&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0`
        event.preventDefault()
        fetch(SEARCH_URL, {
            method: "GET",
            headers: {
                'X-ListenAPI-Key': 'c8cef5b74ff7458ebcffe9fc99957f84'
            }
        })
            .then(resp => resp.json())
            // .then(data => console.log(data))
            .then(data => this.setState({ results: data.results }))
    }


    render() {
        return (
            <div>
                <h3>Search</h3>


                <form onSubmit={this.handleSearch}>
                    <label>Enter search term</label>
                    <input type="text" name="searchQuery" onChange={this.handleInputChange}></input>
                    <button type="submit">Search</button>
                </form>

                {this.renderResults()}
            </div>
        )
    }
}

import React, { Component } from 'react'

import Navbar from './Navbar'
import LibraryPage from './Library'
import SearchPage from './Search'
import PlaylistPage from './PlaylistPage'
import { Route } from 'react-router-dom'
import { Button } from 'primereact/button';
import '../css/main.css'
import { Layout } from 'antd'


const { Header, Footer, Sider, Content } = Layout

export default class MainApp extends Component {
    render() {
        return (
            <div className="container">
                <Layout>

                    <div className="mainContent"></div>
                    <div><h4>Logged in as {this.props.user.username}</h4> <Button label="Logout" onClick={this.props.handleLogout} /></div>

                    <Route exact path="/search" render={(routerProps) => <SearchPage {...routerProps} user={this.props.user} />} />
                    <Route exact path="/library" render={() => <LibraryPage user={this.props.user} />} />
                    <Route exact path="/playlists/:playlistId" render={(routerProps) => <PlaylistPage {...routerProps} user={this.props.user} />} />
                    <Layout>
                        <Footer>
                            <Navbar />
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

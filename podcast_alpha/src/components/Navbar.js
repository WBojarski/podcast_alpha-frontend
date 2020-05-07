import React, { Component } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import Library from './Library'
import SearchPage from './Search'
import { withRouter } from 'react-router-dom'
import '../css/navbar.css'


class Navbar extends Component {


    state = {
        items: [
            { label: "Library", icon: "pi pi-fw pi-list", command: () => { this.props.history.push('/library') }, component: () => <Library /> },
            { label: "Search", icon: "pi pi-fw pi-search", command: () => { this.props.history.push('/search') }, component: () => <SearchPage /> }

        ]
    }
    render() {
        return (
            <div className="navbar ">
                <TabMenu className="p-tabmenuitem	" model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => this.setState({ activeItem: e.value })} />


            </div>
        )
    }
}

export default withRouter(Navbar)

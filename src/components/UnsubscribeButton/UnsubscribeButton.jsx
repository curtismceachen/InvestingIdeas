import {Component} from 'react'
import React from 'react'
import {Link} from 'react-router-dom'

export default class SubscribeButton extends Component {

    state = {
        user: false,
        subscriber: false
    }

    handleUnsubscribe = async (id) => {
        let body = {userId: this.props.user._id, pubId: id}
        let options = {
            method: 'Put', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        let response = await fetch('/api/users/removeSubscription', options)
            let data = await response.json()
            this.props.setUserInState(data)
    }

    componentDidMount() {
        this.setState({
            user: this.props.user,
        })
    }

    render() {
        return (
        <Link to='/discover'>
            <button className="btn btn-success btn-sm" onClick={() => this.handleUnsubscribe(this.props.publisher._id)}>Unsubscribe</button>
        </Link>
        )
    }
}
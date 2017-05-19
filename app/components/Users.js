import React from 'react'
import User from './User'
import { getPeople } from '../xhr'

let Users = React.createClass({

  getInitialState: function() {
    return {
      users: []
    }
  },

  componentDidMount: function() {
    getPeople().then(results => {
      this.setState({
        users: results.data.results
      })
    })
  },

  render: function() {
    return (
      <div>
        <h3>Star Wars Characters:</h3>
        {this.state.users.map(user => {
          let id = user.url.split('/')[5]
          return <User name={user.name} id={id} key={user.name} />
        })}
      </div>
    )
  }
})

export default Users

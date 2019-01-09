import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import api from '../api'

class Seasons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      episodes: []
    }
  }

  componentDidMount() {
    if(this.props.location.season){
      api.getEpisodes(this.props.location.season.id)
        .then(res => this.setState({ episodes: res.data }))
    }
  }
  render() {
    const { user } = this.props;
    console.log(this.state)
    if (!user.token.jwt) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div>
        <h1>{this.props.location.season.name}</h1>
        {this.state.episodes.map((episode, key) => {
          return (
            <Link key={key} to={{ pathname: `/episodes`, episode: episode }}>
              <p>{episode.name}</p>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(Seasons)

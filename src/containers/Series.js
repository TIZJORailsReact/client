import React, { Component } from 'react'
import YouTube from 'react-youtube';
import { connect } from 'react-redux'
import { setSeries } from '../actions/user'
import { Redirect, Link } from 'react-router-dom'
import api from '../api'

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      seasons:[],
      serie:''
    }
  }

  componentDidMount(){
    if(this.props.location.serie){
      api.getSeasons(this.props.location.serie.id)
        .then(res => this.setState({ seasons: res.data}))
      this.setState({ serie: this.props.location.serie}, () => {
        this.props.setSeries(this.state.serie)
      })
    }
    else{
      this.setState({ serie: this.props.series })
      api.getSeasons(this.props.series.id)
        .then(res => this.setState({ seasons: res.data }))
    }
  }
  render() {
    const { user } = this.props;
    if (!user.token.jwt) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div>
        <h1>{this.state.serie.name}</h1>
        {this.state.seasons.map((season, key) => {
          return(
            <Link key={key} to={{ pathname: `/series/${this.state.serie.id}/seasons/${season.id}`, season: season, sid: this.state.serie.id }}>
              <p>{season.name}</p>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    series: state.user.series
  }
}

export default connect(mapStateToProps, {setSeries})(Series)

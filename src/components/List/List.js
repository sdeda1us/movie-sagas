import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_POSTERS'});
    }

    render() {
        return(
            <div>
                <ul>
                    {this.props.reduxState.movies.map(film => 
                    <li key={film.id}>{film.title} <img src={film.poster}></img></li>)}
                </ul>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapReduxStateToProps)(List);
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {
    

    render() {
        return(
            <div className="backing">
                <p id="title-text">{this.props.reduxState.movieToDetail.title}</p>
                <div className="detail-space">
                    <img src={this.props.reduxState.movieToDetail.poster} 
                                style = {{width: "185px", height: "270px"}}
                                alt="movie poster"/>
                    <div className="oswald-font">
                        <p className="red-text">Genres</p>
                        <ul>
                            {/* Maps over each genre that matches the movie in the joined returned SQL data */}
                            {this.props.reduxState.genres.map(type => <li>{type.name}</li>)}
                        </ul>
                    </div>
                    <div id="description-text">
                        <p> {this.props.reduxState.movieToDetail.description}</p>
                    </div>
                    <div calssName="button-flex-row">
                        <button className="edit-button" onClick={()=> this.props.history.push('/edit')}>Edit</button>
                        <button className="return-button" onClick={(event) => this.props.history.push('/')}>Back to List</button>
                    </div>
                </div>
            </div>
        )
    }
}

//loads redux state
const mapReduxStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapReduxStateToProps)(Details);
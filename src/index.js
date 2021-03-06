import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import Axios from 'axios'

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_POSTERS', fetchPosters);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('POST_MOVIE', postMovies);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//Makes GET request for movie route
function* fetchPosters() {
    try {
        const response = yield Axios.get('/api/movie');
        yield put({type: 'SET_MOVIES', payload: response.data})
    } catch (error) {
        console.log('error getting movie posters', error);
    }
};

//Makes GET request for Genre route
function* fetchGenres(action) {
    try {
        const response = yield Axios.get('/api/genre/' + action.payload);
        yield put({type: 'SET_GENRES', payload: response.data})
    } catch (error) {
        console.log('error getting genres', error)
    }
}

//makes POST request to movie route
function* postMovies(action) {
    try {
    yield Axios.post('/api/movie', action.payload);
    } catch (error) {
        console.log('error posting new movie', error)
    }
}

// Used to store movies returned from the server in redux
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres from the server in redux
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store specific movie to detail in details page in the redux state
const movieToDetail = (state = [], action) => {
    if (action.type === 'GET_DETAILS') {
        return action.payload;
    }
    return state;
}

//Reducers to hold form data to pass to db on submit
const setTitle = (state='', action) => {
    if(action.type === 'SET_TITLE'){
        return action.payload;
    }else if(action.type === 'CLEAR_FORMDATA') {
        return '';
    }
    return state;
}

const setURL = (state='', action) => {
    if(action.type === 'SET_URL'){
        return action.payload;
    }else if(action.type === 'CLEAR_FORMDATA') {
        return '';
    }
    return state;
}

const setDescription = (state='', action) => {
    if(action.type === 'SET_DESCRIPTION'){
        return action.payload;
    }else if(action.type === 'CLEAR_FORMDATA') {
        return '';
    }
    return state;
}

const setGenre = (state='', action) => {
    if(action.type === 'SET_GENRE'){
        return action.payload;
    }else if(action.type === 'CLEAR_FORMDATA') {
        return '';
    }
    return state;
}


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieToDetail,
        setTitle,
        setURL,
        setDescription,
        setGenre
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();

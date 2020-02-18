import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';


//
import App from './components/App';
import Welcome from './components/Welcome';
import PostAuth from "./containers/PostAuth/PostAuth";
import Map from "./containers/Map/Map";
import reducers from './reducers';



// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token')}
  },
  composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path='/' component={Welcome}/>
        <Route exact path='/auth/success'component={PostAuth}/>
        <Route exact path='/fmap' component={Map}/>
      </App>
    </Router>
  </Provider>
  , document.querySelector('#root'));

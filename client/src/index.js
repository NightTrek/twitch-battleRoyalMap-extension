import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';


//
import App from "./components/App/App"
import Welcome from "./components/Welcome/Welcome";
import PostAuth from "./containers/PostAuth/PostAuth";
import Map from "./containers/Map/Map";
import reducers from './reducers';;



// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
        auth: { authenticated: localStorage.getItem('token')},
        preStart: true
  },
  composeEnhancers(applyMiddleware(reduxThunk)));

const PrivateRoute = ({ component: Component, authToken, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                verifyLogin(authToken) === true ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                )
            }
        />
    );
};


const verifyLogin = (potentialAuth) => {
    if(potentialAuth !== undefined && potentialAuth !== null){
        let authToken = JSON.parse(potentialAuth);
        if(authToken.data !== undefined){
            return true;
        }
    }
    return false;
};


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path='/' component={Welcome}/>
        <Route exact path='/auth/success' component={PostAuth}/>
        <PrivateRoute exact path='/vote' authToken={store.auth.authenticated} component={PostAuth}/>
      </App>
    </Router>
  </Provider>
  , document.querySelector('#root'));

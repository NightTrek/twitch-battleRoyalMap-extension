import { AUTH_USER, INCREMENT_COUNTER, DECREMENT_COUNTER } from './types';
import axios from 'axios';


export const increment = () => {
  return { type: INCREMENT_COUNTER };
};

export const decrement = () => {
  return { type: DECREMENT_COUNTER };
};


export const signin = () => async dispatch => {
  // By default, actions can only return objects
  // redux thunk allows us to return whatever we want
  // We can dispatch as many actions as we want as we now have access to dispatch
  // We can also make async requests inside of our actions thanks to redux-thunk
  let localAuth = JSON.parse(localStorage.getItem('token'));
  // console.log(`local storage token ${localAuth}`);
  if(localAuth !== undefined && localAuth !== null){
    console.log("local auth success");
    console.log(localAuth);
    dispatch({ type: AUTH_USER, payload: localAuth });
  }else{
    try {
      console.log("getting user token for state.");
      const res = await axios.get('https://vote-your-landing.herokuapp.com/auth/user');
      // We are getting our token back from res.data.token
      // We want to send this token to our reducer
      console.log("res.data");
      console.log(res.data);
      if(res.data !== "[Object, Object]" &&  res.data !== "Bad Credential") {
        console.log("dispatch");
        dispatch({ type: AUTH_USER, payload: res.data });
        localStorage.setItem('token', JSON.stringify(res.data));
      }

      // callback();
    } catch(e) {
      // callback()
      console.log(e);
      // dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
  }


};


export const signout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  };
};



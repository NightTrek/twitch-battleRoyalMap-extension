
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Signin extends Component {

  render(){
    return (
        <div>
          <div>
              <a href="http://localhost:3001/auth/twitch"><img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"/></a>
          </div>
      </div>
    )
  }
}


// Pull out the error message from our authReducer
function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

// Redux form takes an options object.
// The first key will be what you want to name the form

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin'})
)(Signin);

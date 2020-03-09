import React from "react";
// import axios from "axios";
import { connect } from 'react-redux';


class Userinfo extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            isLoading: true,
            errors: null
        };

    }



  componentDidMount() {
    // console.log(this.props.userData)
      if(this.props.userData){
          let currentState= this.state;
          currentState.isLoading = false;
          this.setState(currentState);
      }

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
      // console.log(this.props.userData)
      if(this.props.userData && this.state.isLoading){
          let currentState= this.state;
          currentState.isLoading = false;
          currentState.user = this.props.userData;
          this.setState(currentState);

      }
  }

    render() {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <div>
          {!isLoading ? (
              <div>
                  <div>
                      <img src={this.state.user.profile_image_url} alt={"profilepic"} width={"50%"}/>
                  </div>
                  <h3>{this.state.user.login}</h3>
                  <p>{this.state.user.email}</p>
                  <hr />
              </div>
          ) : (
            <p>Press Start to Access</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}
export default connect(mapStateToProps, null)(Userinfo);
// export default PostAuth;

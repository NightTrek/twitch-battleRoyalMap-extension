import React from "react";
// import axios from "axios";
import { connect } from 'react-redux';


class Userinfo extends React.Component  {

state = {
    users: [],
    isLoading: true,
    errors: null
  };

  // getUsers() {
  //   axios
  //     .get("http://localhost:3001/auth/user")
  //     .then(response =>
  //       response.data.results.map(profile => ({
  //         name: `${profile.data[0].display_name}`,
  //         email: `${profile.data[0].email}`,
  //         image: `${profile.data[0].profile_img_url}`
  //       }))
  //     )
  //     .then(users => {
  //       this.setState({
  //         users,
  //         isLoading: false
  //       });
  //     })
  //     .catch(error => this.setState({ error, isLoading: false }));
  // }
  //
  componentDidMount() {
    // console.log(this.props.auth.data[0].login)
      // const User = {
    //     namel: ,
    //     email: ,
    //     IMG: ,
    // }
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <React.Fragment>
        <h2>Random User</h2>
        <div>
          {!isLoading ? (
            users.map(user => {
              // const { name, email, image } = user;
              return (
                <div>
                  <p>{this.props.auth.data[0].login}</p>
                  <div>
                    <img src={this.props.auth.data[0].profile_image_url} alt={"profilepic"} />
                  </div>
                  <p>{this.props.auth.data[0].email}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
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

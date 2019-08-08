import React from "react";
import axios from "axios";

class Userinfo extends React.Component  {

state = {
    users: [],
    isLoading: true,
    errors: null
  };

  getUsers() {
    axios
      .get("http://localhost:3001/auth/user")
      .then(response =>
        response.data.results.map(user => ({
          name: `${user.display_name}`,
          email: `${user.email}`,
          image: `${user.profile_img_url}`
        }))
      )
      .then(users => {
        this.setState({
          users,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <React.Fragment>
        <h2>Random User</h2>
        <div>
          {!isLoading ? (
            users.map(user => {
              const { name, email, image } = user;
              return (
                <div>
                  <p>{name}</p>
                  <div>
                    <img src={image} alt={name} />
                  </div>
                  <p>{email}</p>
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

export default Userinfo;
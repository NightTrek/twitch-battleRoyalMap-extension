import React, {Component} from 'react';
import { signin} from "../actions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Welcome extends Component {
    render() {

        console.log(this.props);
        return(
            <div>
                <h1>Vote your Landing</h1>
                <div>
                    <p> The Twitch extension where you can vote for a landing spot</p>
                </div>
                <div>
                    <a href='http://localhost:3001/auth/twitch'>Start</a>
                </div>
            </div>
        );
    }
}

export default connect(null, { signin })(Welcome);


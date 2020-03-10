import React, {Component} from 'react';


//import css
import '../../default.css';
import "./style.css";

class AuthModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn:false,
            redirect:false,
        }

    }


    render() {
        return (
            <div className={"flexColumn"}>
                <div className={"flexRow"}>
                    <iframe src={"http://localhost:3001/auth/twitch"} className={"authFrame"} title={"Twitch Authentication Window"} referrerpolicy={"unsafe-url"}> </iframe>
                </div>
            </div>
        );
    }
}

export default AuthModal;
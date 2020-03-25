import React, {Component} from 'react';
import { connect } from 'react-redux';
import SlideImages from '../Slideimages/Slideimages'
import * as actions from '../../actions';
// import axios from "axios";
// import AuthModal from "../../containers/AuthModal/AuthModal";


//import react components




class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAuthModal:false,
            auth:null,
            autoRedirectToVotePage:false
        };
        this.firstTimeLogin = this.firstTimeLogin.bind(this);
        this.reLogin = this.reLogin.bind(this);

    }
    componentDidMount() {
        this.props.signin();
        let cState = this.state;
        let justLoggedIn = window.localStorage.getItem("LoggedIn");
        //check if props.signin() worked and if it did check if the user just logged in. and direct to either the vote page or the welcome page depending.
        if(this.props.auth !== undefined && this.props.auth !== null){
            console.log("checking to see if auth.data is valid");
            console.log(this.props.auth);
            let parsedAuth = this.props.auth;
            //check to see if the value needs to be parsed
            if(typeof this.props.auth === "string"){
                parsedAuth = JSON.parse(this.props.auth);
            }
            if(parsedAuth.data !== undefined){

                cState.showAuthModal = true;
                console.log(`justLoggedIn ${justLoggedIn}`);
                if(justLoggedIn === true){
                    this.reLogin();
                }

            }
        }
        this.setState(cState);
    }

    reLogin(){
        this.props.history.push('/vote')
    }

    firstTimeLogin(){
        window.localStorage.setItem("LoggedIn", "true");

    }

    render() {
        return(
            <div className={"flexContainer pageContainer"} style={{margin:"70px auto"}}>
                    <h1>Vote your Landing</h1>
                    <div className={"flexRow"}>
                        <div className={"flexContainer textBox"}>
                                <h5>Tell your favorite streamer where to Land</h5>
                                <p> The Twitch extension where you can vote for a landing spot in BattleRoyal Games.
                                    Streamers can request their viewers vote on where to land all on a live map of the votes.
                                    Our Advanced algorithms weights those votes and comes up with an single point to land.
                                    Viewers can pay streamers with bits to make their vote come on top! </p>
                        </div>
                        <div className={"flexContainer textBox"}>
                                <h5>Current Games Supported</h5>
                                <p>Right now we only support Fortnite Battle Royal but we plan to add support for the follow games soon</p>
                                <ul>
                                    <li>Fortnite</li>
                                    <li>Apex Legends                    (coming soon)</li>
                                    <li>Player Unknowns BattleGrounds   (coming soon)</li>
                                    <li>H1Z1                            (coming soon)</li>
                                    <li>Ring of Elysuim//                 (coming soon)</li>
                                </ul>
                        </div>
                    </div>
                {this.state.showAuthModal ? (
                    <div className={"flexRow"}>

                        <div className={"startButton"} onClick={this.reLogin}>
                            <h3 className={"btn-text"}> Start Voting Now</h3>
                        </div>
                    </div>
                ) :(
                        <div className={"flexRow"}>
                            <div className ="startButton" onClick={this.firstTimeLogin}>
                                {/*<Button className={"button-Start"} >Push button to start</Button>{' '}*/}
                                <a href={'https://vote-your-landing.herokuapp.com/auth/twitch'}> <h3 className={"btn-text"}> Login With Twitch to start voting</h3></a>
                            </div>
                        </div>
                    )}
                    <div className={"flexRow"}>
                        <div className={"flexContainer sliderContainer"}>
                            <SlideImages />
                        </div>
                    </div>
            </div>
        );
}
}
function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(Welcome);


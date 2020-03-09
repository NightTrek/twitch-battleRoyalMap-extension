import React, {Component} from 'react';
import { signin} from "../../actions";
import { connect } from 'react-redux';
import SlideImages from '../Slideimages/Slideimages'
import axios from "axios";
import AuthModal from "../../containers/AuthModal/AuthModal";


//import react components




class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAuthModal:false
        };

        this.showAuthModal = this.showAuthModal.bind(this);
    }

    showAuthModal(){
        if(this.state.auth === null || this.props.auth == undefined && this.props.auth !== null && this.props.auth.data !== undefined){

        }
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
                {this.state.showAuthModal ? (<AuthModal/>) :
                    (
                        <div className={"flexRow"}>
                            <div className ="startButton"  >
                                {/*<Button className={"button-Start"} >Push button to start</Button>{' '}*/}
                                <h3 className={"btn-text"}> Start Voting Now</h3>
                            </div>
                        </div>
                    )}

                        {/*<a href='http://localhost:3001/auth/twitch'><button>Start</button></a>*/}
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

export default connect(mapStateToProps, { signin })(Welcome);


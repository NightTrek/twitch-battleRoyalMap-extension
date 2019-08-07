import React, {Component} from 'react';
import { signin} from "../actions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


//import react components
// import navbar from 'navbar'
import Container from './Partials/Container';
import Column from './Partials/Column';
import Row from './Partials/Row';
import ColorDisplayPanel from './Partials/ColorDisplayPanel';
class Welcome extends Component {

    render() {

        console.log(this.props);
        return(
            <div className={"bg-info"}>
                {/*<NavBar>*/}
                <Container>
                    <Row><h1>Vote your Landing BattleRoyal </h1></Row>
                    <Row>
                        <Column small={12} large={6}>
                            <ColorDisplayPanel color={"bg-success"} textColor={"bg-dark"}>
                                <h5>Tell your favorite streamer where to Land</h5>
                                <p> The Twitch extension where you can vote for a landing spot in BattleRoyal Games.
                                Streamers can request their viewers vote on where to land all on a live map of the votes.
                                    Our Advanced algorithms weights those votes and comes up with an single point to land.
                                    Viewers can pay streamers with bits to make their vote come on top! </p>
                            </ColorDisplayPanel>
                        </Column>
                        <Column small={12} large={6}>
                            <ColorDisplayPanel color={"bg-success"} textColor={"bg-dark"}>
                                <h5>Current Games Supported</h5>
                                <p>Right now we only support Fortnite Battle Royal but we plan to add support for the follow games soon</p>
                                <ul>
                                    <li>Fortnite Live map Data</li>
                                    <li>Apex Legends</li>
                                    <li>Player Unknowns BattleGrounds</li>
                                    <li>H1Z1</li>
                                    <li>Ring of Elysuim</li>
                                </ul>
                            </ColorDisplayPanel>
                        </Column>
                    </Row>
                    <Row>
                        <Column small={12} large={12}><a href='http://localhost:3001/auth/twitch'><button>Start</button></a></Column>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect(null, { signin })(Welcome);


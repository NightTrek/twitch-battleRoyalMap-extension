import React, {Component} from 'react';
import { signin} from "../actions";
import { connect } from 'react-redux';
import SlideImages from './Slideimages/Slideimages'


//import react components

// import navbar from 'navbar'
import Column from './Partials/Column';
import Row from './Partials/Row';
import { Jumbotron, Container, Button} from 'reactstrap';


class Welcome extends Component {

    render() {

        console.log(this.props);
        return(
            <div>
                <Container>
                    <Jumbotron>
                    <h1 className="display-4 jumbomain">Vote your Landing BattleRoyal </h1>
                    <Row>
                        <Column small={12} large={6}>
                                <h5>Tell your favorite streamer where to Land</h5>
                                <p> The Twitch extension where you can vote for a landing spot in BattleRoyal Games.
                                Streamers can request their viewers vote on where to land all on a live map of the votes.
                                    Our Advanced algorithms weights those votes and comes up with an single point to land.
                                    Viewers can pay streamers with bits to make their vote come on top! </p>
                        <a className ="btn_start" href='http://localhost:3001/auth/twitch'><Button outline color="primary">Push button to start</Button>{' '}</a>
  
                        </Column>
                        <Column small={12} large={6}>
                                <h5>Current Games Supported</h5>
                                <p>Right now we only support Fortnite Battle Royal but we plan to add support for the follow games soon</p>
                                <ul>
                                    <li>Fortnite Live map Data</li>
                                    <li>Apex Legends</li>
                                    <li>Player Unknowns BattleGrounds</li>
                                    <li>H1Z1</li>
                                    <li>Ring of Elysuim</li>
                                </ul>
                        </Column>
                    </Row>
                        {/*<a href='http://localhost:3001/auth/twitch'><button>Start</button></a>*/}
                    <Row>
                        <SlideImages />
                    </Row>
                    </Jumbotron>
                </Container>
            </div>
        );
}
}

export default connect(null, { signin })(Welcome);


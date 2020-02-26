import React, {Component} from 'react';
import { signin} from "../../actions";
import { connect } from 'react-redux';
import SlideImages from '../Slideimages/Slideimages'


//import react components

// import navbar from 'navbar'
import Column from '../Partials/Column';
import Row from '../Partials/Row';
import { Container, Button} from 'reactstrap';


class Welcome extends Component {

    render() {

        console.log(this.props);
        return(
            <div>
                <Container>
                    <h1 className="display-4 jumbomain">Vote your Landing</h1>
                    <Row>
                        <Column small={12} large={6}>
                                <h5>Tell your favorite streamer where to Land</h5>
                                <p> The Twitch extension where you can vote for a landing spot in BattleRoyal Games.
                                    Streamers can request their viewers vote on where to land all on a live map of the votes.
                                    Our Advanced algorithms weights those votes and comes up with an single point to land.
                                    Viewers can pay streamers with bits to make their vote come on top! </p>
                        </Column>
                        <Column small={12} large={6}>
                                <h5>Current Games Supported</h5>
                                <p>Right now we only support Fortnite Battle Royal but we plan to add support for the follow games soon</p>
                                <ul>
                                    <li>Fortnite</li>
                                    <li>Apex Legends                    (coming soon)</li>
                                    <li>Player Unknowns BattleGrounds   (coming soon)</li>
                                    <li>H1Z1                            (coming soon)</li>
                                    <li>Ring of Elysuim                 (coming soon)</li>
                                </ul>
                        </Column>
                    </Row>
                        <Row>
                            <a style={{width:"5000px",height:"200px"}} className ="btn_start" href='http://localhost:3001/auth/twitch'>
                                <Button className={"button-Start"} >Push button to start</Button>{' '}
                            </a>
                        </Row>
                        {/*<a href='http://localhost:3001/auth/twitch'><button>Start</button></a>*/}
                    <Row>
                        <SlideImages />
                    </Row>
                </Container>
            </div>
        );
}
}

export default connect(null, { signin })(Welcome);


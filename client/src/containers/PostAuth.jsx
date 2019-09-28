import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import axios from 'axios';


//import react components
import '../containers/PostAuth.css'
import Container from './../components/Partials/Container';
import Column from './../components/Partials/Column';
import Row from './../components/Partials/Row';
import Fmap from '../containers/mapComponent/Fmap';


class PostAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            joinSessionID:"",
            sessionID:null,
            voteArray:null,
            newSessionTime:"",
            showMap:false
        };

        this.sessionValidHandler = this.sessionValidHandler.bind(this);
        this.startSessionHandler = this.startSessionHandler.bind(this);
        this.validateSession = this.validateSession.bind(this);
        this.startNewSession = this.startNewSession.bind(this);
    }
    componentDidMount() {
        this.props.signin()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.sessionId === null && prevState.showMap){
            let currentState = prevState;
            currentState.showMap =false;
            this.setState(currentState);
        }
    }


    sessionValidHandler(event){
            let newState = {joinSessionID: event.target.value};
            this.setState(newState);
    }

    async validateSession(){
        let currentSessionID = this.state.joinSessionID;
        let ValidSessionID = await axios.post('http://localhost:3001/api/validsession', {sessionId:currentSessionID});
        console.log(ValidSessionID);
        if(ValidSessionID.data !== "error invalid session"){
            console.log(ValidSessionID.data);
            let currentState =this.state;
            currentState.sessionID = currentSessionID;
            currentState.showMap = true;
            this.setState(currentState);
        }else{
            this.setState({joinSessionID:"INVALID SESSION ID"});
        }
    }

    startSessionHandler(event){
        let newState = {newSessionTime:event.target.value};
        this.setState(newState);
    }

    async startNewSession(){
        // if(this.props.auth.data){
        //
        // }
        let theNewSession = await axios.post('http://localhost:3001/api/startsession', {data:{email:this.props.auth.data[0].email,VoidTime:this.state.newSessionTime}});
        console.log(theNewSession);
        if(theNewSession.data !== "error invalid session"){
            let currentState =this.state;
            currentState.showMap = true;
            currentState.sessionID = theNewSession.data['_id'];
            currentState.voteArray = theNewSession.data['voteArray'];
            this.setState(currentState);
        }else{
            this.setState({joinSessionID:"INVALID SESSION ID"});
        }
    }

    render() {
        return (
            <div className="PostAuthC">
                <Container>
                    {this.state.showMap ? (
                        <div>
                            <Fmap sessionID={this.state.sessionID} voteArray={this.state.voteArray}/>
                        </div>
                    ) : (
                        <div>
                            <Row><h1>Pick your journey either start a vote or join a session</h1></Row>
                            <Row>
                                <div style={{padding:"5vh"}}></div>
                            </Row>
                            <Row>
                                <Column small={12} large={6} medium={6}>
                                    <div className="startSession">
                                        <h5>Start A session</h5>
                                        <p>Pick how long you want the vote to go for!</p>
                                        <label>Number Of seconds till vote ends </label>
                                        <input type={"text"} value={this.state.newSessionTime} onChange={this.startSessionHandler}></input>
                                        <button onClick={this.startNewSession}>submit</button>
                                    </div>

                                </Column>
                                <Column small={12} large={6} medium={6}>
                                    <div className="joinSession">
                                        <h5>Join A session</h5>
                                        <p>Input your session id here</p>
                                        <input type={"text"} value={this.state.joinSessionID} onChange={this.sessionValidHandler}></input>
                                        <button onClick={this.validateSession}>submit</button>
                                    </div>
                                </Column>
                            </Row>
                        </div>
                    )}
                </Container>
            </div>
        );
    }
}
function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(PostAuth);
// export default PostAuth;

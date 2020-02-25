import React, {Component} from 'react';
import axios from "axios";
import moment from "moment";
import Column from "../../components/Partials/Column";

import network from "../../img/network.svg";
import start from "../../img/start-button.svg";
import './SessionTree.css';
import {connect} from "react-redux";
import * as actions from "../../actions";

const ShowSessionAPI = (props) => {
    if(props.state.newSession){
        return (
            <div className={"flexContainer"}>
                <div className="startSession">
                    <div className={"sessionText"}>
                        <h3 >Start A session</h3>
                        <p>Pick how long you want the vote to go for!</p>
                    </div>
                    <div>
                        <label className={"sessionLabel"}>Number Of seconds till vote ends </label>
                        <input className={"sessionIn"} type={"text"} value={props.state.newSessionTime} onChange={props.startSessionHandler}></input>
                    </div>
                    <div className={"flexRow"} id={"buttonRow"}>
                        <button className={"startSessionButton"} >Back</button>
                        <button className={"startSessionButton"} onClick={props.startNewSession}>submit</button>
                    </div>
                </div>
            </div>);
    }
    if(props.state.joinSession){
        return (
            <div className={"flexContainer"}>
                <div className="joinSession">
                    <h3>Join A session</h3>
                    <p>Input your session id here</p>
                    <input type={"text"} value={props.state.joinSessionID} onChange={props.sessionValidHandler}></input>
                    <button onClick={props.validateSession}>submit</button>
                </div>
            </div>
        );
    }
};




class SessionTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newSession:false,
            joinSession:false,
            joinSessionID:"",
            sessionID:null,
            voteArray:null,
            sessionTimeRemaining:null,
            newSessionTime:"",
        };
        this.sessionValidHandler = this.sessionValidHandler.bind(this);
        this.startSessionHandler = this.startSessionHandler.bind(this);
        this.validateSession = this.validateSession.bind(this);
        this.startNewSession = this.startNewSession.bind(this);
        this.newSessionButton = this.newSessionButton.bind(this);
        this.joinSessionButton = this.joinSessionButton.bind(this);
    }

    sessionValidHandler(event){
        let newState = {joinSessionID: event.target.value};
        this.setState(newState);
    }

    async validateSession(){
        let currentSessionID = this.state.joinSessionID;
        let ValidSessionID = await axios.post('http://localhost:3001/api/validsession', {sessionId:currentSessionID});
        console.log(ValidSessionID);
        if(ValidSessionID.data !== "error invalid session" && ValidSessionID.data !== "error Session Expired"){
            let currentState =this.state;
            currentState.sessionID = currentSessionID;
            currentState.voteArray = ValidSessionID.data.voteArray;
            currentState.showMap = true;
            currentState.sessionTimeRemaining = ValidSessionID.data.sessionVoidTime - moment().unix();
            this.setState(currentState);
            this.props.that.setState(currentState);
        }else{
            if(ValidSessionID.data === "error Session Expired"){
                this.setState({joinSessionID:"EXPIRED SESSION ID"});
            }

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
        // } TODO check if session time is valid. ensure there isnt negative session times. or change to slider
        let VoidTime = moment().unix()+parseInt(this.state.newSessionTime);
        console.log(VoidTime);
        let theNewSession = await axios.post('http://localhost:3001/api/startsession', {data:{email:this.props.auth.data[0].email,VoidTime:VoidTime}});
        console.log(theNewSession);
        if(theNewSession.data !== "error invalid session"){
            let currentState =this.state;
            currentState.showMap = true;
            currentState.sessionID = theNewSession.data['_id'];
            currentState.voteArray = theNewSession.data['voteArray'];
            currentState.sessionTimeRemaining = this.state.newSessionTime;
            this.setState(currentState);
            this.props.that.setState(currentState);
        }else{
            this.setState({joinSessionID:"INVALID SESSION ID"});
        }
    }

    showTree(){
        if(this.state.newSession === false && this.state.joinSession === false){
            return true;
        }else{return false;}
    }
    newSessionButton(){
        let cstate = this.state;
        cstate.newSession = true;
        this.setState(cstate);
    }
    joinSessionButton(){
        let cstate = this.state;
        cstate.joinSession = true;
        this.setState(cstate);
    }

    render() {
        return (
            <div>
                {this.showTree() ? (
                        <div className={"flexRow"}>
                            <div className={'sessionTreeButton'} onClick={this.newSessionButton} >
                                    <img src={start} alt={"Star session icon"} className={"sessionButtonIcon"}/>
                                    <h5 className={"sessionButtonText"}> Start a new session</h5>
                            </div>
                            <div className={"sessionTreeButton"} onClick={this.joinSessionButton}>
                                    <img src={network} alt={"Join session icon"} className={"sessionButtonIcon"}/>
                                    <h5 className={"sessionButtonText"}> Join Session</h5>
                            </div>
                        </div>
                ):(
                    <ShowSessionAPI state={this.state}  sessionValidHandler={this.sessionValidHandler} startSessionHandler={this.startSessionHandler}
                                    validateSession={this.validateSession} startNewSession={this.startNewSession}/>
                )}
            </div>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(SessionTree);

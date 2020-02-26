import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


//import react components
import './PostAuth.css'
import SessionTree from "../SessionTree/SessionTree";
import Fmap from '../mapComponent/Fmap';
import CountDown from "../CountDown/CountDown";

class PostAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            joinSessionID:"",
            sessionID:null,
            voteArray:null,
            sessionTimeRemaining:null,
            newSessionTime:"",
            showMap:false
        };

        this.backToSessionTree = this.backToSessionTree.bind(this);
        this.copyLink = this.copyLink.bind(this);
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

//copy The sesion id from state to the users clipboard
    async copyLink(){
        try{
            console.log("trying to copy");
             await navigator.clipboard.writeText(""+ this.state.sessionID);
        }catch(e){
            console.log(e)
        }
    }
    backToSessionTree(){
        let cstate = this.state;
        cstate.showMap = false;
        this.setState(cstate);
    }

    render() {
        return (
            <div className="PostAuthC">
                    {this.state.showMap ? (
                        <div className={"flexContainer mapbox"} style={{width:860}}>
                            <div className={"flexRow topBar"}>
                                <CountDown timeleft={this.state.sessionTimeRemaining}/>
                                <div className={"spacer"}>
                                </div>
                                <h5>Session ID:</h5>
                                <h5>{this.state.sessionID}</h5>
                            </div>
                            <div className={"flexRow topBar"}>
                                <button className={"cpButton"} onClick={this.backToSessionTree}>Back</button>
                                <div className={"spacer"}>
                                </div>
                                <button className={"cpButton"} onClick={this.copyLink}>copy ID</button>
                            </div>
                            <Fmap sessionID={this.state.sessionID} voteArray={this.state.voteArray}/>
                        </div>
                    ) : (
                        <SessionTree  that={this}/>
                    )}
            </div>
        );
    }
}
function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(PostAuth);
// export default PostAuth;

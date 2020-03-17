import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


//import react components
import './PostAuth.css'
import SessionTree from "../SessionTree/SessionTree";
import Fmap from '../mapComponent/Fmap';

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
        window.localStorage.setItem("LoggedIn", null);
        this.backToSessionTree = this.backToSessionTree.bind(this);

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


    backToSessionTree(){
        let cstate = this.state;
        cstate.showMap = false;
        this.setState(cstate);
    }

    render() {
        return (
            <div className="PostAuthC">
                    {this.state.showMap ? (
                        <div className={"flexContainer"} style={{width:860}}>
                            <Fmap sessionID={this.state.sessionID} voteArray={this.state.voteArray}
                                  sessionTimeRemaining={this.state.sessionTimeRemaining}
                                  backToSessionTree={this.backToSessionTree}/>
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

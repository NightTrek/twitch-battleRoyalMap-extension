import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";
import fortniteMap from "../../img/FORTNITESEASON10MAP.jpg"
import {connect} from "react-redux";
import * as actions from "../../actions";
import CountDown from "../CountDown/CountDown";
import h337 from "heatmap.js";

import "../PostAuth/PostAuth.css";
import "./style.css";
const startingData = [{ x: 0, y: 0, amount: 30 },
    { x: 50, y: 55, amount: 40 },
    { x: 95, y: 85, amount: 25 },
    { x: 152, y: 120, amount: 10 },
    { x: 250, y: 220, amount: 45 }];






class Fmap extends Component {
    constructor(props){
        super(props);
        let mapIMG = fortniteMap;
         let currentSessionID, currentVoteArray;
        if(props.sessionID && props.voteArray){
            currentSessionID = props.sessionID;
            currentVoteArray = props.voteArray;
        }else{
            currentVoteArray = startingData;
            currentSessionID = "agasdfaegasdgae";
        }

        //TODO we need to set canVote depending on if the User has voted already
        //TODO we also need to prevent the USer From voting if they arent allowed too or the time runs out.
        this.state = {
            sessionId:currentSessionID,
            auth:null,
            coordsArray: currentVoteArray,
            currentVote: {},
            canVote:true,
            singleVote:false,
            showBasicVotes:true,
            currentMap: mapIMG,
            imgCoords: {x:0,y:0},
            heatmap:null
        };

        this.endSession = this.endSession.bind(this);
        this.doubleClick = this.doubleClick.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.mouseUp = this.mouseUp.bind(this);



    }


    async componentDidMount(props) {

        let currentState = this.state;
        this.generateHeatmap(currentState);
        this.setState(currentState);
        this.mapUserInfoToState(this.props, this.state);
        // console.log(this.state.auth);
        console.log("component mounted");

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.mapUserInfoToState(prevProps,prevState);
    }

    mapUserInfoToState(props, prevState){
        // console.log(prevState.auth);
        if(prevState.auth == null && props.auth.data){
            console.log("maping auth to state");
            let currentState = this.state;
            currentState.auth = props.auth.data[0];
            this.setState(currentState);
        }

    }

    //takes the old array of votes a1 and the new array a2 and returns an array of new votes.
    getNewVotesFromArrays(a1, a2) {

        let a = [], diff = [];

        for (let i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (let i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (let k in a) {
            diff.push(k);
        }

        return diff;
    }

    mouseDown(evt){
        console.log("mouse Down event");
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        let newlastX = evt.nativeEvent.offsetX;
        let newlastY = evt.nativeEvent.offsetY;
        // console.log(`evt X ${evt.pageX} evt Y ${evt.pageY}  actual value X ${newlastX}  Y ${newlastY}`);
        let currentState = this.state;
        currentState.currentVote = {x:newlastX, y:newlastY, value:1};
        this.setState(currentState);
        // console.log(this.state);
    }

    mouseMove(evt) {
        // console.log("mouse move event");
        let newlastX = evt.nativeEvent.offsetX || (evt.pageX - this.state.heatmap.offsetLeft);
        let newlastY = evt.nativeEvent.offsetY || (evt.pageY - this.state.heatmap.offsetTop-70);
        // console.log(`offsetX ${evt.nativeEvent.offsetX} offsetY ${evt.nativeEvent.offsetY}  pageX ${evt.pageX} pageY ${evt.pageY} `);
        let currentState = this.state;
        currentState.currentVote = {x:newlastX, y:newlastY, value:30};
        this.setState(currentState);}

    mouseUp(evt){
        console.log("mouse up ")
    }

    endSession(){
        let currentState = this.state;
        currentState.canVote = false;
        console.log(currentState.heatmap.getDataURL());
        this.setState(currentState);
        //TODO when the time runs out end the session
        //TODO Change font to something other than defualt
    }

    generateHeatmap(currentState, newVoteArray=currentState.coordsArray){
        currentState.heatmap = h337.create({
            container: document.querySelector('.heatmap'),
            radius: 50
        });
        let nuConfig = {
            maxOpacity: .8,
            minOpacity: 0.2,
            blur: .85,
            gradient: {
                // enter n keys between 0 and 1 here
                // for gradient color customization
                '.3': 'blue',
                '.4': 'red',
                '.8': 'green',
                '.9': 'transparent'
            }
        };
        currentState.heatmap.configure(nuConfig);
        for (let votes in newVoteArray){
            currentState.heatmap.addData(newVoteArray[votes]);
        }
    }

    async doubleClick(evt){
        console.log("Double click event");
        if(this.state.canVote){
            let currentState = this.state;
            // if(this.state.canVote){
            try{
                console.log("adding data to heatmap");
                currentState.heatmap.addData(currentState.currentVote);
                let response = await this.sendVote(currentState.currentVote);
                console.log(response);

                this.generateHeatmap(currentState, response.voteArray);

                currentState.coordsArray = response.voteArray;
                // let data = {
                //     max: 60,
                //     min: 0,
                //     data: response.voteArray
                // };
                // currentState.heatmap.setData(data);
            }
            catch(err){
                console.log(err);
            }
            // }
            if(this.state.singleVote){
                currentState.canVote = false;
            }
            this.setState(currentState);
        }
    }

    async sendVote(vote) {
        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        try {
            console.log(this.state.sessionId);
            const response = await axios.post('https://vote-your-landing.herokuapp.com/api/SendVote', {data:{
                    email:this.state.auth.email,
                    sessionId: this.state.sessionId,
                    vote:vote,
                    timestamp: moment().unix()
                }});
            return new Promise((pass,fail) => {
                if(response){
                    // console.log('Returned data:', response);
                    pass(response.data);
                }else{
                    fail(response);
                }
            })
        } catch (e) {

            console.log(`Axios request failed: ${e}`);
        }

    }

    //copy The sesion id from state to the users clipboard
    async copyLink(){
        try{
            console.log("trying to copy");
            await navigator.clipboard.writeText(""+ this.props.sessionID);
        }catch(e){
            console.log(e)
        }
    }



    render() {
        return (
            <div>
                <div className={"flexContainer mapbox"} style={{width:860}}>
                    <div className={"flexRow topBar"}>
                        <CountDown timeleft={this.props.sessionTimeRemaining} callback={this.endSession}/>
                        <div className={"spacer"}>
                        </div>
                        <h5>Session ID:</h5>
                        <h5>{this.props.sessionID}</h5>
                    </div>
                    <div className={"flexRow topBar"}>
                        <button className={"cpButton"} onClick={this.props.backToSessionTree}>Back</button>
                        <div className={"spacer"}>
                        </div>
                        <button className={"cpButton"} onClick={this.copyLink}>copy ID</button>
                    </div>
                    <div className={"heatmap"} onMouseDown={this.mouseDown} onMouseMove={this.mouseMove}
                         onDoubleClick={this.doubleClick}>
                        <img src={this.state.currentMap} alt={"Current Map"} width={800} height={800}/>
                    </div>

                </div>
            </div>
        );
    }


}

function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(Fmap);

// export default Fmap;

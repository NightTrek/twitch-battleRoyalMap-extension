import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";
import fortniteMap from "../../img/FORTNITESEASON10MAP.jpg"
import {connect} from "react-redux";
import * as actions from "../../actions";
import CountDown from "../CountDown/CountDown";
import h337 from "heatmap.js";

import "../PostAuth/PostAuth.css";

const startingData = [{ x: 0, y: 0, amount: 30 },
    { x: 50, y: 55, amount: 40 },
    { x: 95, y: 85, amount: 25 },
    { x: 152, y: 120, amount: 10 },
    { x: 250, y: 220, amount: 45 }];






class Fmap extends Component {
    constructor(props){
        super(props);
        const canvas = this.refs.canvas;
        let mapIMG = new Image();
        mapIMG.src = fortniteMap;
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
            currentMap: mapIMG,
            canvasRef:{},
            canvas:canvas,
            imgCoords: {x:0,y:0},
            heatmap:null
        };

        this.createHeatMap = this.createHeatMap.bind(this);
        this.doubleClick = this.doubleClick.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.mouseUp = this.mouseUp.bind(this);



    }


    async componentDidMount(props) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        let currentState = this.state;
        currentState.canvasRef = ctx;
        currentState.canvas = canvas;
        // currentState.heatmap = h337.create({
        //     container: document.querySelector('.heatmap'),
        //     radius: 50
        // });
        // let nuConfig = {
        //     maxOpacity: .8,
        //     minOpacity: 0.2,
        //     blur: .85,
        //     gradient: {
        //         // enter n keys between 0 and 1 here
        //         // for gradient color customization
        //         '.5': 'blue',
        //         '.8': 'red',
        //         '.95': 'white'
        //     }
        // };
        // currentState.heatmap.configure(nuConfig);
        this.setState(currentState);
        this.updateCanvas();
        this.mapUserInfoToState(this.props, this.state);
        // console.log(this.state.auth);
        console.log("component mounted");

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.mapUserInfoToState(prevProps,prevState);
        this.updateCanvas();
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

    updateCanvas(){
        //https://codepen.io/techslides/pen/zowLd
        //https://www.kempsterrrr.xyz/handling-scroll-events-in-react/
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
            // Clear the entire canvas// and than redraw the image
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.drawImage(this.state.currentMap,0,0, canvas.width, canvas.height);
            //add the array of Votes
            ctx.fillStyle = "#ff0000";
            this.state.coordsArray.map( (item)=>{
                return ctx.fillRect(item.x, item.y,10,10);
            });
            // let heatMapData = {
            // max: 100,
            // min: 0,
            // data: this.state.coordsArray
            // };
            // this.state.heatmap.setData(heatMapData);
            //show development cursor
        if(this.state.canVote !== true){
            ctx.fillStyle = "#00ff45";
            ctx.fillRect(this.state.currentVote.x+this.state.imgCoords.x, this.state.currentVote.y+this.state.imgCoords.y,25,25);
        }else {
            ctx.fillStyle = "#00ff45";
            ctx.fillRect(this.state.currentVote.x + this.state.imgCoords.x, this.state.currentVote.y + this.state.imgCoords.y, 5, 5);
        }


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
        let newlastX = evt.nativeEvent.offsetX || (evt.pageX - this.state.canvas.offsetLeft);
        let newlastY = evt.nativeEvent.offsetY || (evt.pageY - this.state.canvas.offsetTop-70);
        // console.log(`offsetX ${evt.nativeEvent.offsetX} offsetY ${evt.nativeEvent.offsetY}  pageX ${evt.pageX} pageY ${evt.pageY} `);
        let currentState = this.state;
        currentState.currentVote = {x:newlastX, y:newlastY, value:30};
        this.setState(currentState);
        this.updateCanvas();
    }

    mouseUp(evt){
        console.log("mouse up ")
    }

    endSession(){
        //TODO when the time runs out end the session
        //TODO Change font to something other than defualt
    }


    async doubleClick(evt){
        let currentState = this.state;
        // if(this.state.canVote){
            try{
                let response = await this.sendVote(currentState.currentVote);
                console.log(response);
                currentState.coordsArray = response.voteArray;

            }
            catch(err){
                console.log(err);
            }
        // }
        currentState.canVote = false;
        this.setState(currentState);
    }

    async sendVote(vote) {
        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        try {
            console.log(this.state.sessionId);
            const response = await axios.post('http://localhost:3001/api/SendVote', {data:{
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

    createHeatMap(){
        console.log("creating heatmap...");
        let cstate = this.state;

        let heatMapData = {
            max: 100,
            min: 0,
            data: cstate.coordsArray
        };
        cstate.heatmap.setData(heatMapData);
        console.log(cstate.heatmap.getDataURL());
        this.setState(cstate);
    }


    render() {
        return (
            <div>
                <div className={"flexContainer mapbox"} style={{width:860}}>
                    <div className={"flexRow topBar"}>
                        <CountDown timeleft={this.props.sessionTimeRemaining} callback={this.createHeatMap}/>
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
                    <div className={"heatmap"}>
                        <canvas ref="canvas" className={"heatmap"} width={800} height={800}
                                onMouseDown={this.mouseDown} onMouseMove={this.mouseMove}
                                onDoubleClick={this.doubleClick}/>
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

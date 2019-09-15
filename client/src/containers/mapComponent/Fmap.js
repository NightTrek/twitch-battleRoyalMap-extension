import React, { Component } from 'react';
// import img from '../Map/FORTNITESEASON10MAP.jpg';
// import {VictoryScatter} from 'victory';
import axios from "axios";
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const startingData = [{ x: 1, y: 2, amount: 30 },
//     { x: 2, y: 3, amount: 40 },
//     { x: 3, y: 5, amount: 25 },
//     { x: 4, y: 4, amount: 10 },
//     { x: 5, y: 7, amount: 45 }];


class Fmap extends Component {
    state = {
        coordsArray: [],
        currentVote: {},
        currentMap:{}
    }

    componentDidMount(props) {
        this.updateCanvas();
        // this.setState({}, {})

    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        // ctx.fillRect(0,0, 100, 100);
        let map_background = new Image();
        map_background.src = 'http://localhost:3001/content/fmapseason10';
        console.log("got photo");
        map_background.onload = function(){
            console.log("image onload function go");
            let pattern = ctx.createPattern(this, "repeat");
            ctx.fillStyle = pattern;
            ctx.fill();
        };

    }

    async showCoords(event) {
        console.log(event.clientX, event.clientY,)
        let clickCoords = {x: event.clientX, y: event.clientY, z: Math.random}
        //  var coords = "X coords: " + x + ", Y coords: " + y + "Z" + z ;
        // document.getElementById("demo ").innerHTML = coords;

        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        try {
            const response = await axios.post('http://localhost:3001/api/SendVote', {data:{
                    email:"danielthespy@gmail.com",
                    sessionId: "5d4e005c005ab1312b8593d8",
                    vote:{
                        x:"42",
                        y:"42",
                        z:"3"
                    }
                }});
            console.log('Returned data:', response);
        } catch (e) {
            this.setState({currentVote: clickCoords})
            console.log(`Axios request failed: ${e}`);
        }

    }

//transparent or rgba(0, 0, 0, 0)
    render() {
        return (
            <div>
                <canvas ref="canvas" width={800} height={800} onClick={this.showCoords}/>
            </div>
        );
    }


}

export default Fmap;

import React, { Component } from 'react';
import img from '../Map/FORTNITESEASON10MAP.jpg';
import {VictoryScatter} from 'victory';
import axios from "axios";
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const startingData = [{ x: 1, y: 2, amount: 30 },
    { x: 2, y: 3, amount: 40 },
    { x: 3, y: 5, amount: 25 },
    { x: 4, y: 4, amount: 10 },
    { x: 5, y: 7, amount: 45 }];


class Fmap extends Component {
    state = {
        coordsArray: [],
        currentVote: {}
    }

    async showCoords(event) {
        console.log(event.clientX, event.clientY,)
        let clickCoords = {x: event.clientX, y: event.clientY, z: Math.random}
        //  var coords = "X coords: " + x + ", Y coords: " + y + "Z" + z ;
        // document.getElementById("demo ").innerHTML = coords;

        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        try {
            const response = await axios.post('http://localhost:3001/api/SendVote', {clickCoords: ''});
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
                <div   id="mappy" onClick={this.showCoords}>
                    <img style={{width: '90%', height: '90%',position:"absolute", top:"75px", left:"60px"}} src={img}/>
                        <VictoryScatter
                            style={{ data: { fill: "#c43a31", position:"absolute" } }}
                            bubbleProperty="amount"
                            maxBubbleSize={25}
                            minBubbleSize={5}
                            data={[
                                { x: 1, y: 2, amount: 30 },
                                { x: 2, y: 3, amount: 40 },
                                { x: 3, y: 5, amount: 25 },
                                { x: 4, y: 4, amount: 10 },
                                { x: 5, y: 7, amount: 45 }]} ></VictoryScatter>


                </div>


            </div>
        );
    }


}

export default Fmap;
//     render() {

// 		const options = {
//             backgroundColor: "transparent",
// 			animationEnabled: true,
// 			exportEnabled: true,
// 			theme: "", // "light1", "light2", "dark1", "dark2"
// 			title:{
// 				text: "Drop here!",
// 			fontSize: 26
// 			},
// 			axisX: {
// 				title: "x",
// 			logarithmic: true
// 			},
// 			axisY: {
// 				title: "y"
// 			},
// 			data: [{
// 				type: "bubble",
// 				indexLabel: "{label}",
// 				toolTipContent: "<b>{label}</b><br>:{x}<br>:{y}<br>:{z}",
// 				dataPoints: [
// 					{ label: "Mercury", x: 36, y: 452, z: 3031 },
// 					{ label: "Venus", x: 67, y: 726, z: 7521 },
// 					{ label: "Earth", x: 93, y: 285, z: 7926 },
// 					{ label: "Mars", x: 141, y: 230, z: 4222 },
// 					{ label: "Jupiter", x: 483, y: 120, z: 88729 },
// 					{ label: "Saturn", x: 886, y: 88, z: 74600 },
// 					{ label: "Uranus", x: 1784, y: 59, z: 32600 },
// 					{ label: "Neptune", x: 2794, y: 48, z: 30200 },
// 				]
//             }]

// 		}
// 		return (
// 		<div id="chartcontainer" style={{height: "1000px", width: "100%", backgroundImage: ('https://files.slack.com/files-pri/TH7BS1571-FLZLVBW64/fortniteseason10map.jpg')}}>
// 			{/* <CanvasJSChart options = {options} */}
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// export default Fmap;

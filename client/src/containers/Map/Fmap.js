import React, { Component } from 'react';
import img from '../Map/FORTNITESEASON10MAP.jpg'
import axios from "axios";
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Fmap extends Component {
    state = {
        coordsArray: [],
        currentVote: {}
    }
    async showCoords(event) {
        console.log(event.clientX,event.clientY,)
        let clickCoords = { x: event.clientX, y: event.clientY, z: Math.random }
        //  var coords = "X coords: " + x + ", Y coords: " + y + "Z" + z ;
        // document.getElementById("demo").innerHTML = coords;

        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        // try {
        //     const response = await axios.post('http://localhost:3001/api/SendVote', { clickCoords: '' });
        //     console.log('Returned data:', response);
        // } catch (e) {
        //     this.setState({ currentVote: clickCoords })
        //     console.log(`Axios request failed: ${e}`);
        // }

    }

    render() {
        return (
            <div>
                <div id="mappy" onClick={this.showCoords}>
                    <img style={{ width: '100%', height: '100%' }} src={img} />
                </div>
                
               
            </div>
        );
    }

//      <br/> //Just so that JSFiddle's Result label doesn't overlap the Chart
// <div id="chartContainer" style="height: 100%; width: 100%;
//  background-image:url('https://www.mapsofindia.com/worldmap/map-of-world.jpg');">
//  </div>

    render() {
       
		const options = {
            backgroundColor: "transparent",
			animationEnabled: true,
			exportEnabled: true,
			theme: "", // "light1", "light2", "dark1", "dark2"
			title:{
				text: "Drop here!",
			fontSize: 26
			},
			axisX: {
				title: "x",
			logarithmic: true
			},
			axisY: {
				title: "y"
			},
			data: [{
				type: "bubble",
				indexLabel: "{label}",
				toolTipContent: "<b>{label}</b><br>:{x}<br>:{y}<br>:{z}",
				dataPoints: [
					{ label: "Mercury", x: 36, y: 452, z: 3031 },
					{ label: "Venus", x: 67, y: 726, z: 7521 },
					{ label: "Earth", x: 93, y: 285, z: 7926 },
					{ label: "Mars", x: 141, y: 230, z: 4222 },
					{ label: "Jupiter", x: 483, y: 120, z: 88729 },
					{ label: "Saturn", x: 886, y: 88, z: 74600 },
					{ label: "Uranus", x: 1784, y: 59, z: 32600 },
					{ label: "Neptune", x: 2794, y: 48, z: 30200 },
				]
            }]
           
		}
		return (
		<div id="chartcontainer" style="height: 1000px; width: 100%; background-image:url('https://files.slack.com/files-pri/TH7BS1571-FLZLVBW64/fortniteseason10map.jpg');">
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}

 
}
export default Fmap;
import React, { Component } from 'react';
import img from '../Map/FORTNITESEASON10MAP.jpg'
import axios from "axios";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, } from 'recharts';

class Fmap extends Component {
    state = {
        coordsArray:[],
        currentVote:{}
    }
    async showCoords(event) {
        console.log(event.clientX)
        let clickCoords = { x: event.clientX, y: event.clientY, z: Math.random }
        //  var coords = "X coords: " + x + ", Y coords: " + y + "Z" + z ;
        // document.getElementById("demo").innerHTML = coords;

        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        try {
            const response = await axios.post('http://localhost:3001/api/SendVote', { posted_data: 'coordsobj' });
            console.log('Returned data:', response);
        } catch (e) {
            this.setState({ currentVote: clickCoords })
            console.log(`Axios request failed: ${e}`);
        }

    }

    render() {
        return (
            <div>
            <div id="mappy" onClick={this.showCoords}>
                <img style={{width: '100%'}} src={img} />
            </div>
            <div id="mappy">
                <img style={{height: '100%'}} src={img} />

            </div>
            {/* {this.renderSkatterChart} */}
            </div>
        );
    }
}

const renderSkatterChart = (
    <div style={{backgroundImage:img}}>
    <ScatterChart width={"100%"} height={'100%'}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <XAxis dataKey="x" name="coords" />
        <YAxis dataKey="y" name="coords" />
        <ZAxis dataKey="z" range={[25, 600]} name="bits" />
        <Scatter name="" data={coordsArrayj01} fill="#8884d8" />
        <Scatter name="" data={coordsArray02} fill="#82ca9d" />
    </ScatterChart>
    </div>
)


export default Fmap;
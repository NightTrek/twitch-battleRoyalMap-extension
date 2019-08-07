import React, { Component } from 'react';
import img from '../Map/FORTNITESEASON10MAP.jpg'
import axios from "axios";
import {
    ScatterChart, Scatter, XAxis, YAxis, ZAxis,
} from 'recharts';

const renderSkatterChart = (
    <ScatterChart width={100%} height={100%}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <XAxis dataKey="x" name="coords" />
        <YAxis dataKey="y" name="coords" />
        <ZAxis dataKey="z" range={[25, 600]} name="bits" />
        <Scatter name="A school" data={data01} fill="#8884d8" />
        <Scatter name="B school" data={data02} fill="#82ca9d" />
    </ScatterChart>
)

class Fmap extends Component {
    state = {
        coordsArray =[{ 2, 4, 5}, { 4, 6, 7}],
        currentVote={}
    }
    showCoords(event) {
        let coordsobj = { x: event.clientX, y: event.clientY, z: math.random }
        //  var coords = "X coords: " + x + ", Y coords: " + y + "Z" + z ;
        // document.getElementById("demo").innerHTML = coords;

        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        try {
            const response = await axios.post('http://localhost:3001/api/SendVote', { posted_data: 'coordsobj' });
            console.log('Returned data:', response);
        } catch (e) {
            this.setState({ currentVote: coordsobj })
            console.log(`Axios request failed: ${e}`);
        }

    }

    render() {
        return (
            <div id="mappy" onclick="showCoords(event)">
                <img style="width: 100%;" src={img} />
            </div>
            <div id="mappy">
                <img style="height: 100%;" src={img} />

            </div>
        );
    }
}


export default Fmap;
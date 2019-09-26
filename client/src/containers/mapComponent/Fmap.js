import React, { Component } from 'react';
// import img from '../Map/FORTNITESEASON10MAP.jpg';
// import {VictoryScatter} from 'victory';
import axios from "axios";
import fortniteMap from "../../img/FORTNITESEASON10MAP.jpg"

// const startingData = [{ x: 1, y: 2, amount: 30 },
//     { x: 2, y: 3, amount: 40 },
//     { x: 3, y: 5, amount: 25 },
//     { x: 4, y: 4, amount: 10 },
//     { x: 5, y: 7, amount: 45 }];


class Fmap extends Component {
    constructor(props){
        super(props);
        this.state = {
            coordsArray: [],
            currentVote: {},
            currentMap:{},
            canvasRef:{},
            canvas:{},
            lastX:0,
            lastY:0,
            dragged:{},
            dragStart:{},
            scaleFactor:1.1
        }

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

    }


    componentDidMount(props) {
        this.trackTransforms(this.state.canvasRef);
        this.updateCanvas();
        // this.setState({}, {})

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.trackTransforms(this.state.canvasRef);
        this.updateCanvas();
    }

    updateCanvas(){
        //https://codepen.io/techslides/pen/zowLd
        //https://www.kempsterrrr.xyz/handling-scroll-events-in-react/
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const img = this.refs.image;
        img.onload = () => {

            // Clear the entire canvas
            let p1 = ctx.transformedPoint(0,0);
            let p2 = ctx.transformedPoint(this.canvas.width, this.canvas.height);
            ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

            ctx.save();
            ctx.setTransform(1,0,0,1,0,0);
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            ctx.restore();

            ctx.drawImage(this.currentMap,0,0);

            this.setState((prevState, props) => {
                return {
                    coordsArray: prevState.coordsArray,
                    currentVote: prevState.currentVote,
                    currentMap: img,
                    canvasRef:ctx,
                    canvas:canvas,
                    lastX: canvas.width/2,
                    lastY:canvas.height/2,
                    dragged:{},
                    dragStart:{}
                };
            });
        }

    }

    mouseDown(evt){
        console.log("mouse Down event");
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        let newlastX = evt.offsetX || (evt.pageX - this.state.canvas.offsetLeft);
        let newlastY = evt.offsetY || (evt.pageY - this.state.canvas.offsetTop);
        let newdragStart = this.state.canvasRef.transformedPoint(this.state.lastX, this.state.lastY);
        this.setState((prevState, props) => {
            return {
                coordsArray:    prevState.coordsArray,
                currentVote:    prevState.currentVote,
                currentMap:     prevState.currentMap,
                canvasRef:      prevState.canvasRef,
                canvas:         prevState.canvas,
                lastX:          newlastX,
                lastY:          newlastY,
                dragged:        false,
                dragStart:      newdragStart,
                scaleFactor:    prevState.scale
            };
        });
        console.log(this.state);
    }

    mouseMove(evt) {

        let newlastX = evt.offsetX || (evt.pageX - this.state.canvas.offsetLeft);
        let newlastY = evt.offsetY || (evt.pageY - this.state.canvas.offsetTop);
        if (this.state.dragStart){
            let pt = this.state.canvasRef.transformedPoint(newlastX,newlastY);
            this.state.canvasRef.translate(pt.x-this.state.dragStart.x,pt.y-this.state.dragStart.y);
            this.updateCanvas();
        }
        this.setState((prevState, props) => {
            return {
                coordsArray:    prevState.coordsArray,
                currentVote:    prevState.currentVote,
                currentMap:     prevState.currentMap,
                canvasRef:      prevState.canvasRef,
                canvas:         prevState.canvas,
                lastX:          newlastX,
                lastY:          newlastY,
                dragged:        true,
                dragStart:      prevState.dragStart,
                scaleFactor:    prevState.scale
            };
        });
    }

    mouseUp(evt){
        this.setState((prevState, props) => {
            return {
                coordsArray:    prevState.coordsArray,
                currentVote:    prevState.currentVote,
                currentMap:     prevState.currentMap,
                canvasRef:      prevState.canvasRef,
                canvas:         prevState.canvas,
                lastX:          prevState.lastX,
                lastY:          prevState.lastY,
                dragged:        false,
                dragStart:      prevState.dragStart,
                scaleFactor:    prevState.scale
            };
        });
        let dragged = this.state.dragged;
        if (!dragged) this.zoom(evt.shiftKey ? -1 : 1 );
    }

    zoom(clicks){
        let pt = this.state.canvasRef.transformedPoint(this.state.lastX,this.state.lastY);
        this.state.canvasRef.translate(pt.x,pt.y);
        let factor = Math.pow(this.state.scaleFactor,clicks);
        this.state.canvasRef.scale(factor,factor);
        this.state.canvasRef.translate(-pt.x,-pt.y);
        this.updateCanvas();
    }

    handleScroll(evt){
        let delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
        if (delta) this.zoom(delta);
        return evt.preventDefault() && false;
    }

    trackTransforms(ctx){
        let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
        let xform = svg.createSVGMatrix();
        ctx.getTransform = function(){ return xform; };

        let savedTransforms = [];
        let save = ctx.save;
        ctx.save = function(){
            savedTransforms.push(xform.translate(0,0));
            return save.call(ctx);
        };

        let restore = ctx.restore;
        ctx.restore = function(){
            xform = savedTransforms.pop();
            return restore.call(ctx);
        };

        let scale = ctx.scale;
        ctx.scale = function(sx,sy){
            xform = xform.scaleNonUniform(sx,sy);
            return scale.call(ctx,sx,sy);
        };

        let rotate = ctx.rotate;
        ctx.rotate = function(radians){
            xform = xform.rotate(radians*180/Math.PI);
            return rotate.call(ctx,radians);
        };

        let translate = ctx.translate;
        ctx.translate = function(dx,dy){
            xform = xform.translate(dx,dy);
            return translate.call(ctx,dx,dy);
        };

        let transform = ctx.transform;
        ctx.transform = function(a,b,c,d,e,f){
            let m2 = svg.createSVGMatrix();
            m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
            xform = xform.multiply(m2);
            return transform.call(ctx,a,b,c,d,e,f);
        };

        let setTransform = ctx.setTransform;
        ctx.setTransform = function(a,b,c,d,e,f){
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(ctx,a,b,c,d,e,f);
        };

        let pt  = svg.createSVGPoint();
        ctx.transformedPoint = function(x,y){
            pt.x=x; pt.y=y;
            return pt.matrixTransform(xform.inverse());
        }
    }




    async showCoords(event) {
        console.log(event.clientX, event.clientY,)
        let clickCoords = {x: event.clientX, y: event.clientY, z: Math.random}
        //  let coords = "X coords: " + x + ", Y coords: " + y + "Z" + z ;
        // document.getElementById("demo ").innerHTML = coords;

        //POST API CALL TO BACKEND which sends a Coord Object {x float, y float, weight int}
        // and recived an updated coordsArray
        // try {
        //     const response = await axios.post('http://localhost:3001/api/SendVote', {data:{
        //             email:"danielthespy@gmail.com",
        //             sessionId: "5d4e005c005ab1312b8593d8",
        //             vote:{
        //                 x:"42",
        //                 y:"42",
        //                 z:"3"
        //             }
        //         }});
        //     console.log('Returned data:', response);
        // } catch (e) {
        //     this.setState({currentVote: clickCoords})
        //     console.log(`Axios request failed: ${e}`);
        // }

    }

//transparent or rgba(0, 0, 0, 0)
    render() {
        return (
            <div>
                <canvas ref="canvas" width={800} height={800}
                        onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove} />
                <img ref={"image"} src={fortniteMap} style={{display:"none"}} alt={"Battle Royal Map Fortnite"}/>
            </div>
        );
    }


}

export default Fmap;

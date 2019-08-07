import React, {Component} from 'react';
import * as actions from './../actions'



//import react components

import Container from './../components/Partials/Container';
import Column from './../components/Partials/Column';
import Row from './../components/Partials/Row';
import ColorDisplayPanel from './../components/Partials/ColorDisplayPanel';
import Card from "../components/Partials/Card";


class PostAuth extends Component {
    componentDidMount() {
        let url = window.location.href;
        console.log(url);                                  //ebzrp9oyr0r8pmt89kkwbn3qveocc6 //LLD3v9d99VyBg4wAZa6EOw2K
        //http://localhost:3000/auth/twitch/callback?code=ebzrp9oyr0r8pmt89kkwbn3qveocc6&scope=user%3Aread%3Aemail&state=LLD3v9d99VyBg4wAZa6EOw2K
        let res = {data:{token:url}};
        actions.signin(res, ()=>{
            console.log(res.data.token);
        });

    }

    render() {
        return (
            <div>
                <Container>
                    <Row><h1>Pick your journey either start a vote or join a session</h1></Row>
                    <Row>
                        <div style={{padding:"5vh"}}></div>
                    </Row>
                    <Row>
                        <Column small={12} large={6} medium={6}>
                            <div>
                                <h5>Start A session</h5>
                                <p>Pick how long you want the vote to go</p>
                                <input type={"text"}></input>
                                <button>submit</button>
                            </div>

                        </Column>
                        <Column small={12} large={6} medium={6}>
                            <div>
                            <h5>Join A session</h5>
                            <p>Input your session id here</p>
                            <input type={"text"}></input>
                            <button>submit</button>
                            </div>
                        </Column>
                    </Row>
                    <Row></Row>


                </Container>
            </div>
        );
    }
}

export default PostAuth;

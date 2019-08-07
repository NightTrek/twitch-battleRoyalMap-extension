import React, {Component} from 'react';
import { connect } from 'react-redux';



//import react components

import Container from './../components/Partials/Container';
import Column from './../components/Partials/Column';
import Row from './../components/Partials/Row';
import ColorDisplayPanel from './../components/Partials/ColorDisplayPanel';
import Card from "../components/Partials/Card";
import {signin} from "../actions";


class PostAuth extends Component {
    componentDidMount() {
        this.props.signin()

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
export default connect(null, { signin })(PostAuth);
// export default PostAuth;

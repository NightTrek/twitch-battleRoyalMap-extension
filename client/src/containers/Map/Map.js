import React, { Component } from 'react';
import Container from '../../components/Partials/Container';
import Column from '../../components/Partials/Column';
import Row from '../../components/Partials/Row';
import Fmap from '../mapComponent/Fmap';
// import { connect } from 'net';
// import * as actions from './../actions';
// access token, email, code
class Map extends Component {

    componentDidMount() {
        // going to look for session id if no session is found return to post auth
        // this.props.state()
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <br/>
                    </Row>
                    <Row>
                        <Column small={12} large={6} offset_lg={6}>
                            <div>
                                <Fmap />
                            </div>
                        </Column>
                    </Row>
                    <Row>
                        <hr/>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default Map;

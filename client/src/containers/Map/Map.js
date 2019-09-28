import React, { Component } from 'react';
import Container from '../../components/Partials/Container';
// import Column from '../../components/Partials/Column';
// import Row from '../../components/Partials/Row';
import Fmap from '../mapComponent/Fmap';
import {connect} from "react-redux";
import * as actions from "../../actions";

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
                    <Fmap/>
                </Container>
            </div>
        );
    }
}
function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(Map);

// export default ;

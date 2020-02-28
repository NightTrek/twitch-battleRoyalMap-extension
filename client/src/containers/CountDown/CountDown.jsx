import React, {Component} from 'react';



class CountDown extends Component {
    constructor(props) {
        super(props);
        console.log("================");
        console.log(this.props.timeleft);
        this.state = {
            RemainingTime:this.props.timeleft.toString()
        }
    }

    componentDidMount() {
        if(parseInt(this.state.RemainingTime) >0){
            this.timeout = setInterval(() => {
                let currentIdx = parseInt(this.state.RemainingTime)-1;
                if(currentIdx <= 0){
                    currentIdx=0
                    //TODO add action to complete when the timer runs out.
                    // this.props.SessionEnd()
                }
                this.setState({ RemainingTime:currentIdx.toString() });
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    convertSecondsToMinutes(seconds){
        if(seconds%60===0){
            return (seconds/60).toString()+" minutes";
        }else if(seconds/60<1){
            return seconds.toString()+ " seconds";
        }else{
            return Math.floor(seconds/60).toString()+" minutes and "+ (seconds%60).toString()+ " seconds"
        }
    };

    render() {
        return (
            <div>
                {this.state.RemainingTime>0?
                    (<h5>{this.convertSecondsToMinutes(this.state.RemainingTime)}</h5>):
                    (<h5>Vote Complete</h5>)}

            </div>
        );
    }
}

export default CountDown;
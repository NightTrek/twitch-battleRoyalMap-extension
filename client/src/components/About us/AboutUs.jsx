import React from 'react';

import "../../default.css";
import './AboutUs.css';

export default ({children}) => {
    return (
        <div>
            <div className={"flexColumn"}>
                <div className={"flexRow"}>
                    <div className={"flexColumn"}>
                    <h2> About us</h2>
                    </div>
                </div>
                <div className={"flexRow"}>
                    <div>
                        <p> We are a team of developers right out of bootcamp</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
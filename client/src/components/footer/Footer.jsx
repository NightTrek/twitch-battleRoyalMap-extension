import React from 'react';

import './footer.css'


export default ({children}) => {




    return (
        <footer className={"flexRow "}>
            <div className={"flexCol"}>
                <h5>Vote Your Landing</h5>
                <p>Connecting Battle Royal Streamers with their audience</p>
            </div>
            <div className={"flexCol"}>
                <div>
                    <a href={'/'}>Home</a>
                </div>
                <div>
                    <a href={'/vote'}> Start Session</a>
                </div>
                <div>
                    <a href={'/vote'}>Join Session</a>
                </div>
            </div>
            <div className={"flexCol"}>
                <div>
                    <a> About us</a>
                </div>
                <div>
                    <a>Support</a>
                </div>
                <div>
                    <a>Donate</a>
                </div>
            </div>
        </footer>
    );
}

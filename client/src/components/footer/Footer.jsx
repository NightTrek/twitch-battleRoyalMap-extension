import React from 'react';

import './footer.css'




export default ({ children  }) => {
    return (
        <footer className={"flexRow "}>
            <div className={"flexCol"}>
                <h5>Vote Your Landing</h5>
                <p>Connecting Battle Royal Streamers with their audience</p>
            </div>
            <div className={"flexCol"}>
                <button>Home</button>
                <button> Start Session</button>
                <button>Join Session</button>
            </div>
            <div className={"flexCol"}>
                <button> About us</button>
                <button>Support</button>
                <button>Donate</button>
            </div>
        </footer>
    );
}

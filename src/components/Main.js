import React, { Component } from 'react';
import PrintServiceList from './PrintServiceList';
import PrintServiceRequests from './PrintServiceRequests';


class Main extends Component {

    callbackFunction = (data) => {
        console.log(data,"Callback fired, Main.js")
    }

    render() {

        return (
            <div>
                <p>Here is the main area where other components will come</p>
                <div className="TopContent">
                    <div className="InnerTopContent">
                        <h1>Hello world!</h1>
                        <PrintServiceList/>
                        <PrintServiceRequests callback={this.callbackFunction}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;
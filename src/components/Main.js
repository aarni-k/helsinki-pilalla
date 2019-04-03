import React, { Component } from 'react';
import PrintServiceList from './PrintServiceList';
import PrintServiceRequests from './PrintServiceRequests';
import SelectStatus from './SelectStatus';
import TimeRange from './TimeRange';


class Main extends Component {
    state={ serviceRequests:[],
            status:"closed"
        }

    callbackFunction = (data) => {
        console.log(data,"Callback fired, Main.js")
        if (data.status !== undefined) {
            this.setState({status:data.status})
        }
        if (data.service_request_id !== null) {
            this.setState({serviceRequests:data})
        }
        if (data.callbackid === "timerange") {
            console.log("timerange incoming")
        }
    }
    
    render() {
        console.log(this.state,"State in render, Main.js")

        return (
            <div>
                <p>Here is the main area where other components will come</p>
                <div className="TopContent">
                    <div className="InnerTopContent">
                        <h1>Hello world!</h1>
                        <PrintServiceList/> */}
                        <SelectStatus callback={this.callbackFunction}/>
                        <TimeRange callback={this.callbackFunction}/>
                        {/* <PrintServiceRequests callback={this.callbackFunction}/> */}
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;
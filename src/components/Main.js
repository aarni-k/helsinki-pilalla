import React, { Component } from 'react';
import SelectServiceType from './SelectServiceType';
import PrintServiceRequests from './PrintServiceRequests';
import SelectStatus from './SelectStatus';
import SelectTimeRange from './SelectTimeRange';
import Button from 'react-bootstrap/Button'
import { getAllServiceRequests } from './serviceclient';


class Main extends Component {
    state = {
        status: "closed",
        serviceCode: "notUsed",
        startDate: "notUsed",
        endDate: "notUsed",
        serviceRequests: []
    }

    componentDidMount() {
        this.showResults();
    }

    showResults = () => {      
            getAllServiceRequests(this.state.status,
                this.state.serviceCode,
                this.state.startDate,
                this.state.endDate)
                .then((data) => { this.setState({ serviceRequests: data }) })
                
    }

    callbackFunction = (data) => {
        // console.log(data, "Callback fired, Main.js")
        if (data.status !== undefined) {
            // console.log(data, "status incoming")
            this.setState({ status: data.status })
        }
        if (data.callbackid === "servicecode") {
            // console.log(data, "service_request id incoming")
            this.setState({ serviceCode: data.service_code })
        }
        if (data.callbackid === "timerange") {
            // console.log(data, "timerange incoming")
            this.setState({ startDate: data.start_date, endDate: data.end_date })
        }
    }

    // Tee hakunäppäin
    btnSearch = (e) => {
        e.preventDefault();
        this.showResults();

    }


    render() {
        // Kommentoitu pois kehittämisen ajaksi :D
        // var feedbackStories = this.state.serviceRequests.map((value) => {
        //     return <h1 key={value.service_request_id}>{value.agency_responsible}</h1>
        // })
        // console.log(this.state, "State in render, Main.js")
        return (
            <div>
                <Button onClick={this.btnSearch} value={this.state}>Hae!</Button>
                <p>Here is the main area where other components will come</p>
                <div className="TopContent">
                    <div className="InnerTopContent">
                        <h1>Hello world!</h1>
                        <SelectServiceType callback={this.callbackFunction} />
                        <SelectStatus callback={this.callbackFunction} />
                        <SelectTimeRange callback={this.callbackFunction} />
                        {/* {feedbackStories} */}
                        {/* <PrintServiceRequests callback={this.callbackFunction}/> */}
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;
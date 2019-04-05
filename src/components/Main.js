import React, { Component } from 'react';
import SelectServiceType from './SelectServiceType';
import PrintServiceRequests from './PrintServiceRequests';
import SelectStatus from './SelectStatus';
import SelectTimeRange from './SelectTimeRange';
import Button from 'react-bootstrap/Button'
import { getAllServiceRequests } from './serviceclient';
import { regExPortal, filterWord } from './regexclient';



class Main extends Component {
    state = {
        status: "closed",
        serviceCode: "notUsed",
        startDate: "notUsed",
        endDate: "notUsed",
        välitulokset: []
    }

    componentDidMount() {
        //Demon ajaksi pois
        this.showResults();
        // this.regExDemoF();
    }

    showResults = () => {
        // ProgressBar point #1
        getAllServiceRequests(this.state.status,
            this.state.serviceCode,
            this.state.startDate,
            this.state.endDate)
            .then((data) => {
                // filterWord(data)
                // ProgresBar point #3
                console.log(data, "getAllServiceRequests data before setState")
                this.setState({ serviceRequests: filterWord(data) })

            })


    }
    // regExDemoF = () => {

    //     var hevonen = "hevonen"
    //     regExPortal(hevonen);
    // }

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

    // hakunäppäin
    btnSearch = (e) => {
        e.preventDefault();
        console.log(this.state, "<- State haku hetkellä")
        this.showResults();

    }


    render() {

        // Koodaa tää paremmin :D
        if (this.state.serviceRequests !== undefined) {

            var feedbackStories = this.state.serviceRequests.map((value) => {
                if (value !== undefined) {
                    return (
                        <div className="FeedBackItem">
                            <Button variant="outline-light" >{value}</Button>
                        </div>
                    )
                }
                // return <Button key={value.service_request_id} value={value.servicerequest_id}>{value.agency_responsible} / {value.service_name}</Button>
            })
        }
        // console.log(this.state, "State in render, Main.js")
        return (
            <div>
                <div className="TopContent">
                    <div className="SearchButton">
                        <Button variant="outline-light" onClick={this.btnSearch} value={this.state}>Hae!</Button>
                    </div>
                    <div className="InnerTopContent">
                        <div className="ServiceType">
                            <SelectServiceType callback={this.callbackFunction} />
                        </div>
                        <div className="SelectStatus">
                            <SelectStatus callback={this.callbackFunction} />
                        </div>
                        <div className="TimeRange">

                            <SelectTimeRange callback={this.callbackFunction} />
                        </div>
                        {/* <PrintServiceRequests callback={this.callbackFunction}/> */}
                    </div>
                </div>
                <div>
                    {feedbackStories}
                </div>
            </div>
        );
    }
}



export default Main;
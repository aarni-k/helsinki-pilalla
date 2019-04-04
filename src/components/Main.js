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
        // ProgresBar point #3
                    console.log(data,"getAllServiceRequests data before setState")
                    // this.setState({ serviceRequests: data }) 
                    // regExPortal(data);
                    var kiitokset = filterWord(data)
                        setTimeout(() => {
                        this.setState({serviceRequests:kiitokset })
                    }, 3000);
                })

                
    }
    regExDemoF = () => {

        var hevonen = "hevonen"
        regExPortal(hevonen);
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

    // hakunäppäin
    btnSearch = (e) => {
        e.preventDefault();
        this.showResults();

    }


    render() {
        
        // Kommentoitu pois kehittämisen ajaksi :D
        if (this.state.serviceRequests !== undefined) {
            
            var feedbackStories = this.state.serviceRequests.map((value) => {
                if (value !== undefined) {
                    return <Button>{value}</Button>
                }
                // return <Button key={value.service_request_id} value={value.servicerequest_id}>{value.agency_responsible} / {value.service_name}</Button>
            })
        }
        // console.log(this.state, "State in render, Main.js")
        return (
            <div>
                <Button onClick={this.btnSearch} value={this.state}>Hae!</Button>
                <p>Here is the main area where other components will come</p>
                <div className="TopContent">
                    <div className="InnerTopContent">
                        <h1>Hello world!</h1>
                        {/* <SelectServiceType callback={this.callbackFunction} /> */}
                        <SelectStatus callback={this.callbackFunction} />
                        <SelectTimeRange callback={this.callbackFunction} />
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
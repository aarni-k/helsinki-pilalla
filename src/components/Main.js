import React, { Component } from 'react';
import SelectServiceType from './SelectServiceType';
// import PrintServiceRequests from './PrintServiceRequests';
import SelectStatus from './SelectStatus';
import SelectTimeRange from './SelectTimeRange';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { getAllServiceRequests } from './serviceclient';
import { regExPortal, filterWord } from './regexclient';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'


// Lisää etusivulle progresbar & viestit haun etenemisestä
// Kato Meaningcloud // Googlen joku ajatusAPI
// Korjaa CSS tyylit

class Main extends Component {
    state = {
        status: "closed",
        serviceCode: "notUsed",
        startDate: "notUsed",
        endDate: "notUsed",
        searchTerm: "",
        välitulokset: []
    }

    componentDidMount() {
        //Demon ajaksi pois
        this.showResults();
        // this.regExDemoF();
    }

    showResults = () => {
        // ProgressBar point #1
        // console.log(this.state.searchTerm, "search-term-show-results")
        getAllServiceRequests(this.state.status,
            this.state.serviceCode,
            this.state.startDate,
            this.state.endDate)
            .then((data) => {
                // filterWord(data)
                // ProgresBar point #3
                var searchterm = this.state.searchTerm
                // console.log(data, "getAllServiceRequests data before setState")
                this.setState({ serviceRequests: filterWord(data, searchterm) })

            })


    }
    // RegEx one word finder test
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
        console.log(this.state, "<- State haku hetkellä")
        this.showResults();

    }

    // filter bar functions
    filterChanged = (e) => {
        this.setState({ searchTerm: e.target.value })
    }


    render() {
        console.log(this.state)
        // Koodaa tää paremmin :D
        if (this.state.serviceRequests !== undefined) {

            var feedbackStories = this.state.serviceRequests.map((value) => {
                if (value !== undefined) {
                    return (
                        <div className="FeedBackItem">
                            <Button variant="outline-light" key={value.index}>{value}</Button>
                        </div>
                    )
                }

            })
        }
        // For entertaiment purposes only
        const popover = (
            <Popover id="popover-basic" title="Tech Info ">
                <ul>
                    <li>Open311 API</li>
                    <li>React</li>
                    <li>RegEx</li>
                </ul>
            </Popover>
        );

        const Example = () => (
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="outline-light">Info</Button>
            </OverlayTrigger>
        );


        // console.log(this.state, "State in render, Main.js")
        return (
            <div className="FeedBackStories">
                <div className="TopContent">
                    <div className="SearchButton">
                        <Button variant="outline-light" onClick={this.btnSearch} value={this.state.searchTerm}>Hae!</Button>
                        &nbsp;
                        <Example></Example>
                    </div>
                    <div className="SearchBar">
                        <Form>
                            <Form.Group>
                                <Form.Control size="lg" type="text" placeholder="Suodatin" onChange={this.filterChanged} />
                            </Form.Group>
                        </Form>
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
                <div className="FeedBackStories">
                    {feedbackStories}
                </div>
            </div>
        );
    }
}



export default Main;
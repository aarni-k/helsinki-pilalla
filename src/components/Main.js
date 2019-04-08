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
import FeedbackStory from './FeedbackStory';



// Lisää etusivulle progresbar & viestit haun etenemisestä
// Kato Meaningcloud // Googlen joku ajatusAPI
// Korjaa CSS tyylit

class Main extends Component {
    state = {
        status: "closed",
        serviceCode: "notUsed",
        serviceCodeString: "notUsed",
        startDate: "notUsed",
        endDate: "notUsed",
        timeRangeString: "notUsed",
        searchTerm: "",
        välitulokset: []
    }

    componentDidMount() {
        //Demon ajaksi pois
        this.showResults();
        // this.regExDemoF();
        console.log(this.state, "STATE DID MOUNT")
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
    // RegEx - one word finder test
    // regExDemoF = () => {

    //     var hevonen = "hevonen"
    //     regExPortal(hevonen);
    // }

    callbackFunction = (data) => {
        // console.log(data, "Callback fired, Main.js")
        if (data.callbackid === "status") {
            // console.log(data, "status incoming")
            this.setState({ status: data.status })
        }
        if (data.callbackid === "servicecode") {
            // console.log(data, "service_request id incoming")
            this.setState({ serviceCode: data.service_code, serviceCodeString: data.serviceCodeString })
        }
        if (data.callbackid === "timerange") {
            // console.log(data, "timerange incoming")
            this.setState({ startDate: data.start_date, endDate: data.end_date, timeRangeString: data.timeRange })
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
        // Make these selectors into lambdas in the future // Make all buttons ToggleButtons
        var selectedServiceCode = ""
        if (this.state.serviceCode === "notUsed") { selectedServiceCode = "Kaikki palvelut" }
        else { selectedServiceCode = this.state.serviceCodeString }

        var selectedStatus = ""
        if (this.state.status === "closed") { selectedStatus = "Suljettu" }
        else { selectedStatus = "Avoinna" }

        var selectedTimeRange = ""
        if (this.state.timeRangeString === "notUsed") { selectedTimeRange = "Ei aikaväliä" }
        else { selectedTimeRange = this.state.timeRangeString }

        var selectedSearchTerm = ""
        if (this.state.searchTerm === "") selectedSearchTerm = "Suodatetaan palaute, jossa esiintyy merkkijono"
        else { selectedSearchTerm = `Suodatetaan palaute, jossa esiintyy annettu merkkijono "${this.state.searchTerm}"` }

        var selectedSearchResults = ""
        if (this.state.serviceRequests === undefined) { selectedSearchResults = "Ladataan sivustoa" }
        if (this.state.serviceRequests !== undefined && this.state.serviceRequests.length !== 0) selectedSearchResults = `Hakutuloksia yhteensä ${this.state.serviceRequests.length}`
        if (this.state.serviceRequests !== undefined && this.state.serviceRequests.length === 0) { selectedSearchResults = "Ei hakutuloksia" }


        // console.log(this.state.serviceRequests)
        // Koodaa tää paremmin :D
        if (this.state.serviceRequests !== undefined) {



            var feedbackStories = this.state.serviceRequests.map((value) => {
                if (value !== undefined && value.description !== "") {
                    return (
                        <div className="FeedBackItem" key={value.service_request_id}>
                            <FeedbackStory storyItem={value} />
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
        console.log(selectedServiceCode, "current service code", this.state.serviceCode, "state service code")

        // console.log(this.state, "State in render, Main.js")
        return (
            <div className="FeedBackStories">
                <div className="TopContent">
                    <div className="SearchButton">
                        <Button variant="outline-light" onClick={this.btnSearch} value={this.state.searchTerm}>Hae!</Button>
                        &nbsp;
                        <Example />
                    </div>
                    <div className="SearchBar">
                        <h4>{selectedSearchTerm}</h4>
                        <Form>
                            <Form.Group>
                                <Form.Control size="lg" type="text" placeholder="Suodatin" onChange={this.filterChanged} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="InnerTopContent">
                        <div className="ServiceType">
                            <h4>Valittuna: {selectedServiceCode} </h4>
                            <SelectServiceType callback={this.callbackFunction} />
                        </div>
                    </div>
                    <div className="InnerTopContent">
                        <div className="SelectStatus">
                            <h4>Valittuna: {selectedStatus}</h4>
                            <SelectStatus callback={this.callbackFunction} />
                        </div>
                        <div className="TimeRange">
                            <h4>Valittuna: {selectedTimeRange}</h4>
                            <SelectTimeRange callback={this.callbackFunction} />
                        </div>
                    </div>
                    {/* <PrintServiceRequests callback={this.callbackFunction}/> */}
                </div>
                <div className="FeedBackStories">
                    <h4>{selectedSearchResults}</h4>
                    {feedbackStories}
                </div>
            </div>
        );
    }
}



export default Main;
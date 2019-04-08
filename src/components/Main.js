import React, { Component } from 'react';
import SelectServiceType from './SelectServiceType';
import SelectStatus from './SelectStatus';
import SelectTimeRange from './SelectTimeRange';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { getAllServiceRequests } from './serviceclient';
import { filterWord } from './regexclient';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import FeedbackStory from './FeedbackStory';
import ProgresBar from 'react-bootstrap/ProgressBar';

// Main page compiles all the components together
// TODO - Make ProgressBar more relevant
// TODO - Create better categorization of the search options
// TODO - Make the page more pleasent to the eye (it's so dark)
// TODO - Make these selectors into lambdas/ternieries in the future // Use ToggleButtons

class Main extends Component {
    state = {
        status: "closed",
        serviceCode: "notUsed",
        serviceCodeString: "notUsed",
        startDate: "notUsed",
        endDate: "notUsed",
        timeRangeString: "notUsed",
        searchTerm: "",
        progress: 100,
        progressLabel: "Valmista",
        välitulokset: []
    }


    componentDidMount() {
        this.showResults();
    }
    // showResults sends out GET to API and then send the data to regEx function to filter out the results
    showResults = () => {
        this.setState({ progress: 33, progressLabel: "Soitellaan kaupungille" })
        getAllServiceRequests(this.state.status,
            this.state.serviceCode,
            this.state.startDate,
            this.state.endDate)
            .then((data) => {
                this.setState({ progress: 66, progressLabel: "Putsataan vastauksia" })
                var searchterm = this.state.searchTerm
                this.setState({ serviceRequests: filterWord(data, searchterm), progress: 100, progressLabel: "Valmis!" })

            })


    }

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

    btnSearch = (e) => {
        e.preventDefault();
        this.setState({ progress: 0, progressLabel: "Aloitetaan haku" })
        console.log(this.state, "<- State haku hetkellä")
        this.showResults();

    }

    filterChanged = (e) => {
        this.setState({ searchTerm: e.target.value })
    }


    render() {
        var progress = 0


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
        if (this.state.searchTerm === "") selectedSearchTerm = "Suodatetaan palaute, josta löytyy merkkijono"
        else { selectedSearchTerm = `Suodatetaan palaute, jossa esiintyy annettu merkkijono "${this.state.searchTerm}"` }

        var selectedSearchResults = ""
        if (this.state.serviceRequests === undefined) { selectedSearchResults = "Ladataan sivustoa" }
        if (this.state.serviceRequests !== undefined && this.state.serviceRequests.length !== 0) selectedSearchResults = `Hakutuloksia yhteensä ${this.state.serviceRequests.length}`
        if (this.state.serviceRequests !== undefined && this.state.serviceRequests.length === 0) { selectedSearchResults = "Ei hakutuloksia" }


        // TODO - See if this could be done with the first IF statement
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

        // PopOver to display Info Button text
        const popover = (
            <Popover id="popover-basic" title="HELSINKI-PILALLA ">
                <p>Sivusto on tehty harjoitusmielessä käyttäen hyväksi <a href="https://dev.hel.fi/apis/open311/" target="_blank" rel="noopener noreferrer">dev.hel.fi Open311</a>  API:a.
                    Hakutoiminto on toteutettu regEx:llä ja kaupungin vastauksista on poistettu
                    kaikki teksti "Ystävällisin terveisin" kohdan jälkeen. API palauttaa joko 200 ensimmäistä tulosta
                    tai, jos valittuna, tulokset maksimissaan 90 päivän ajalta. Palvelulistaus on rakennettu API:n pohjalta.
                    Jatkossa on tarkoitus lisätä erilaisia valmiita hakuja (esimerkiksi vuosihaut) sekä aihesuodattimia
                    kuten roskakorit, siirtokehoitukset jne. Lähdekoodi löytyy <a href="https://github.com/aarni-k/helsinki-pilalla/" target="_blank" rel="noopener noreferrer">GitHubista</a>
                    <br /><br />
                    <list>
                        <strong>Toteutus</strong>
                        <ul>
                            <li>ReactJS & React-Bootstrap</li>
                            <li>dev.hel.fi Open311 API</li>
                            <li>JavaScript RegEx</li>
                        </ul>
                    </list>
                    <strong>-Aarni</strong></p>
            </Popover>
        );

        const MoreInfo = () => (
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="outline-light">Info</Button>
            </OverlayTrigger>
        );


        return (
            <div className="FeedBackStories">
                <div className="TopContent">
                    <h6>Katsele kaupungin palautteita - Lisätietoa info-napin takana!</h6>
                    <div className="SearchButton">
                        <Button variant="outline-light" onClick={this.btnSearch} value={this.state.searchTerm}>Hae!</Button>
                        &nbsp;
                        <MoreInfo />
                    </div>
                    <div className="SearchBar">
                        <ProgresBar variant="dark" now={this.state.progress} label={this.state.progressLabel} />
                        <br />
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
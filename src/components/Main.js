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
import ProgresBar from 'react-bootstrap/ProgressBar';



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
        progress: 100,
        progressLabel: "Valmista",
        välitulokset: []
    }


    componentDidMount() {
        //Demon ajaksi pois

        this.showResults();
        // this.regExDemoF();
        console.log(this.state, "STATE DID MOUNT")
    }

    showResults = () => {
        this.setState({ progress: 33, progressLabel: "Soitellaan kaupungille" })
        // ProgressBar point #1
        // console.log(this.state.searchTerm, "search-term-show-results")
        getAllServiceRequests(this.state.status,
            this.state.serviceCode,
            this.state.startDate,
            this.state.endDate)
            .then((data) => {
                this.setState({ progress: 66, progressLabel: "Putsataan vastauksia" })
                // filterWord(data)
                // ProgresBar point #3
                var searchterm = this.state.searchTerm
                // console.log(data, "getAllServiceRequests data before setState")
                this.setState({ serviceRequests: filterWord(data, searchterm), progress: 100, progressLabel: "Valmis!" })

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
        this.setState({ progress: 0, progressLabel: "Aloitetaan haku" })
        console.log(this.state, "<- State haku hetkellä")
        this.showResults();

    }

    // filter bar functions
    filterChanged = (e) => {
        this.setState({ searchTerm: e.target.value })
    }


    render() {
        var progress = 0


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
        console.log(selectedServiceCode, "current service code", this.state.serviceCode, "state service code")

        // console.log(this.state, "State in render, Main.js")
        return (
            <div className="FeedBackStories">
                <div className="TopContent">
                    <h8>Katsele kaupungin palautteita - Lisätietoa info-napin takana!</h8>
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
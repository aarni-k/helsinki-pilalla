import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';



class SelectTimeRange extends Component {

    componentDidMount(){
        this.props.callback({callbackid:"timerange",end_date:"notUsed", start_date:"notUsed"})
    }

    dateSelector = (e) => {
        e.preventDefault();     
        if (e.target.value === "NoDate"){
        return this.props.callback({callbackid:"timerange",end_date:"notUsed", start_date:"notUsed"})
        }
        if (e.target.value === "30") {var numberOfMonthsToGoBack = 1}
        if (e.target.value === "60") { numberOfMonthsToGoBack = 2}
        if (e.target.value === "90") { numberOfMonthsToGoBack = 3}

        var end_date = new Date();
        end_date = end_date.toISOString();

        var start_date = new Date();
        start_date.setMonth(start_date.getMonth() - numberOfMonthsToGoBack);
        start_date = start_date.toISOString();

        // start_date = start_date.toISOString();
        console.log(end_date,"End Date")
        console.log(start_date,"Start Date")
        this.props.callback({callbackid:"timerange",end_date,start_date})
    }


    render() {
        return (
            <React.Fragment>
                <Button variant="outline-light" value="NoDate" onClick={this.dateSelector}>Ei aikaväliä</Button>
                <Button variant="outline-light" value="30" onClick={this.dateSelector}>Edelliset 30 päivää</Button>
                <Button variant="outline-light" value="60" onClick={this.dateSelector}>Edelliset 60 päivää</Button>
                <Button variant="outline-light" value="90" onClick={this.dateSelector}>Edelliset 90 päivää</Button>
            </React.Fragment>
        );
    }
}

export default SelectTimeRange;
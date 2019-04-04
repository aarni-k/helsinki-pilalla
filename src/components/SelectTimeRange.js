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
        if (e.target.value === "60") {var numberOfMonthsToGoBack = 2}
        if (e.target.value === "90") {var numberOfMonthsToGoBack = 3}

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
            <div>
                <h1> Select thy time range!</h1>
                <Button value="NoDate" onClick={this.dateSelector}>No time range</Button>
                <Button value="30" onClick={this.dateSelector}>Past 30 days</Button>
                <Button value="60" onClick={this.dateSelector}>Past 60 days</Button>
                <Button value="90" onClick={this.dateSelector}>Past 90 days</Button>
            </div>
        );
    }
}

export default SelectTimeRange;
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';



class TimeRange extends Component {

    pastThirty = () => {
        var end_date = new Date();
        end_date = end_date.toISOString();

        var start_date = new Date();
        start_date.setMonth(start_date.getMonth()-1);
        start_date = start_date.toISOString();

        // start_date = start_date.toISOString();
        console.log(end_date,"End Date")
        console.log(start_date,"Start Date")
        console.log("btnFifteen")
        this.props.callback({callbackid:"timerange",end_date,start_date})
    }


    render() {
        return (
            <div>
                <h1> Select thy time range!</h1>
                <Button value="90" onClick={this.pastThirty}>Past 30 days</Button>
                <Button value="month">This month</Button>
                <Button value="lastYear">Last year</Button>
            </div>
        );
    }
}

export default TimeRange;
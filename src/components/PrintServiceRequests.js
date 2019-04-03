import React, { Component } from 'react';
import { getAllServiceRequests } from './serviceclient';

class PrintServiceRequests extends Component {

    componentDidMount(){
        getAllServiceRequests("2806").then(data => this.props.callback(data))
    }

    render() {
        return (
            <div>
                <h1>Here are the service requests</h1>
            </div>
        );
    }
}

export default PrintServiceRequests;
import React, { Component } from 'react';
import { getAllServiceRequests } from './serviceclient';

class PrintServiceRequests extends Component {

    componentDidMount(){
        getAllServiceRequests("2806").then(data => this.props.callback(data))
    }

    // Pitääkö tämän komponentin vain hakea service requestin kamat ilman renderöintiä VAI
    // Hakeeko tämä komponentti valitut service requestit ja filtteröi niistä regexillä kamat
    // Voiko filtteröinnin ottaa pois päältä?
    // 

    render() {
        return (
            <div>
                <h1>Here are the service requests</h1>
            </div>
        );
    }
}

export default PrintServiceRequests;
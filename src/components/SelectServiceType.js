import React, { Component } from 'react';
import { getServiceList } from './serviceclient';
import Button from 'react-bootstrap/Button';


class SelectServiceType extends Component {
    state={serviceList:[]}
    componentDidMount() {
        this.props.callback({callbackid:"servicecode",service_code:"notUsed"})

        // Lisätty tähän, jotta ei kuormiteta apii :D :D 
        // this.setState({serviceList:väliresponse})
      
              getServiceList().then(data => { 
                console.log(data,"Service List")
                this.setState({serviceList:data})
            })
}

    btnSelectService = (e) => {
        e.preventDefault();
        if (e.target.value === "selectAll") { return this.props.callback({callbackid:"servicecode",service_code:"notUsed"})}
        this.props.callback({callbackid:"servicecode",service_code:e.target.value})
        console.log(e.target.value,"selected service code")

    }

    

    render() {
        const serviceItems = this.state.serviceList.map(
            (values) => {
            return <Button variant="outline-light" key={values.service_code} onClick={this.btnSelectService} value={values.service_code}>{values.service_name}</Button>
            }
            )
        return (
            <React.Fragment>
                <Button variant="outline-light" value="selectAll" onClick={this.btnSelectService}>Kaikki</Button>              
                {serviceItems}
            </React.Fragment>
        );
    }
}

export default SelectServiceType;
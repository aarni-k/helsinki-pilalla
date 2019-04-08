import React, { Component } from 'react';
import { getServiceList } from './serviceclient';
import Button from 'react-bootstrap/Button';

// Component returns Buttons to select the specific service code/type

class SelectServiceType extends Component {
    state = { serviceList: [] }

    componentDidMount() {
        this.props.callback({ callbackid: "servicecode", service_code: "notUsed" })
        getServiceList().then(data => {
            this.setState({ serviceList: data })
        })
    }
    btnSelectService = (e) => {
        e.preventDefault();
        if (e.target.value === "selectAll") { return this.props.callback({ callbackid: "servicecode", service_code: "notUsed", serviceCodeString: "notUsed" }) }
        this.props.callback({ callbackid: "servicecode", service_code: e.target.value, serviceCodeString: e.target.id })
    }

    render() {
        const serviceItems = this.state.serviceList.map(
            (values) => {
                return <Button variant="outline-light" key={values.service_code} onClick={this.btnSelectService} id={values.service_name} value={values.service_code}>{values.service_name}</Button>
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
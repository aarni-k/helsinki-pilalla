import React, { Component } from 'react';
import { getServiceList } from './serviceclient';
import Button from 'react-bootstrap/Button';

class PrintServiceList extends Component {
    state={serviceList:[]}
    componentDidMount() {

            getServiceList().then(data => { 
                console.log(data,"Service List")
                this.setState({serviceList:data})
            })
}

    btnSelectService = (e) => {
        e.preventDefault();
        console.log(e.target.value,"selected service code")

    }

    render() {
        const serviceItems = this.state.serviceList.map(
            (values) => {
            return <Button key={values.service_code} onClick={this.btnSelectService} value={values.service_code}>{values.service_name}</Button>
            }
            )
        return (
            <div>
                <ul>
                {serviceItems}
                </ul>
            </div>
        );
    }
}

export default PrintServiceList;
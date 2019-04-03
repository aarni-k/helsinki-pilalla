import React, { Component } from 'react';
import { getServiceList } from './serviceclient';

class PrintServiceList extends Component {
    state={serviceList:[]}
    componentDidMount() {

            getServiceList().then(data => { 
                console.log(data,"Service List")
                this.setState({serviceList:data})
            })
        
}
    render() {
        const serviceItems = this.state.serviceList.map(
            (values) => {
            return <li key={values.service_code}>{values.service_name}</li>
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
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

// Component renders a selector Button for open/closed search term

class SelectStatus extends Component {

    btnClick = (e) => {
        e.preventDefault();
        console.log(e.target.value,"Status btn value!")
        this.props.callback({callbackid:"status", status:e.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <Button variant="outline-light" value="open" onClick={this.btnClick}>Avoinna</Button>
                <Button variant="outline-light" value="closed" onClick={this.btnClick}>Suljettu</Button>  
            </React.Fragment>
        );
    }
}

export default SelectStatus;
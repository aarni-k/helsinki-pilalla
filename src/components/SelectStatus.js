import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class SelectStatus extends Component {

    btnClick = (e) => {
        e.preventDefault();
        this.props.callback({status:e.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <Button variant="outline-light" value="open" onClick={this.btnClick}>Open</Button>
                <Button variant="outline-light" value="closed" onClick={this.btnClick}>Closed</Button>  
            </React.Fragment>
        );
    }
}

export default SelectStatus;
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class SelectStatus extends Component {

    btnClick = (e) => {
        e.preventDefault();
        this.props.callback({status:e.target.value})
    }

    render() {
        return (
            <div>
                <Button value="open" onClick={this.btnClick}>Open</Button>
                <Button value="closed" onClick={this.btnClick}>Closed</Button>  
            </div>
        );
    }
}

export default SelectStatus;